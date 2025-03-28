
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import time
import random
from typing import List, Dict
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webelement import WebElement
from webdriver_manager.chrome import ChromeDriverManager

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

class LinkedInOpener:
    def __init__(self, email: str, password: str):
        self.email = email
        self.password = password
        self.driver = None
        self.config = {
            'HEADLESS': False,
            'MAX_LOGIN_ATTEMPTS': 3,
            'DELAY_BETWEEN_ACTIONS': (1, 3)
        }
    
    def _setup_driver(self):
        chrome_options = Options()
        if self.config['HEADLESS']:
            chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-notifications")
        chrome_options.add_argument("--disable-infobars")
        chrome_options.add_argument("--window-size=1920,1080")
        
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=chrome_options)
        
    def _random_delay(self):
        min_delay, max_delay = self.config['DELAY_BETWEEN_ACTIONS']
        time.sleep(random.uniform(min_delay, max_delay))
    
    def _login(self) -> bool:
        attempts = 0
        while attempts < self.config['MAX_LOGIN_ATTEMPTS']:
            try:
                self.driver.get("https://www.linkedin.com/login")
                self._random_delay()
                
                # Enter email
                email_input = self.driver.find_element(By.ID, "username")
                email_input.clear()
                email_input.send_keys(self.email)
                
                # Enter password
                password_input = self.driver.find_element(By.ID, "password")
                password_input.clear()
                password_input.send_keys(self.password)
                
                # Click login button
                login_button = self.driver.find_element(By.XPATH, "//button[@type='submit']")
                login_button.click()
                
                # Wait for login to complete
                self._random_delay()
                
                # Check if login was successful by looking for feed or error message
                WebDriverWait(self.driver, 10).until(
                    EC.any_of(
                        EC.presence_of_element_located((By.ID, "global-nav")),
                        EC.presence_of_element_located((By.ID, "error-for-username"))
                    )
                )
                
                # If we see an error message, login failed
                if self.driver.find_elements(By.ID, "error-for-username") or \
                   self.driver.find_elements(By.ID, "error-for-password"):
                    raise Exception("Invalid credentials")
                
                # If we get here without an exception, login was successful
                return True
                
            except Exception as e:
                print(f"Login attempt {attempts+1} failed: {str(e)}")
                attempts += 1
                if attempts >= self.config['MAX_LOGIN_ATTEMPTS']:
                    raise Exception(f"Failed to login after {self.config['MAX_LOGIN_ATTEMPTS']} attempts: {str(e)}")
                self._random_delay()
        
        return False
    
    def _parse_job_details(self, job_element: WebElement) -> Dict:
        try:
            # Extract job title
            title_element = job_element.find_element(By.CSS_SELECTOR, "h3.base-search-card__title")
            title = title_element.text.strip()
            
            # Extract company name
            company_element = job_element.find_element(By.CSS_SELECTOR, "h4.base-search-card__subtitle")
            company = company_element.text.strip()
            
            # Extract location
            location_element = job_element.find_element(By.CSS_SELECTOR, "span.job-search-card__location")
            location = location_element.text.strip()
            
            # Extract job URL
            link_element = job_element.find_element(By.CSS_SELECTOR, "a.base-card__full-link")
            job_url = link_element.get_attribute("href")
            
            # Extract posted date if available
            try:
                date_element = job_element.find_element(By.CSS_SELECTOR, "time.job-search-card__listdate")
                posted_date = date_element.get_attribute("datetime")
            except:
                posted_date = "N/A"
            
            return {
                "title": title,
                "company": company,
                "location": location,
                "job_url": job_url,
                "posted_date": posted_date
            }
        except Exception as e:
            print(f"Error parsing job card: {str(e)}")
            return {}
    
    def scrape_linkedin_jobs(self, search_url: str) -> List[Dict]:
        try:
            self._setup_driver()
            self._login()
            
            # Navigate to the job search page
            self.driver.get(search_url)
            self._random_delay()
            
            jobs_list = []
            page_num = 1
            max_pages = 3  # Limit to 3 pages to avoid rate limiting
            
            while page_num <= max_pages:
                print(f"Scraping page {page_num}...")
                
                # Wait for job cards to load
                WebDriverWait(self.driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "ul.jobs-search__results-list"))
                )
                self._random_delay()
                
                # Get all job cards
                job_cards = self.driver.find_elements(By.CSS_SELECTOR, "li.jobs-search-results__list-item")
                
                if not job_cards:
                    print("No job listings found on this page.")
                    break
                
                # Process each job card
                for job_card in job_cards:
                    job_details = self._parse_job_details(job_card)
                    if job_details:
                        jobs_list.append(job_details)
                
                # Check if there's a next page button
                try:
                    next_button = self.driver.find_element(By.XPATH, "//button[@aria-label='Next']")
                    if not next_button.is_enabled():
                        print("Reached the last page of results.")
                        break
                    
                    next_button.click()
                    self._random_delay()
                    page_num += 1
                except:
                    print("No more pages available.")
                    break
            
            return jobs_list
            
        except Exception as e:
            print(f"Error scraping LinkedIn jobs: {str(e)}")
            return []
            
        finally:
            if self.driver:
                self.driver.quit()

@app.route('/api/scrape-jobs', methods=['POST'])
def scrape_jobs():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        keywords = data.get('keywords', '')
        location = data.get('location', '')
        
        # Create URL with search parameters
        search_params = []
        if keywords:
            search_params.append(f"keywords={keywords.replace(' ', '%20')}")
        if location:
            search_params.append(f"location={location.replace(' ', '%20')}")
        
        params_string = "&".join(search_params)
        target_url = f"https://www.linkedin.com/jobs/search/?{params_string}"
        
        # Initialize the scraper
        opener = LinkedInOpener(email=email, password=password)
        opener.config.update({
            'HEADLESS': True,  # Run headless in production
            'MAX_LOGIN_ATTEMPTS': 3,
            'DELAY_BETWEEN_ACTIONS': (1, 2)
        })
        
        # Run the scraper
        jobs = opener.scrape_linkedin_jobs(target_url)
        
        return jsonify({
            'success': True,
            'count': len(jobs),
            'jobs': jobs
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

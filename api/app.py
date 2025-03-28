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
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Allow requests from any origin

class LinkedInOpener:
    def __init__(self, email=None, password=None):
        self.config = {
            'HEADLESS': False,
            'PAGE_LOAD_TIMEOUT': 60,
            'ELEMENT_TIMEOUT': 30,
            'CHROME_PROFILE_PATH': None,  # We'll set this dynamically
            'CHROME_PROFILE_NAME': 'Default',
            'LINKEDIN_EMAIL': email,
            'LINKEDIN_PASSWORD': password,
            'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'MAX_LOGIN_ATTEMPTS': 3,
            'DELAY_BETWEEN_ACTIONS': (1, 3),
            'SCREENSHOT_ON_ERROR': True
        }
        self.driver = None
        self.logged_in = False

    def init_driver(self):
        chrome_options = Options()
        
        # Only add profile directory if we have a valid path
        if self.config['CHROME_PROFILE_PATH']:
            chrome_options.add_argument(f"--user-data-dir={self.config['CHROME_PROFILE_PATH']}")
            chrome_options.add_argument(f"--profile-directory={self.config['CHROME_PROFILE_NAME']}")
        
        chrome_options.add_argument("--no-first-run")
        chrome_options.add_argument("--no-default-browser-check")
        chrome_options.add_argument("--disable-extensions")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument(f"user-agent={self.config['USER_AGENT']}")
        chrome_options.add_argument("--start-maximized")
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        
        if self.config['HEADLESS']:
            chrome_options.add_argument("--headless=new")
        
        try:
            # Use the manually installed ChromeDriver
            self.driver = webdriver.Chrome(executable_path=r'C:\Users\mikel\Downloads\chromedriver-win64.zip\chromedriver-win64\chromedriver.exe', options=chrome_options)
            self.driver.set_page_load_timeout(self.config['PAGE_LOAD_TIMEOUT'])
            return True
        except Exception as e:
            print(f"Failed to initialize Chrome: {str(e)}")
            print("\nTROUBLESHOOTING:")
            print("1. Make sure Chrome is installed on your system")
            print("2. Try running Chrome manually first to ensure it works")
            print("3. If using antivirus, try temporarily disabling it")
            print("4. Try running the script with administrator privileges")
            return False

    def _human_type(self, element, text: str) -> None:
        for char in text:
            element.send_keys(char)
            time.sleep(random.uniform(0.05, 0.2))

    def _wait_random_delay(self, delay_range: tuple = None) -> None:
        min_sec, max_sec = delay_range or self.config['DELAY_BETWEEN_ACTIONS']
        delay = random.uniform(min_sec, max_sec)
        print(f"Waiting {delay:.1f} seconds...")
        time.sleep(delay)

    def _handle_error(self, context: str, error: Exception) -> None:
        print(f"\nERROR in {context}: {str(error)}")
        if self.config['SCREENSHOT_ON_ERROR'] and self.driver:
            timestamp = time.strftime("%Y%m%d_%H%M%S")
            filename = f"error_{timestamp}.png"
            self.driver.save_screenshot(filename)
            print(f"Screenshot saved as {filename}")

    def _is_logged_in(self) -> bool:
        try:
            return "feed" in self.driver.current_url or bool(
                self.driver.find_elements(By.CSS_SELECTOR, "input[role='combobox'][aria-label='Search']")
            )
        except:
            return False

    def login_to_linkedin(self):
        try:
            print("Attempting LinkedIn login...")
            self.driver.get("https://www.linkedin.com/login")
            
            if self._is_logged_in():
                print("Already logged in via existing session")
                self.logged_in = True
                return True
            
            WebDriverWait(self.driver, self.config['ELEMENT_TIMEOUT']).until(
                EC.presence_of_element_located((By.ID, "username"))
            )
            self._wait_random_delay()
            
            email_field = self.driver.find_element(By.ID, "username")
            email_field.clear()
            self._human_type(email_field, self.config['LINKEDIN_EMAIL'])
            
            password_field = self.driver.find_element(By.ID, "password")
            password_field.clear()
            self._human_type(password_field, self.config['LINKEDIN_PASSWORD'])
            
            self._wait_random_delay()
            
            self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
            
            WebDriverWait(self.driver, self.config['ELEMENT_TIMEOUT']).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "input[role='combobox'][aria-label='Search']"))
            )
            print("Login successful")
            self.logged_in = True
            return True
            
        except Exception as e:
            self._handle_error("Login", e)
            return False

    def scrape_job_listings(self) -> List[Dict[str, str]]:
        if not self.driver:
            print("Driver not initialized")
            return []
            
        try:
            WebDriverWait(self.driver, self.config['ELEMENT_TIMEOUT']).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "ul.eUqfEYGWzKYSSZZiKvAmRbkGoCLfJrzzPwBhk"))
            )
            
            job_cards = self.driver.find_elements(
                By.CSS_SELECTOR, 
                "div.job-card-container--clickable"
            )
            
            jobs = []
            for index, card in enumerate(job_cards, 1):
                try:
                    self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", card)
                    self._wait_random_delay((0.5, 1.5))
                    
                    print(f"Clicking job card #{index}")
                    card.click()
                    
                    try:
                        WebDriverWait(self.driver, self.config['ELEMENT_TIMEOUT']).until(
                            EC.presence_of_element_located((By.CSS_SELECTOR, "div.jobs-search__job-details--wrapper"))
                        )
                    except Exception as e:
                        print(f"Details panel didn't load for job #{index}: {e}")
                        continue
                    
                    self._wait_random_delay((1, 2))
                    
                    job = self._extract_job_details(card)
                    panel_details = self._extract_job_panel_details()
                    job.update(panel_details)
                    
                    if job:
                        jobs.append(job)
                        print(f"Scraped job #{index}: {job['title'][:30]}...")
                    
                    self._wait_random_delay((1, 3))
                    
                except Exception as e:
                    print(f"Error processing job #{index}: {e}")
                    continue
                    
            return jobs
            
        except Exception as e:
            self._handle_error("Job scraping", e)
            return []

    def _extract_job_details(self, card: WebElement) -> Dict[str, str]:
        job = {}
        try:
            title_elem = card.find_element(
                By.CSS_SELECTOR, 
                "a.job-card-container__link span[aria-hidden='true'] strong"
            )
            job['title'] = title_elem.text.strip()
        except:
            job['title'] = "N/A"
                
        try:
            company_elem = card.find_element(
                By.CSS_SELECTOR, 
                "span.lhTobqFRnhXjIxsPALxnKZTvtIokoQuCLO"
            )
            job['company'] = company_elem.text.strip()
        except:
            job['company'] = "N/A"
            
        try:
            location_elem = card.find_element(
                By.CSS_SELECTOR, 
                "li.nnOoYztMdggrEcztrGDGSlUMxBgYhtrXQEvk span"
            )
            job['location'] = location_elem.text.strip()
        except:
            job['location'] = "N/A"
            
        try:
            url_elem = card.find_element(
                By.CSS_SELECTOR, 
                "a.job-card-container__link"
            )
            job['url'] = url_elem.get_attribute("href").split('?')[0]
        except:
            job['url'] = "N/A"
            
        try:
            logo_elem = card.find_element(
                By.CSS_SELECTOR, 
                "img.ivm-view-attr__img--centered"
            )
            job['logo_url'] = logo_elem.get_attribute("src")
        except:
            job['logo_url'] = "N/A"
            
        return job

    def _extract_job_panel_details(self) -> Dict[str, str]:
        details = {
            'posted_time': "N/A",
            'industry': "N/A",
            'employees_range': "N/A",
            'linkedin_employees': "N/A",
            'description': "N/A",
            'recruiter_name': "N/A",
            'recruiter_linkedin': "N/A"
        }

        # Posted Time
        try:
            posted_elem = self.driver.find_element(
                By.CSS_SELECTOR, 
                "span.tvm__text--positive > span:first-child"
            )
            details['posted_time'] = posted_elem.get_attribute("textContent").strip()
        except Exception as e:
            print(f"Posted time error: {str(e)}")

        # Industry
        try:
            industry_div = self.driver.find_element(
                By.CSS_SELECTOR, 
                "div.jobs-company__box div.t-14.mt5"
            )
            full_text = industry_div.get_attribute("textContent").strip()
            spans_text = [span.text.strip() for span in industry_div.find_elements(By.TAG_NAME, "span")]
            details['industry'] = full_text.replace("".join(spans_text), "").strip()
        except Exception as e:
            print(f"Industry error: {str(e)}")

        # Employee Info
        try:
            employee_elems = self.driver.find_elements(
                By.CSS_SELECTOR, 
                "span.jobs-company__inline-information"
            )
            employee_info = [e.text.strip() for e in employee_elems]
            details['employees_range'] = employee_info[0] if len(employee_info) > 0 else "N/A"
            details['linkedin_employees'] = employee_info[1] if len(employee_info) > 1 else "N/A"
        except Exception as e:
            print(f"Employee info error: {str(e)}")

        # Description
        try:
            desc_div = self.driver.find_element(
                By.CSS_SELECTOR, 
                "div.jobs-description__content"
            )
            details['description'] = desc_div.text.strip()
        except Exception as e:
            print(f"Description error: {str(e)}")

        # Recruiter Info
        try:
            hiring_section = self.driver.find_element(
                By.CSS_SELECTOR,
                "div.job-details-people-who-can-help__section--two-pane"
            )
            
            # Name
            try:
                name_elem = hiring_section.find_element(
                    By.CSS_SELECTOR,
                    "span.jobs-poster__name strong"
                )
                details['recruiter_name'] = name_elem.get_attribute("textContent").strip()
            except Exception as e:
                print(f"Recruiter name error: {str(e)}")

            # LinkedIn URL
            try:
                link_elem = hiring_section.find_element(
                    By.CSS_SELECTOR,
                    "a[data-test-app-aware-link]"
                )
                details['recruiter_linkedin'] = link_elem.get_attribute("href").split('?')[0]
            except Exception as e:
                print(f"Recruiter link error: {str(e)}")

        except Exception as e:
            print(f"Recruiter section not found: {str(e)}")

        return details

    def _scroll_page(self, scroll_pause_time: float = 1.0, max_scrolls: int = 5):
        last_height = self.driver.execute_script("return document.body.scrollHeight")
        scrolls = 0
        
        while scrolls < max_scrolls:
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(scroll_pause_time)
            new_height = self.driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height
            scrolls += 1

    def scrape_linkedin_jobs(self, url: str) -> List[Dict[str, str]]:
        if not self.init_driver():
            return []
            
        try:
            if self.config['LINKEDIN_EMAIL'] and self.config['LINKEDIN_PASSWORD']:
                if not self.login_to_linkedin():
                    print("Continuing without login...")
            
            print(f"Opening: {url}")
            self.driver.get(url)
            
            WebDriverWait(self.driver, self.config['ELEMENT_TIMEOUT']).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            
            self._scroll_page()
            jobs = self.scrape_job_listings()
            
            print(f"\nFound {len(jobs)} job listings")
            return jobs
            
        except Exception as e:
            self._handle_error("Job scraping", e)
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
            'DELAY_BETWEEN_ACTIONS': (1, 3)
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

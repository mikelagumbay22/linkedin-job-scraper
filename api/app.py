
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
    # ... keep existing code (LinkedInOpener class implementation)

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

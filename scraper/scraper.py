from bs4 import BeautifulSoup
import requests
import json
import time

import config


from requests_html import HTMLSession

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
    "origin": "https://myaccount.nytimes.com",
    "referer": "https://myaccount.nytimes.com/auth/login?redirect_uri=https://www.nytimes.com/puzzles/leaderboards&response_type=cookie&client_id=games&application=crosswords&asset=leaderboard"
}

session = HTMLSession()
# login_page = session.get("https://myaccount.nytimes.com/auth/login?response_type=cookie&client_id=lgcl&redirect_uri=https%3A%2F%2Fwww.nytimes.com", headers=headers)
# login_page = session.get("https://myaccount.nytimes.com/auth/enter-email?redirect_uri=https%3A%2F%2Fwww.nytimes.com%2Fpuzzles%2Fleaderboards&response_type=cookie&client_id=games&application=crosswords&asset=leaderboard", headers=headers)




# # USING SELENIUM
# from selenium import webdriver
# from selenium.webdriver.common.keys import Keys

# # CHROME_DRIVER = "./drivers/chromedriver.exe"
# # options = webdriver.ChromeOptions()
# # #Removes navigator.webdriver flag
# # #For ChromeDriver version 79.0.3945.16 or over
# # options.add_argument('--disable-blink-features=AutomationControlled')
# # options.add_argument('--disable-extensions')
# # options.add_argument('--profile-directory=Default')
# # options.add_argument("--incognito")
# # options.add_argument("--disable-plugins-discovery");
# # options.add_argument("disable-infobars")

# # browser = webdriver.Chrome(executable_path=CHROME_DRIVER,options=options)

# # browser.get('https://www.nytimes.com/crosswords')
# # browser.find_element_by_xpath('//*[@id="js-global-nav"]/div[2]/a[2]').click()

# # browser.find_element_by_id('email').send_keys(config.USERNAME)
# # time.sleep(1.25)
# # browser.find_element_by_xpath('//*[@id="myAccountAuth"]/div[1]/div/div/form/div/div[3]/button').click()

# # time.sleep(2)

# # browser.find_element_by_id('password').send_keys(config.PASSWORD)
# # time.sleep(1.25)
# # browser.find_element_by_xpath('//*[@id="myAccountAuth"]/div[1]/div/form/div/div[2]/button').click()

# # time.sleep(999)

# # browser.close()

LOGIN_URL = "https://myaccount.nytimes.com/svc/lire_ui/login"

# https://myaccount.nytimes.com/auth/login?redirect_uri=https%3A%2F%2Fwww.nytimes.com%2Fpuzzles%2Fleaderboards&response_type=cookie&client_id=games&application=crosswords&asset=leaderboard

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
    "origin": "https://myaccount.nytimes.com",
    "referer": "https://myaccount.nytimes.com/auth/login?redirect_uri=https://www.nytimes.com/puzzles/leaderboards&response_type=cookie&client_id=games&application=crosswords&asset=leaderboard"
}

# s = requests.Session()
s = HTMLSession()

login_page = s.get("https://myaccount.nytimes.com/auth/enter-email?redirect_uri=https%3A%2F%2Fwww.nytimes.com%2Fpuzzles%2Fleaderboards&response_type=cookie&client_id=games&application=crosswords&asset=leaderboard", headers=headers)

data_auth_options = json.loads(login_page.html.find('#myAccountAuth', first=True).attrs['data-auth-options'])

auth_token = data_auth_options['authToken']

# soup = BeautifulSoup(login_page.content, 'html.parser')
# data_auth_options = json.loads(soup.find("div", {"id": "myAccountAuth"}).get('data-auth-options'))
# auth_token = data_auth_options['authToken']

login_payload = {
    "username": config.USERNAME,
    "password": config.PASSWORD,
    "auth_token": auth_token,
    "form_view": "login",
    "remember_me": "Y",
}

login_response = s.post(LOGIN_URL, headers=headers, data=login_payload)
login_response.html.render()
print(login_response.html)
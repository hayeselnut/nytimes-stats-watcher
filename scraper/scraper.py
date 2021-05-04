from bs4 import BeautifulSoup
import requests
import json

import config

LOGIN_URL = "https://myaccount.nytimes.com/svc/lire_ui/login"

# https://myaccount.nytimes.com/auth/login?redirect_uri=https%3A%2F%2Fwww.nytimes.com%2Fpuzzles%2Fleaderboards&response_type=cookie&client_id=games&application=crosswords&asset=leaderboard

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
    "origin": "https://myaccount.nytimes.com",
    "referer": "https://myaccount.nytimes.com/auth/login?redirect_uri=https://www.nytimes.com/puzzles/leaderboards&response_type=cookie&client_id=games&application=crosswords&asset=leaderboard"
}

s = requests.Session()

login_page = s.get("https://myaccount.nytimes.com/auth/login?response_type=cookie&client_id=lgcl&redirect_uri=https%3A%2F%2Fwww.nytimes.com")

soup = BeautifulSoup(login_page.content, 'html.parser')
data_auth_options = json.loads(soup.find("div", {"id": "myAccountAuth"}).get('data-auth-options'))
auth_token = data_auth_options['authToken']

login_payload = {
    "username": config.USERNAME,
    "password": config.PASSWORD,
    "auth_token": auth_token,
    "form_view": "login",
    "remember_me": "Y",
}

login_response = s.post(LOGIN_URL, headers=headers, data=login_payload)

print(data_auth_options, login_response)
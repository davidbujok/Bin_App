import requests
from bs4 import BeautifulSoup

URL = "https://realpython.github.io/fake-jobs/"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")
results = soup.find(id = "ResultsContainer")
card_content = results.findAll("div", class_ = "media-content")

jobs = {}

for card in card_content:
    job_title = card.find("h2", class_ = "title is-5")
    job_company = card.find("h3", class_ = "subtitle is-6 company")
    jobs[job_title.text] = job_company.text
    print(jobs)


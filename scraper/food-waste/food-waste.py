import requests
from bs4 import BeautifulSoup

URL = "https://www.edinburgh.gov.uk/directory/10248/a-to-z/A"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")
page_content = soup.find("ul", class_ = 'list list--record')
page_links = page_content.findAll("a", class_ = "list__link")
# print(page_content.prettify())
print(page_links)


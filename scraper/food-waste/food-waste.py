from re import U
import requests
from bs4 import BeautifulSoup
import time

URL = "https://www.edinburgh.gov.uk/directory/10248/a-to-z/A"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")
page_content = soup.find("ul", class_ = 'list list--record')
page_links = page_content.findAll("a", class_ = "list__link")

# print(page_links)
#
# for link in page_links:
#     print(link.get('href'))
main_URL = "https://www.edinburgh.gov.uk"
for link in page_links:
    index = page_links.index(link)
    print(index)
    page_letter = requests.get(main_URL+page_links[index].get('href'))
    print(main_URL+page_links[index].get('href'))
    small_soup = BeautifulSoup(page_letter.content, "html.parser")
    collection_details = small_soup.findAll("dd", class_ = "definition__content definition__content--text-box")
    for details in collection_details:
        print(details.getText())
    time.sleep(3)




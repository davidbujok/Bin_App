from re import U
import requests
from bs4 import BeautifulSoup
import time

# URL = "https://www.edinburgh.gov.uk/directory/10248/a-to-z/A"
# page_all_letters = requests.get(URL)
# soup = BeautifulSoup(page_all_letters.content, "html.parser")
# page_content = soup.find("ul", class_ = 'list list--record')
# page_temp = soup.find("li", class_ = 'pagination__item pagination__item--next')
# previous_tag = soup.find("span", class_ = 'pagination__meta')
# page_links = page_content.findAll("a", class_ = "list__link")
#
# print(page_temp.prettify())
# print(previous_tag.get_text())
# #
# # for link in page_links:
# #     print(link.get('href'))
# main_URL = "https://www.edinburgh.gov.uk"

page = 0
last_page = False
File = open("food_waste.tsv", "a")
for pages in range(10):

    if last_page == True:
        print("Done")
        break
    page += 1

    URL = f'http://www.edinburgh.gov.uk/directory/10248/a-to-z/A?page={page}'
    print(URL)
    page_all_letters = requests.get(URL)
    soup = BeautifulSoup(page_all_letters.content, "html.parser")
    page_content = soup.find("ul", class_ = 'list list--record')
    page_temp = soup.find("li", class_ = 'pagination__item pagination__item--next')
    page_links = page_content.findAll("a", class_ = "list__link")
    previous_tag = soup.find("span", class_ = 'pagination__meta')

    # print(page_temp.prettify())
    # print(previous_tag.get_text())
    if ("You are on the last page" in previous_tag.get_text()):
        last_page = True
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
            # collection_day = details_string[1]
            print(details.getText().strip())
            print(details.next_element.getText().strip())
            File.write(f"{ details.getText().strip() } { details.next_element.getText().strip() }")

        time.sleep(3)

File.close()




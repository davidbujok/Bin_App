import requests
from bs4 import BeautifulSoup
import time


page = 0
letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Y", "Z"]
last_page = False
File = open("food_waste.tsv", "a")
for character in letters: 
    last_page = False
    page = 0
    for pages in range(50):

        if last_page == True:
            print("Done")
            break
        page += 1

        URL = f'http://www.edinburgh.gov.uk/directory/10248/a-to-z/{character}?page={page}'
        print(URL)
        page_all_letters = requests.get(URL)
        soup = BeautifulSoup(page_all_letters.content, "html.parser")
        page_content = soup.find("ul", class_ = 'list list--record')
        if (page_content == None):
            break
        page_temp = soup.find("li", class_ = 'pagination__item pagination__item--next')
        page_links = page_content.findAll("a", class_ = "list__link")
        previous_tag = soup.find("span", class_ = 'pagination__meta')

        if (previous_tag != None):
            if ("You are on the last page" in previous_tag.get_text()):
                last_page = True

        main_URL = "https://www.edinburgh.gov.uk"
        for link in page_links:
            index = page_links.index(link)
            print(index)
            page_letter = requests.get(main_URL+page_links[index].get('href'))
            print(main_URL+page_links[index].get('href'))
            small_soup = BeautifulSoup(page_letter.content, "html.parser")
            collection_details = small_soup.findAll("dd", class_ = "definition__content definition__content--text-box")
            for details in collection_details:
                street_name = collection_details[0].getText().strip()
                collection_day = collection_details[1].getText().strip()
                File.write(f"{ street_name }\t{ collection_day }\n")

            time.sleep(3)

    print(f'Letter {character} was sucessfully scraped!')

File.close()
print('Process complete!')



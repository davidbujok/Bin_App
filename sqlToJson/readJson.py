import json
import pandas as pd
import numpy as np
import pprint

file = open('streets.json')
cfile = pd.read_csv('calendar_links.tsv',sep="\t")

cfile_id = cfile['calendar_id']
cfile_link = cfile['calendar_download_link']

print(cfile_id)

calendar_dict={}

i=0
for id in cfile_id:
    calendar_dict[id] = cfile_link[i]
    i += 1


# print(cfile)
print(calendar_dict)

data = json.load(file)

#
# print(type(data))
# print(data[0])
#
new_format_data = []
#
for street in data:
    dict_name = street['name']
    dict_to_return = {}
    dict_to_return[dict_name] = {
        'garden_waste_id':street['garden_waste_id'],
        'garden_waste_url': street['garden_waste_url'],
        'postcode': street['postcode'],
        'recycling_and_waste_id': street['recycling_and_waste_id']
#         # 'recycling_and_waste_url': street['recycling_and_waste_url']
    }
    if street['recycling_and_waste_id'] in calendar_dict:
        dict_to_return[dict_name]['recycling_and_waste_url'] = calendar_dict[street['recycling_and_waste_id']]

    new_format_data.append(dict_to_return)

print(new_format_data[1])

with open('streetsData.json','w') as outfile:
    json.dump(new_format_data,outfile)


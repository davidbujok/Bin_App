import json

file = open('streets.json')

data = json.load(file)

print(type(data))
print(data[0])

new_format_data = []

for street in data:
    dict_name = street['name']
    dict_to_return = {}
    dict_to_return[dict_name] = {
        'garden_waste_id':street['garden_waste_id'],
        'garden_waste_url': street['garden_waste_url'],
        'postcode': street['postcode'],
        'recycling_and_waste_id': street['recycling_and_waste_id'],
        'recycling_and_waste_url': street['recycling_and_waste_url']
    }
    new_format_data.append(dict_to_return)

print(new_format_data[1])

with open('streetsData.json','w') as outfile:
    json.dump(new_format_data,outfile)


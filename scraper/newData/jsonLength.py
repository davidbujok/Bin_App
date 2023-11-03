import json
import pprint

file = open('all_data_file.json')

data = json.load(file)

count =0 

for item in data:
    print(data[item]["food_id"])
    count +=1

print(count)


# print(data["st john's road odd 43 - 157 and even 6 - 204"]["food_id"])
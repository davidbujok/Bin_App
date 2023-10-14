import pandas as pd
import numpy as np
from pprint import  pprint

bins = pd.read_csv('garden_pickup_days.csv', sep="\t")

addresses = bins["address"]
site = bins["site"]
calendar=bins["calendar"]
calendar_id = bins ["calendar_id"]

addresses = addresses.values
site = site.values
calendar_id = calendar_id.values
calendar = calendar.values


print(len(addresses))
data_dict = {}
i=0
same_dict = {}
same = 0
for address in addresses:
    if address in data_dict:
        same_dict[address] = calendar_id[i]
        same += 1
        pass

    data_dict[address] = calendar_id[i]
    i += 1

print("scrapped addresses: ",len(addresses))
print("unique data: ",len(data_dict))
print("duplicated data: ",len(same_dict))

count =0
for item in same_dict:
    if data_dict[item] == same_dict[item]:
        count+=1

print("duplicated same data: ",count)

pprint(len(data_dict)) 

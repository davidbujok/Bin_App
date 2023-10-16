import pandas as pd
import numpy as np
from pprint import  pprint

garden_bins = pd.read_csv('garden_pickup_days.csv', sep="\t")
bins = pd.read_csv('bin_pickup_days.tsv', sep="\t")

addresses = bins["address"]
site = bins["site"]
# calendar=bins["calendar"]
calendar_id = bins ["calendar_id"]
g_addresses = garden_bins["address"]
g_site = garden_bins["site"]
g_calendar = garden_bins["calendar"]
g_calendar_id = garden_bins["calendar_id"]


addresses = addresses.values
site = site.values
calendar_id = calendar_id.values

g_addresses = g_addresses.values
g_site = g_site.values
g_calendar = g_calendar.values
g_calendar_id = g_calendar_id.values


print("------ Garden ------ \n")

data_dict = {}
i=0
same_dict = {}
same = 0
for g_address in g_addresses:
    g_address = g_address.strip().lower()

    if g_address in data_dict:
        same_dict[g_address] = calendar_id[i]
        same += 1
        pass

    data_dict[g_address] = g_addresses[i]+"\t"+g_site[i]+"\t"+g_calendar[i]+"\t"+g_calendar_id[i]+"\n"
    # data_dict[g_address] = calendar[i]
    i += 1

pprint(len(data_dict))

print("scrapped addresses: ",len(g_addresses))
print("unique data: ",len(data_dict))
print("duplicated data: ",len(same_dict))

count =0
for item in same_dict:
    item = item.strip().lower()
    if data_dict[item] == same_dict[item]:
        count+=1

print("duplicated same data: ",count)

pprint(len(data_dict))
print("\n\n------ Recycling + General -------- \n")

data_dict_2 = {}
i=0
same_dict_2 = {}
same = 0
for eachAddress in addresses:
    eachAddress = eachAddress.strip().lower()
    # pprint(eachAddress)
    if eachAddress in data_dict_2:
        same_dict_2[eachAddress] = calendar_id[i]
        same += 1
        pass

    data_dict_2[eachAddress] = calendar_id[i]
    i += 1


print("scrapped addresses: ",len(addresses))
print("unique data: ",len(data_dict_2))
print("duplicated data: ",len(same_dict_2))

count =0
for item in same_dict_2:
    if data_dict_2[item] == same_dict_2[item]:
        count+=1


print("duplicated same data: ",count)
pprint(len(data_dict_2))
print("\n _________")

getSimilarKeys =[]
getDifferentKeys = []

# for k in data_dict_2:
#     k = k.split(" ")
#     k = k[0]
# pprint(data_dict_2[])

file = open("garden_bins_matching.tsv","a")
i=0
print(len(data_dict))
for key in data_dict:
    if key.strip().lower() in data_dict_2:
        file.write(data_dict[key])

        getSimilarKeys.append(key)
    else:
        getDifferentKeys.append(key)
    i+=1

file.close()
print(getSimilarKeys[-1])



print("keys from Garden List that they don't exist \nin Recycling + General List: ",len(getDifferentKeys))
pprint(len(getSimilarKeys))
# pprint(getDifferentKeys)

from fuzzywuzzy import fuzz

notSimilarKeysList = []
threshold = 0.01  # Adjust this threshold as needed

# for key in data_dict:
#     key_lower = key.strip().lower()
#     notSimilarKeys = [k for k in data_dict_2 if fuzz.ratio(key_lower, k.strip().lower()) <= threshold]

#     if  notSimilarKeys:
#         notSimilarKeysList.append(key)

# print(getSimilarKeys)
# print("\n Not similar keys between the 2 dictionaries by 5% similarity: ",len(notSimilarKeysList))
# pprint(notSimilarKeysList)


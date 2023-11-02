import pandas as pd
import numpy as np
from pprint import  pprint

recyclingData = pd.read_csv('recycling_data.tsv', sep="\t", names=["street", "recycling_id"])
gardenData = pd.read_csv('garden_merge_tab.tsv', sep="\t", names=["street", "garden_id"])

streetsRecyclingNames = recyclingData["street"].values
streetsRecyclingCalId = recyclingData["recycling_id"].values

streetsGardenNames = gardenData["street"].values
streetsGardenCalId = gardenData["garden_id"].values

# pprint(streetsGardenNames)
#
y =0
for item in streetsRecyclingNames:
    streetsRecyclingNames[y] = item.strip().lower()
    y+=1
#
# streetsRecyclingNames = [name.strip().lower()
#                          for name in streetsRecyclingNames]


i=0
all_data_dict = {}
combined_data_with_garden = {}
combined_data_rejected_garden ={}
count_not_none = 0
for streetGarden in streetsGardenNames:
    streetRecyclingClean = streetGarden.strip().lower()

    calendar_id_garden = streetsGardenCalId[i]
    if streetRecyclingClean in streetsRecyclingNames:
        index = np.where(streetsRecyclingNames == streetRecyclingClean)[0][0]
        calendar_id_recycling = streetsRecyclingCalId[index]
        # index = streetsGardenNames.index(street)
        all_data_dict[streetRecyclingClean] = {"recycling_id": calendar_id_recycling, "garden_id": calendar_id_garden}
        count_not_none+=1
    else:
        all_data_dict[streetRecyclingClean] = {"recycling_id": "None", "garden_id": calendar_id_garden}
    i += 1

print((count_not_none))
# pprint(all_data_dict)
#
file = open('all_merged.tsv', 'w')
for key in all_data_dict:
    # print("Key: ",key)
    # print("value :",combined_data_rejected_garden[key])
    value = all_data_dict[key]
    # print("value :",value)
    output = key+"\t"+value["recycling_id"]+"\t"+value["garden_id"]+"\n"
    file.write(output)
file.close()
#


merged_streets = pd.read_csv('all_merged.tsv', sep="\t", names=["street", "recycling_id", "garden_id"])

mergedNames = merged_streets["street"].values
mergedRecyclingId = merged_streets["recycling_id"].values
mergedGardenId = merged_streets["garden_id"].values

recyclingNamesNotInGarden = []
r=0
count_recycling_alone = 0
for streetRecycling in streetsRecyclingNames:
    calendar_id_recycling = streetsRecyclingCalId[r]
    streetRecyclingClean = streetRecycling.lower().strip()
    if streetRecyclingClean not in mergedNames:
        all_data_dict[streetRecyclingClean] = {"recycling_id": calendar_id_recycling, "garden_id": "None"}
        count_recycling_alone+=1
    r+=1



file = open('merged_with_recycling.tsv', 'w')
for key in all_data_dict:
    value = all_data_dict[key]
    output = key+"\t"+value["recycling_id"]+"\t"+value["garden_id"]+"\n"
    file.write(output)
file.close()

import json

with open('merged_with_recycling.json','w') as jsonfile:
    json.dump(all_data_dict,jsonfile)

jsonfile.close()



print(len(all_data_dict))
print(count_recycling_alone)
#
# print(len(recyclingNamesNotInGarden))
#
# print("Count :",count)


# print(len(combined_data_with_garden))
# print(len(combined_data_rejected_garden))
# print(len(streetsGardenNames))
# pprint(len(all_data_dict))
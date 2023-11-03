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
        all_data_dict[streetRecyclingClean] = {"recycling_id": calendar_id_recycling.strip(), "garden_id": calendar_id_garden.strip()}
        count_not_none+=1
    else:
        all_data_dict[streetRecyclingClean] = {"recycling_id": "None", "garden_id": calendar_id_garden.strip()}
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
        all_data_dict[streetRecyclingClean] = {"recycling_id": calendar_id_recycling.strip(), "garden_id": "None"}
        count_recycling_alone+=1
    r+=1



file = open('merged_with_recycling.tsv', 'w')
for key in all_data_dict:
    value = all_data_dict[key]
    output = key+"\t"+value["recycling_id"]+"\t"+value["garden_id"]+"\n"
    file.write(output)
file.close()

# -- START --------- Work with ALL food waste data -------------

foodWaste = pd.read_csv('food_waste_clean_final_data.tsv', sep="\t", names=["street", "food_id"])

foodWasteNames = foodWaste["street"].values
foodWasteId = foodWaste["food_id"].values

# --- START  ----- lower and strip all names of food waste file ----------
index_of_food =0
for item in foodWasteNames:
    foodWasteNames[index_of_food] = item.strip().lower()
    index_of_food+=1
# --- END  ----- lower and strip all names of food waste file ----------


test_counter =0
road_without_food = []


# ----- START ----- Compare our Data Streets with Food Waste Streets  ------------------
for currentNameOfStreet in all_data_dict:
    if currentNameOfStreet in foodWasteNames:
        index = np.where(foodWasteNames == currentNameOfStreet)[0][0]
        food_waste_id = foodWasteId[index]
        # getting the street key , creating new key "food_id" and assing the index item of street
        all_data_dict[currentNameOfStreet]["food_id"] = foodWasteId[index].strip().lower()
        test_counter +=1
    else:
        # Otherwise assign None
        all_data_dict[currentNameOfStreet]["food_id"] = "None"
        road_without_food.append(currentNameOfStreet)

# ----- END ----- Compare our Data Streets with Food Waste Streets  ------------------


# ----- START ------ Put the new Data in our TSV file --------------
file = open('merged_with_recycling.tsv', 'w')
for key in all_data_dict:
    value = all_data_dict[key]
    output = key+"\t"+value["recycling_id"]+"\t"+value["garden_id"]+"\t"+value["food_id"]+"\n"
    file.write(output)
file.close()
# ----- END ------ Put the new Data in our TSV file --------------


# ----START------# Food collection streets that they DON'T exist in our data --------------------------------
merged_streets = pd.read_csv('merged_with_recycling.tsv', sep="\t", names=["street", "recycling_id", "garden_id", "food_id"])

mergedNames = merged_streets["street"].values

l = 0
for foodWasteStreet in foodWasteNames:
    calendar_id_food = foodWasteId[l]
    streetFoodClear = foodWasteStreet.lower().strip()
    if streetFoodClear not in mergedNames:
        all_data_dict[streetFoodClear] = {
            "recycling_id" : "None",
            "garden_id": "None",
            "food_id" : calendar_id_food.strip().lower()
        }
    l+=1

# ----END------# Food collection road that they DON'T exist in our data --------------------------------
print("Roads with  food collection ",test_counter)
print("Roads without food collection",len(road_without_food))
# -- END --------- Work with ALL food waste data -------------

import json

# ---- START ------ Make our Dict into a JSON file
with open('merged_with_recycling.json','w') as jsonfile:
    json.dump(all_data_dict,jsonfile)

jsonfile.close()
# ---- END -------- Make our Dict into a JSON file



print(len(all_data_dict))
print(count_recycling_alone)

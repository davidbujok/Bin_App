import pandas as pd
import numpy as np
from pprint import  pprint

recyclingData = pd.read_csv('recycling_data.tsv', sep="\t", names=["street", "recycling_id"])
gardenData = pd.read_csv('garden_clean_data.tsv', sep="\t", names=["street", "garden_id"])

streetsRecyclingNames = recyclingData["street"].values
streetsRecyclingCalId = recyclingData["recycling_id"].values

streetsGardenNames = gardenData["street"].values
streetsGardenCalId = gardenData["garden_id"].values

y =0
for item in streetsRecyclingNames:
    streetsRecyclingNames[y] = item.strip().lower()
    y+=1

i=0
combined_data_with_garden = {}
combined_data_rejected_garden ={}

for street in streetsGardenNames:
    currentStreet = street.strip().lower()
    # print(currentStreet + "\t" + streetsRecyclingCalId[i])
    if currentStreet in streetsRecyclingNames:
        index = np.where(streetsRecyclingNames == currentStreet)[0][0]
        # index = streetsGardenNames.index(street)
        combined_data_with_garden[currentStreet] = {"recycling_id": streetsRecyclingCalId[index],"garden_id":streetsGardenCalId[i]}
    else:
        combined_data_rejected_garden[currentStreet] = {"recycling_id": "None" , "garden_id": streetsRecyclingCalId[i]}
    i += 1
# pprint(combined_data_rejected_garden)

file = open('rejected_streets.tsv', 'w')
for key in combined_data_rejected_garden:
    print("Key: ",key)
    # print("value :",combined_data_rejected_garden[key])
    value = combined_data_rejected_garden[key]
    # print("value :",value)
    output = key+"\t"+value["recycling_id"]+"\t"+value["garden_id"]+"\n"
    file.write(output)
file.close()


print(len(combined_data_with_garden))
print(len(combined_data_rejected_garden))
import pandas as pd
import numpy as np
from pprint import  pprint


foodWaste = pd.read_csv('food_waste_clean_final_data.tsv', sep="\t", names=["street", "food_id"])

foodWasteNames = foodWaste["street"].values
foodWasteId = foodWaste["food_id"].values

print(len(foodWasteNames))
print(len(foodWasteId))

index_of_food =0
for item in foodWasteNames:
    foodWasteNames[index_of_food] = item.strip().lower()
    index_of_food+=1

print(foodWasteNames[0])


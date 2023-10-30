import pandas as pd
#import numpy as np
from pprint import  pprint

recyclingData = pd.read_csv('recycling_data.tsv', sep="\t", names=["Street", "recycling_id"])
gardenData = pd.read_csv('garden_clean_data.tsv', sep="\t", names=["Street", "garden_id"])

streets = recyclingData["Street"].values
pprint(streets[0])
streetsGarden = gardenData["Street"].values
pprint(streetsGarden)

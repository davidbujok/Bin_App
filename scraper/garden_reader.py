import pandas as pd
import numpy as np
from pprint import  pprint

bins = pd.read_json('bin_pickup_days_.tsv')

print(bins["calendar"])
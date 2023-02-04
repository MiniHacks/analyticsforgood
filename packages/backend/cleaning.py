import pandas as pd
import numpy as np
from datetime import datetime

def money_to_int(money):
    return int(float(money[1:]) * 100)

if __name__ == "__main__":
    orders = pd.read_csv("clean/FY21 LFM Order Items.csv")
    planning = pd.read_csv("clean/FY21 Planning Items.csv")
    


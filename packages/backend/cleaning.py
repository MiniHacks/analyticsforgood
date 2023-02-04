import pandas as pd
import numpy as np
from datetime import datetime
# from db_gen import mapping

def money_to_int(money):
    return int(float(money[1:]) * 100)

if __name__ == "__main__":
    df1 = pd.read_csv("data/FY21 Planning Items.csv")
    df2 = pd.read_csv("data/FY22_Planning_Items_Updated.csv")
    del df2["Price"]
    df = pd.concat([df1,df2])
    df["FulfilPerc"] = df["Fulfilled"]/df["Quantity"]
    df.to_csv("data/Planning_Combined.csv",index=False)




import pandas as pd

def money_to_int(money):
    return int(float(money[1:]) * 100)

if __name__ == "__main__":
    df = pd.read_csv("clean/FY22_Planning_Items_Updated.csv")
    df.to_csv("clean/FY22_Planning_Items_Updated.csv",index=False)
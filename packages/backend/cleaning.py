import pandas as pd

def money_to_int(money):
    return int(float(money[1:]) * 100)

if __name__ == "__main__":
    df = pd.read_csv("clean/FY21 Planning Items.csv", dtype={"Product ID":int})
    print(df.dtypes)
    NaNVals = df[df.isnull().any(axis=1)]
    print(NaNVals)
    df["Cost"] = df["Cost"].apply(money_to_int)
    df.to_csv("clean/FY21 Planning Items.csv",index=False)
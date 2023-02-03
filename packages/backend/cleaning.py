import pandas as pd

def money_to_int(money):
    return int(float(money[1:]) * 100)

if __name__ == "__main__":
    df = pd.read_csv("raw/Land_Water Access.csv")
    print(df.dtypes)
    NaNVals = df[df.isnull().any(axis=1)]
    print(NaNVals)
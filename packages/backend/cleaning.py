import pandas as pd
import numpy as np

def money_to_int(money):
    return int(float(money[1:]) * 100)

if __name__ == "__main__":
    orders = pd.read_csv("clean/FY21 LFM Order Items.csv")
    planning = pd.read_csv("clean/FY21 Planning Items.csv")
    print(orders)
    print(planning)
    order_prods = orders["Product ID"].unique()
    planning_prods = planning["Product ID"].unique()
    print(orders[orders["Producer Code"] == "D2D"])
    print(planning[planning["Producer Code"] == "D2D"])
    # print(len(np.intersect1d(order_prods,planning_prods,assume_unique=True)))
    # print(len(np.union1d(order_prods,planning_prods)))
    # print(len(order_prods))
    # print(len(planning_prods))


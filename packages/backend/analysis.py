import pandas as pd
from datetime import datetime

def money_to_int(money):
    return int(float(money[1:]) * 100)

if __name__ == "__main__":
    orders = pd.read_csv("clean/FY22_LFM_Order_Items_Updated.csv")
    planning = pd.read_csv("clean/FY22_Planning_Items_Updated.csv")
    orders = orders.sort_values("Distribution Date")
    planning = planning.sort_values("Delivery Week")
    planning["Fulfilled"] = 0
    for plan_idx, plan_row in planning.iterrows():
        valid_orders = orders[(orders["Producer Code"] == plan_row["Producer Code"]) & (orders["Product ID"] == plan_row["Product ID"])]
        fulfilled = 0
        for order_idx, order_row in valid_orders.iterrows():
            if (abs((datetime.strptime(order_row["Distribution Date"], "%m/%d/%Y") - datetime.strptime(plan_row["Delivery Week"],"%m/%d/%Y"))).days < 7 and planning.loc[plan_idx,"Fulfilled"] < planning.loc[plan_idx,"Quantity"]):
                needed = planning.loc[plan_idx,"Quantity"] - planning.loc[plan_idx,"Fulfilled"]
                taken = min(needed, order_row["Quantity"])
                orders.loc[order_idx,"Quantity"] = orders.loc[order_idx,"Quantity"] - taken
                planning.loc[plan_idx,"Fulfilled"] = planning.loc[plan_idx,"Fulfilled"] + taken
    planning.to_csv("analysis/FY22_Planning_Items_Updated.csv", index=False)
    



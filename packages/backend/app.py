import numpy as np
import pandas as pd
import statsmodels.api as sm
from fastapi import FastAPI

df = pd.read_csv("./backend/data/Planning_Combined.csv")
del df["Product"]
del df["FulfilPerc"]
del df["Delivery Week"]
df.head()
df["Producer Code"].astype('category')
df["Product ID"].astype('category')
df["Water Access"].astype('category')
df["Land Ownership"].astype('category')

Y = df["Fulfilled"]
from sklearn.preprocessing import OrdinalEncoder

enc = OrdinalEncoder(handle_unknown="use_encoded_value", unknown_value=-1, encoded_missing_value=-1)
df = df[["Producer Code","Product ID","Water Access","Land Ownership","Quantity","Cost","Precip","Snow","Sunlight"]]
df[["Producer Code","Product ID","Water Access","Land Ownership"]] = enc.fit_transform(df[["Producer Code","Product ID","Water Access","Land Ownership"]]).astype(int)
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

Xfull = df[["Producer Code","Product ID","Water Access","Land Ownership","Quantity","Cost","Precip","Snow","Sunlight"]]
train_X, val_X, train_y, val_y = train_test_split(Xfull, Y, random_state=0)
model = RandomForestRegressor(random_state=0)
model.fit(train_X, train_y)
preds_val = model.predict(val_X)
mae = mean_absolute_error(val_y, preds_val)

app = FastAPI()


@app.get("/")
async def root(prod_code: str, prod_id: int, water: int, land: int, quantity: int, cost: int,precip=22.97, snow=50.2, sunlight=143.3667):
    # get prod_code, prod_id, water, land, quantity, cost from query params
    print(prod_code, prod_id, water, land, quantity, cost)
    # return {"cost": cost}
    data = np.append(enc.transform([[prod_code, prod_id, water, land]])[0], [quantity, cost, precip, snow, sunlight])
    pred = model.predict([data])
    return { "prediction" : str(pred[0]) }

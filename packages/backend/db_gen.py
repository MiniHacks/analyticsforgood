from sqlalchemy import Column, Integer, ForeignKey, VARCHAR, DateTime, create_engine, Boolean, Float
from sqlalchemy.orm import relationship, Session, declarative_base
from sqlalchemy.engine import URL
import pandas as pd
from datetime import datetime
import json

Base = declarative_base()

class Producer(Base):
    __tablename__ = "producer"
    id = Column(Integer, primary_key = True)
    code = Column(VARCHAR(3), unique=True)
    land_ownership = Column(Boolean, nullable=True, default=None)
    water_access = Column(Boolean, nullable=True, default=None)
    OTIF = Column(Integer, default=0)
    OT = Column(Integer, default=0)
    FA = Column(Integer, default=0)
    orders = relationship('Order',backref="producer")
    dists = relationship('Planned',backref="producer")

class Product(Base):
    __tablename__ = "product"
    id = Column(Integer,unique=True, primary_key=True, autoincrement=False)
    OTIF = Column(Integer, default=0)
    OT = Column(Integer, default=0)
    FA = Column(Integer, default=0)
    orders = relationship('Order',backref="product")
    dists = relationship('Planned',backref="product")

class Order(Base):
    # This is the predictions that were fulfilled by farmers
    __tablename__ = "order"
    id = Column(Integer, primary_key=True)
    date = Column(DateTime)
    prod_id = Column(Integer, ForeignKey('product.id',ondelete="CASCADE"))
    quantity = Column(Integer)
    cost = Column(Integer)
    price = Column(Integer)
    producer_id = Column(Integer, ForeignKey('producer.id',ondelete="CASCADE"))

class Planned(Base):
    # This is the planned items that were predicted by the company
    __tablename__ = "planned"
    id = Column(Integer, primary_key=True)
    date = Column(DateTime)
    prod_id = Column(Integer, ForeignKey('product.id',ondelete="CASCADE"))
    cost = Column(Integer)
    quantity = Column(Integer)
    quantity_fulfilled = Column(Integer) # Added
    producer_id = Column(Integer, ForeignKey('producer.id',ondelete="CASCADE"))
    

def order_to_db(row):
    producer = session.query(Producer).filter(Producer.code == row["Producer Code"]).first()
    product = session.query(Product).filter(Product.id == row["Product ID"]).first()
    if (producer == None):
        producer = Producer(code=row["Producer Code"],land_ownership=mapping.get("Owns Land").get(row["Producer Code"]), water_access=mapping.get("Access to Water").get(row["Producer Code"]))
        session.add(producer)
        session.flush()
    if (product == None):
        product = Product(id=row["Product ID"])
        session.add(product)
        session.flush()
    order = Order(date=datetime.strptime(row["Distribution Date"],"%m/%d/%Y"),prod_id=product.id,quantity=row["Quantity"],cost=row["Unit Cost"],price=row["Unit Price"],producer_id=producer.id)
    session.add(order)
    session.commit()
    print(f"Added Order {order.id}")

def plan_to_db(row):
    producer = session.query(Producer).filter(Producer.code == row["Producer Code"]).first()
    product = session.query(Product).filter(Product.id == row["Product ID"]).first()
    if (producer == None):
        producer = Producer(
            code=row["Producer Code"],
            land_ownership=mapping.get("Owns Land").get(row["Producer Code"]), 
            water_access=mapping.get("Access to Water").get(row["Producer Code"]),
            OTIF = 1*(row["Quantity"] == row["Fulfilled"]),
            OT = 1*(row["Fulfilled"] > 0),
            FA = 1*(row["Quantity"] == row["Fulfilled"])
        )
    else:
        producer.OTIF += 1*(row["Quantity"] == row["Fulfilled"])
        producer.OT += 1*(row["Fulfilled"] > 0)
        producer.FA += 1*(row["Quantity"] == row["Fulfilled"])
    if (product == None):
        product = Product(id=row["Product ID"],OTIF = 1*(row["Quantity"] == row["Fulfilled"]),OT = 1*(row["Fulfilled"] > 0),FA = 1*(row["Quantity"] == row["Fulfilled"]))
    else:
        product.OTIF += 1*(row["Quantity"] == row["Fulfilled"])
        product.OT += 1*(row["Fulfilled"] > 0)
        product.FA += 1*(row["Quantity"] == row["Fulfilled"])
    session.add(product)
    session.add(producer)
    session.flush()
    plan = Planned(
        date=datetime.strptime(row["Delivery Week"],"%m/%d/%Y"),
        prod_id=product.id,
        quantity=row["Quantity"],
        cost=row["Cost"],
        quantity_fulfilled=row["Fulfilled"],
        producer_id=producer.id
    )
    session.add(plan)
    session.commit()
    print(f"Added Plan {plan.id}")

with open("config.json","r") as f:
    data = json.load(f)
    url = URL.create(
        drivername="postgresql",
        username=data.get("username"),
        password=data.get("password"),
        host=data.get("host"),
        port="25060",
        database=data.get("database")
    )

mapping = {'Owns Land': {'AGF': True, 'AFC': True, 'BXF': True, 'CAL': True, 'CBO': False, 'CBS': True, 'CMA': False, 'CTH': False, 'CMU': False, 'CHO': True, 'CLP': True, 'D2D': True, 'DTF': True, 'HAF': True, 'YMF': False, 'HOP': False, 'ONC': False, 'JWI': False, 'KAL': False, 'KHF': False, 'LDX': False, 'LVO': True, 'LFF': False, 
'UNK': False, 'MFP': False, 'MMO': False, 'MHA': False, 'MHG': True, 'NTN': False, 'MLG': False, 'PZM': False, 'PBY': False, 'PLT': False, 'RSV': False, 'SRF': False, 'SEE': True, 'KSL': False, 'SXF': False, 'LOF': False, 'TEB': True, 'TXI': False, 'CVP': False}, 'Access to Water': {'AGF': True, 'AFC': True, 'BXF': False, 'CAL': True, 'CBO': False, 'CBS': True, 'CMA': False, 'CTH': False, 'CMU': False, 'CHO': False, 'CLP': False, 'D2D': True, 'DTF': False, 'HAF': False, 'YMF': True, 'HOP': True, 'ONC': False, 'JWI': False, 'KAL': False, 'KHF': False, 'LDX': True, 'LVO': True, 'LFF': True, 'UNK': False, 'MFP': False, 'MMO': False, 'MHA': False, 
'MHG': True, 'NTN': False, 'MLG': False, 'PZM': True, 'PBY': False, 'PLT': False, 'RSV': False, 'SRF': True, 'SEE': True, 'KSL': False, 'SXF': False, 'LOF': False, 'TEB': False, 'TXI': False, 'CVP': False}}
engine = create_engine(url)
Base.metadata.create_all(engine)
session = Session(engine)
if __name__ == "__main__":
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    print("Wiped Date, Regenning")
    orders = ["clean/FY21 LFM Order Items.csv","clean/FY22_LFM_Order_Items_Updated.csv"]
    plannings = ["analysis/FY21 Planning Items.csv","analysis/FY22_Planning_Items_Updated.csv"]
    ProducerInfo = pd.read_csv("clean/Land_Water Access.csv")
    for order in orders:
        df = pd.read_csv(order)
        df.apply(order_to_db,axis=1)
    for plan in plannings:
        df = pd.read_csv(plan)
        df.apply(plan_to_db,axis=1)
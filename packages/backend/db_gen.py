from sqlalchemy import Column, Integer, ForeignKey, VARCHAR, DateTime, create_engine
from sqlalchemy.orm import relationship, Session, declarative_base
import pandas as pd
from datetime import datetime

Base = declarative_base()

class Producer(Base):
    __tablename__ = "producer"
    id = Column(Integer, primary_key = True)
    code = Column(VARCHAR(3), unique=True)
    orders = relationship('Order',backref="producer")
    dists = relationship('Planned',backref="producer")

class Order(Base):
    # This is the predictions that were fulfilled by farmers
    __tablename__ = "order"
    id = Column(Integer, primary_key=True)
    date = Column(DateTime)
    prod_id = Column(Integer)
    quantity = Column(Integer)
    cost = Column(Integer)
    price = Column(Integer)
    producer_id = Column(Integer, ForeignKey('producer.id',ondelete="CASCADE"))

class Planned(Base):
    # This is the planned items that were predicted by the company
    __tablename__ = "planned"
    id = Column(Integer, primary_key=True)
    date = Column(DateTime)
    prod_id = Column(Integer)
    cost = Column(Integer)
    quantity = Column(Integer)
    producer_id = Column(Integer, ForeignKey('producer.id',ondelete="CASCADE"))
    

def order_to_db(row):
    producer = session.query(Producer).filter(Producer.code == row["Producer Code"]).first()
    if (producer == None):
        producer = Producer(code=row["Producer Code"])
        session.add(producer)
        session.flush()
    order = Order(date=datetime.strptime(row["Distribution Date"],"%m/%d/%Y"),prod_id=row["Product ID"],quantity=row["Quantity"],cost=row["Unit Cost"],price=row["Unit Price"],producer_id=producer.id)
    session.add(order)
    session.commit()

def plan_to_db(row):
    producer = session.query(Producer).filter(Producer.code == row["Producer Code"]).first()
    if (producer == None):
        producer = Producer(code=row["Producer Code"])
        session.add(producer)
        session.flush()
    plan = Planned(date=datetime.strptime(row["Delivery Week"],"%m/%d/%Y"),prod_id=row["Product ID"],quantity=row["Quantity"],cost=row["Cost"],producer_id=producer.id)
    session.add(plan)
    session.commit()

engine = create_engine("sqlite:///../../ProcessedData.db",echo=False,future=True)
Base.metadata.create_all(engine)
session = Session(engine)
if __name__ == "__main__":
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    print("Wiped Date, Regenning")
    orders = ["clean/FY21 LFM Order Items.csv","clean/FY22_LFM_Order_Items_Updated.csv"]
    plannings = ["clean/FY21 Planning Items.csv","clean/FY22_Planning_Items_Updated.csv"]
    for order in orders:
        df = pd.read_csv(order)
        df.apply(order_to_db,axis=1)
    for plan in plannings:
        df = pd.read_csv(plan)
        df.apply(plan_to_db,axis=1)
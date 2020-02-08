# import pymongo
import pandas as pd
from pymongo import MongoClient 
# Mongo connection
def get_db():
    conn = "mongodb://localhost:27017"
    client = MongoClient(conn)
    print("Connecting to MongoDB")
    return client.stockDB

def fetch_stock():  
    db= get_db()
    financial_indicator=[stock for stock in db.Financial_data2018.find({},{'_id': 0})]
    print(pd.DataFrame(financial_indicator))
    return financial_indicator
# print(financial_indicator) 
# df = pd.DataFrame(financial_indicator)
# print(df)
  
if __name__ == '__main__':
    print('financial_indicator')
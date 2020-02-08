from pymongo import MongoClient 
import pandas as pd

# Mongo connection
def get_db():
    conn = "mongodb://localhost:27017"
    client = MongoClient(conn)
    return client.stockDB

def fetch_stock2018():    
    db= get_db()
    stock=[stock for stock in db.top500_2018.find({},{'_id': 0})]
    return stock 

def all_stock():    
    db= get_db()
    all_stock=[stock for stock in db.all_stock.find({},{'_id': 0})]
    # print(pd.DataFrame(all_stock))
    return all_stock 

  
if __name__ == '__main__':
    print(all_stock)
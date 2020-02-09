from pymongo import MongoClient 
import pandas as pd
# from secrets import credentials

# Mongo connection
def get_db():
    conn = f'mongodb+srv://<USER NAME>:<PASSWORD>@cluster0-h88wh.mongodb.net/test?retryWrites=true&w=majority'
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
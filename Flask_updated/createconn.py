from pymongo import MongoClient 
import pandas as pd
from config import credentials



# Mongo connection
def get_db():
    conn = f'mongodb+srv://{credentials["user"]}:{credentials["password"]}@cluster0-h88wh.mongodb.net/test?retryWrites=true&w=majority'
    client = MongoClient(conn)
    return client.DataBase_stocks

def fetch_stock2014():    
    db= get_db()
    stock=[stock for stock in db.top500_2014.find({},{'_id': 0})]
    return stock 

def all_stock(selected_ticker): 
    print('make connection to collection') 
    db= get_db()
    all_stock=[stock for stock in db.all_stock.find({"ticker": selected_ticker},{'_id': 0})]
    print(pd.DataFrame(all_stock))
    return all_stock 

  
if __name__ == '__main__':
    print(all_stock)
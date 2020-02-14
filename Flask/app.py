from pymongo import MongoClient 
import pandas as pd
<<<<<<< HEAD
# from secrets import credentials

# Mongo connection
def get_db():
    conn = f'mongodb+srv://<USER NAME>:<PASSWORD>@cluster0-h88wh.mongodb.net/test?retryWrites=true&w=majority'
=======
from config import credentials

print()
# Mongo connection
def get_db():
    conn = f'mongodb+srv://{credentials["user"]}:{credentials["password"]}@cluster0-h88wh.mongodb.net/test?retryWrites=true&w=majority'
>>>>>>> e15dfaf7c2c1783e7f0944c00d540bc91a185e4f
    client = MongoClient(conn)
    return client.DataBase_stocks

def fetch_stock2018():    
    db= get_db()
    stock=[stock for stock in db.top500_2018.find({},{'_id': 0})]
    return stock 

def fetch_sectors2018(selected_sector):    
    db= get_db()
    sectors =[stock for stock in db.top500_2018.find({'Sector':selected_sector},{'_id': 0})]
    return sectors 

def all_stocksector():    
    db= get_db()
    all_stock=[stock for stock in db.all_stock.find({},{'_id': 0})]
    # print(pd.DataFrame(all_stock))
    return all_stock 

  
if __name__ == '__main__':
    print(all_stock)
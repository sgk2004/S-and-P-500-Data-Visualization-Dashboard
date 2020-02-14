from pymongo import MongoClient 
import pandas as pd
from config import credentials

# Mongo connection
def get_db():
    conn = f'mongodb+srv://{credentials["user"]}:{credentials["password"]}@cluster0-h88wh.mongodb.net/test?retryWrites=true&w=majority'
    client = MongoClient(conn)
    return client.DataBase_stocks

def fetch_stock2018(sector):    
    db= get_db()
    stock=[stock for stock in db.top500_2018.find({"Sector": sector},{'_id': 0})]
    return stock 

def all_stock(selected_ticker): 
    print('make connection to collection')   
    db= get_db()
    all_stock=[stock for stock in db.all_stock.find({"ticker": selected_ticker},{'_id': 0})]
    # print(pd.DataFrame(all_stock))
    return all_stock 

def fetch_stock():    
    db= get_db()
    stock=[stock for stock in db.top500_2018.find({},{'_id': 0})]
    return stock

def fetch_financial_indicator_2018(selected_ticker):    
    db= get_db()
    stock=[stock for stock in db.top500_2018.find({"ticker": selected_ticker},{'_id': 0})]
    return stock 

def fetch_financial_indicator_2017(selected_ticker):    
    db= get_db()
    stock=[stock for stock in db.top500_2017.find({"ticker": selected_ticker},{'_id': 0})]
    return stock 

def fetch_financial_indicator_2016(selected_ticker):    
    db= get_db()
    stock=[stock for stock in db.top500_2016.find({"ticker": selected_ticker},{'_id': 0})]
    return stock 

def fetch_financial_indicator_2015(selected_ticker):    
    db= get_db()
    stock=[stock for stock in db.top500_2015.find({"ticker": selected_ticker},{'_id': 0})]
    return stock 

def fetch_financial_indicator_2014(selected_ticker):    
    db= get_db()
    stock=[stock for stock in db.top500_2014.find({"ticker": selected_ticker},{'_id': 0})]
    return stock 

if __name__ == '__main__':
    print(all_stock)


   
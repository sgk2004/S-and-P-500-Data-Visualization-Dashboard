from flask import Flask, render_template, jsonify
from app import all_stock, fetch_stock2018
import pandas as pd
import datetime as dt

# Flask app

app = Flask(__name__)

#HOME PAGE- AMZN
@app.route('/')
def home():
    stocks= all_stock()
    #read to dataframe
    stocks_df= pd.DataFrame(stocks)
    stocks_df= stocks_df.loc[stocks_df['ticker'] == 'AMZN']
    print(stocks_df)
    response= jsonify(stocks_df.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#TICKER
@app.route('/<selected_ticker>')
def hello(selected_ticker):
    stocks= all_stock()
    #read to dataframe
    stocks_df= pd.DataFrame(stocks)
    stocks_df= stocks_df.loc[stocks_df['ticker'] == selected_ticker]
    print(stocks_df)
    respsonse= jsonify(stocks_df.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#FREQUENCY
@app.route('/<selected_ticker>/<freq>')
def frequency(selected_ticker, freq):
    stocks= all_stock()
    stocks_df= pd.DataFrame(stocks)
    stocks_df= stocks_df.loc[stocks_df['ticker'] == selected_ticker]
    stocks_df['date']=pd.to_datetime(stocks_df['date'], format='%Y-%m-%d', errors='coerce')
    stocks_df['month']= pd.DatetimeIndex(stocks_df['date']).month
    stocks_df= stocks_df.resample(freq, on='date').mean()
    print(stocks_df)
    response= jsonify(stocks_df.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#COMPANY SELECTION FOR 2018
@app.route('/company/<selected_ticker>/')
def company_ticker(selected_ticker):
    stocks= fetch_stock2018()
    #read to dataframe
    stocks_df2018= pd.DataFrame(stocks)
    print(stocks_df2018)
    stocks_df2018= stocks_df2018.loc[stocks_df2018['ticker'] == selected_ticker]
    print(stocks_df2018)
    response= jsonify(stocks_df2018.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/company')
def companyHome():
    stocks= fetch_stock2018()
    #read to dataframe
    stocks_df2018= pd.DataFrame(stocks)
    print(stocks_df2018)
    response= jsonify(stocks_df2018.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#SECTOR SELECTION FOR 2018
@app.route('/sector/<selected_sector>/')
def sector(selected_sector):
    stocks= fetch_stock2018()
    #read to dataframe
    stocks_df2018= pd.DataFrame(stocks)
    print(stocks_df2018)
    stocks_df2018= stocks_df2018.loc[stocks_df2018['Sector'] == selected_sector]
    print(stocks_df2018)
    response= jsonify(stocks_df2018.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#SECTOR HOMEPAGE FOR 2018
@app.route('/sector')
def sectorHome():
    stocks= fetch_stock2018()
    #read to dataframe
    stocks_df2018= pd.DataFrame(stocks)
    print(stocks_df2018)
    response= jsonify(stocks_df2018.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    print(response.headers)
    return response




if __name__ == '__main__':
    app.run(debug=True )
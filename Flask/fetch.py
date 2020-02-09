from flask import Flask, render_template, jsonify
from app import all_stock, fetch_stock2018
import pandas as pd
import datetime as dt

# Flask app

app = Flask(__name__)

@app.route('/<selected_ticker>')
def hello(selected_ticker):
    stocks= all_stock()
    #read to dataframe
    stocks_df= pd.DataFrame(stocks)
    stocks_df= stocks_df.loc[stocks_df['ticker'] == selected_ticker]
    print(stocks_df)
    return jsonify(stocks_df.to_dict('records'))
    
@app.route('/<selected_ticker>/<freq>')
def frequency(selected_ticker, freq):
    stocks= all_stock()
    #read to dataframe
    stocks_df= pd.DataFrame(stocks)
    stocks_df= stocks_df.loc[stocks_df['ticker'] == selected_ticker]
    stocks_df['date']=pd.to_datetime(stocks_df['date'], format='%Y-%m-%d', errors='coerce')
    stocks_df['month']= pd.DatetimeIndex(stocks_df['date']).month
    stocks_df= stocks_df.resample(freq, on='date').mean()
    print(stocks_df)
    return jsonify(stocks_df.to_dict('records'))

@app.route('/company/<selected_ticker>/')
def company_ticker(selected_ticker):
    stocks= fetch_stock2018()
    #read to dataframe
    stocks_df2018= pd.DataFrame(stocks)
    print(stocks_df2018)
    stocks_df2018= stocks_df2018.loc[stocks_df2018['ticker'] == selected_ticker]
    print(stocks_df2018)
    return jsonify(stocks_df2018.to_dict('records'))

@app.route('/sector/<selected_sector>/')
def sector(selected_sector):
    stocks= fetch_stock2018()
    #read to dataframe
    stocks_df2018= pd.DataFrame(stocks)
    print(stocks_df2018)
    stocks_df2018= stocks_df2018.loc[stocks_df2018['Sector'] == selected_sector]
    print(stocks_df2018)
    return jsonify(stocks_df2018.to_dict('records'))

if __name__ == '__main__':
    app.run(debug=True )
from flask import Flask, render_template, jsonify
from app import all_stock, fetch_stock2018, fetch_financial_indicator_2018, fetch_financial_indicator_2017, fetch_financial_indicator_2016, fetch_financial_indicator_2015, fetch_financial_indicator_2014,fetch_stock
import pandas as pd
import datetime as dt

# Flask app

app = Flask(__name__)
# ********HOME PAGE*******************

#SECTOR HOMEPAGE FOR 2018
@app.route('/home')
def sectorHome():
    stocks= fetch_stock2018('Technology')
    #read to dataframe
    stocks_df2018= pd.DataFrame(stocks)
    print(stocks_df2018)
    response= jsonify(stocks_df2018.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    print("***************")
    print(response.headers)
    return response

#HOME PAGE- APPLE
@app.route('/')
def home():
    selected_ticker= 'AAPL' 
    stocks= all_stock(selected_ticker)
    #read to dataframe
    stocks_df= pd.DataFrame(stocks)
    print(stocks_df)
    response= jsonify(stocks_df.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# *******************SECTOR*************************************

#SECTOR SELECTION FOR 2018
@app.route('/sector/<selected_sector>/')
def sector(selected_sector):
    stocks= fetch_stock2018(selected_sector)
    #read to dataframe
    stocks_df2018= pd.DataFrame(stocks)
    stocks_df2018= stocks_df2018.nlargest(10,'Revenue')
    print(stocks_df2018)
    response= jsonify(stocks_df2018.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    # -----------------------------------------------------
   

# *********************FINANCIAL INDICATOR BY TICKER************************
#COMPANY SELECTION FOR 2014-18
@app.route('/2018/<selected_ticker>/')
def company_ticker2018(selected_ticker):
    stocks= fetch_financial_indicator_2018(selected_ticker)
    #read to dataframe
    stocks_df2018= pd.DataFrame(stocks)
    print(stocks_df2018)
    response= jsonify(stocks_df2018.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/2017/<selected_ticker>/')
def company_ticker2017(selected_ticker):
    stocks= fetch_financial_indicator_2017(selected_ticker)
    #read to dataframe
    stocks_df2018= pd.DataFrame(stocks)
    print(stocks_df2018)
    response= jsonify(stocks_df2018.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/2016/<selected_ticker>/')
def company_ticker2016(selected_ticker):
    stocks= fetch_financial_indicator_2016(selected_ticker)
    #read to dataframe
    stocks_df2018= pd.DataFrame(stocks)
    print(stocks_df2018)
    response= jsonify(stocks_df2018.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/2015/<selected_ticker>/')
def company_ticker2015(selected_ticker):
    stocks= fetch_financial_indicator_2015(selected_ticker)
    #read to dataframe
    stocks_df2018= pd.DataFrame(stocks)
    print(stocks_df2018)
    response= jsonify(stocks_df2018.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/2014/<selected_ticker>/')
def company_ticker2014(selected_ticker):
    stocks= fetch_financial_indicator_2014(selected_ticker)
    #read to dataframe
    stocks_df2018= pd.DataFrame(stocks)
    print(stocks_df2018)
    response= jsonify(stocks_df2018.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/sector/')
def sectorfordropdown():
    stocks= fetch_stock()
    #read to dataframe
    stocks_df2018= pd.DataFrame(stocks)
    print(stocks_df2018)
    response= jsonify(stocks_df2018.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# ******************TIME SERIES GRAPH BY TICKER******************************
#TICKER
@app.route('/<selected_ticker>')
def hello(selected_ticker):
    stocks= all_stock(selected_ticker)
    #read to dataframe
    stocks_df= pd.DataFrame(stocks)
    print(stocks_df)
    response= jsonify(stocks_df.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#FREQUENCY
@app.route('/<selected_ticker>/<freq>')
def frequency(selected_ticker, freq):
    stocks= all_stock(selected_ticker)
    stocks_df= pd.DataFrame(stocks)
    # stocks_df= stocks_df.loc[stocks_df['ticker'] == selected_ticker]    
    stocks_df['date']=pd.to_datetime(stocks_df['date'], format='%Y-%m-%d', errors='coerce')
    stocks_df['month']= pd.DatetimeIndex(stocks_df['date']).month
    stocks_df= stocks_df.resample(freq, on='date').mean()
    print(stocks_df)
    response= jsonify(stocks_df.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

    # *************************************************************
#     @app.route('/<selected_ticker>/<freq>')
# def frequency(selected_ticker, freq):
#     stocks= all_stock(selected_ticker)
#     stocks_df= pd.DataFrame(stocks)
    
#     stocks_df['date']=pd.to_datetime(stocks_df['date'], format='%Y-%m-%d', errors='coerce')
#     stocks_df['month']= pd.DatetimeIndex(stocks_df['date']).month
#     stocks_df= stocks_df.resample(freq, on='date').mean()
#     print(stocks_df)
#     response= jsonify(stocks_df.to_dict('records'))
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response
    
# **************************************************************************

if __name__ == '__main__':
    app.run(debug=True )
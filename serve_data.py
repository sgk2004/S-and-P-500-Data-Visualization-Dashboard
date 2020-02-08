from flask import Flask, jsonify
# from fetch_fromdb import fetch_stock2018, all_stock

# Flask app
app = Flask(__name__)

# @app.route('/2018')
# def home():
#     stock2018= fetch_stock2018()
#     resp = jsonify(stock2018)
#     # resp.status_code = 200
#     print(resp)
#     return resp

# @app.route('/all_stock')
# def search(): 
#     print('test')
#     all_stock= all_stock()
#     print(all_stock)
#     # all_stock_df= pd.dataframe(all_stock)
#     resp = jsonify(all_stock)
#     print(resp)
#     return(resp)
#     # company_name = 'AMZN'
#     # all_stock_df[df[ticker == company_name]]

#     # resp = jsonify(all_stock_df)
#     # # resp.status_code = 200
#     # print(resp)
#     # return resp

@app.route('/')
def test():
    print('***********************************************************test')


if __name__ == '__main__':
    print(app.url_map)
    app.run(debug=True)
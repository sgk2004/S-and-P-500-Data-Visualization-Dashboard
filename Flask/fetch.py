from flask import Flask, render_template, jsonify
from app import fetch_stock

# Flask app
app = Flask(__name__)
@app.route('/')
def hello():
    finance_data= fetch_stock()
    print("Function to")
    j_data = jsonify(finance_data)
    j_data.status_code = 200
    print(j_data)
    return j_data
if __name__ == '__main__':
    app.run(debug=True )
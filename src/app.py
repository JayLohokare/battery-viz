from flask import Flask, request
from flask import jsonify
import pandas
from flask_cors import CORS, cross_origin
import numpy as np

app = Flask(__name__)
cors = CORS(app, resources={r"/getCounties": {"origins": "*"}})
cors = CORS(app, resources={r"getCounties": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def testApiLive():
    return "API is working"


@app.route('/getCounties',  methods=['POST', 'GET'])
@cross_origin()
def getCounties():
    df = pandas.read_csv('data/counties.csv')
    df = df[['X (Lat)', 'Y (Long)', 'CNTY_NM', 'CNTY_NBR']]
    df.rename(columns={'X (Lat)': "X", "Y (Long)": "Y", "CNTY_NM": "name", "CNTY_NBR": "id"},  inplace = True)
    response = jsonify(df.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/getData',  methods=['POST', 'GET'])
@cross_origin()
def getData():
    df = pandas.read_csv('data/supply.csv', header=[0,1], encoding = 'ISO-8859-1').dropna()
   
    print(df.columns)
  
    return "None"


if __name__=="__main__":
    app.run(host='0.0.0.0', port=5000)
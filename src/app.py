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
    county = request.args.get('county')
    if county == None:
        return {}
    
    df = pandas.read_csv('data/supply.csv', encoding = 'ISO-8859-1')
    df.columns = ( df.columns[:12].tolist()  + df.iloc[0, 12:].tolist()   )
    df = df.iloc[1:].reset_index(drop=True) 
    df =  df.iloc[: , :176]

    if county not in df["County"].tolist():
        return {}

    df = df.loc[df['County'] == county]
    df = df.iloc[:, 11:] 

    response = jsonify(df.to_dict('records'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__=="__main__":
    app.run(host='0.0.0.0', port=5000)
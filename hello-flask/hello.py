from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from markupsafe import escape
from configparser import ConfigParser
from pathlib import Path
import mysql.connector

cfgFile = str(Path.home() / "projects" / "web3-wmacevoy-private" / "cats.ini" )
cfg=ConfigParser()
cfg.read(cfgFile)

print(f"db user is {cfg['db']['user']}")

dbUser = cfg['db']['user']
dbPass = cfg['db']['password']

app = Flask(__name__)
CORS(app)

def connect():
    mydb = mysql.connector.connect(
        host=cfg['db']['host'],
        user=cfg['db']['user'],
        password=cfg['db']['password'],
        database=cfg['db']['database'])
    return mydb

@app.route("/")
@cross_origin()
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/kitty",methods=["POST"])
@cross_origin()
def post_kitty():
    mydb=connect()
    data = request.json
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute(f"INSERT name,color INTO kitten VALUES (%(name)s,%(color)s)",
        {'name': data['name'], 'color': data['color']})
    id=mycursor.lastrowid
    return jsonify({'id':id})


    return jsonify({"uuid":uuid})
    return f"post kitty {id}"


@app.route("/kitty/<int:id>",methods=["GET"])
@cross_origin()
def get_kitty(id):
    mydb=connect()
    mycursor = mydb.cursor(dictionary=True)

    mycursor.execute(f"SELECT id,name,color FROM kitten WHERE (id = %(id)s)", {'id': id})
    myresult = mycursor.fetchall()
    return jsonify(myresult[0] if len(myresult)==1 else None)



@app.route("/add/<x>/<y>")
@cross_origin()
def add(x,y):
    x=float(x)
    y=float(y)
    z=x+y
    return jsonify({'x': x, 'y':y, 'z': z})
 
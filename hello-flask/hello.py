from flask import Flask, jsonify
from markupsafe import escape

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/kitty/<name>")
def kitty(name):
    return f"kitty {escape(name)}"

@app.route("/add/<x>/<y>")
def add(x,y):
    x=float(x)
    y=float(y)
    z=x+y
    return jsonify({'x': x, 'y':y, 'z': z})
 
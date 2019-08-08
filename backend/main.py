import os
import sys
from flask import Flask
from backend.wish_blueprint.wish_blueprint import wish_blueprint

# instantiate the app
app = Flask(__name__)

app.register_blueprint(wish_blueprint)


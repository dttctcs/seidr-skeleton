import logging

from flask import Flask
from flask_appbuilder import AppBuilder, SQLA
from seidr import Seidr

from . import config

"""
 Logging configuration
"""

logging.basicConfig(format="%(asctime)s:%(levelname)s:%(name)s:%(message)s")
logging.getLogger().setLevel(logging.DEBUG)

app = Flask(__name__)

app.config.from_object(config)

db = SQLA(app)
appbuilder = AppBuilder(app, db.session)
seidr = Seidr(appbuilder)


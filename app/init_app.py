import logging

from flask import Flask
from flask_appbuilder import AppBuilder, SQLA, IndexView, expose
from seidr import Seidr

from . import config
"""
 Logging configuration
"""

logging.basicConfig(format="%(asctime)s:%(levelname)s:%(name)s:%(message)s")
logging.getLogger().setLevel(logging.DEBUG)


#  Create custom index view
class SeidrIndexView(IndexView):
    index_template = 'index.html'
    route_base = "/"

    @expose("/<string:path>")
    @expose("/<path:path>")
    def index_all(self, path):
        return self.render_template(self.index_template, appbuilder=self.appbuilder)

    @expose("/")
    def index(self):
        return self.render_template(self.index_template, appbuilder=self.appbuilder)


app = Flask(__name__)

app.config.from_object(config)

db = SQLA(app)
appbuilder = AppBuilder(app, db.session, indexview=SeidrIndexView)
seidr = Seidr(appbuilder)

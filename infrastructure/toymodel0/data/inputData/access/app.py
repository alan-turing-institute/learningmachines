from database import db
from flask import Flask
from flask_cors import CORS
import os
from time import sleep
from sqlalchemy.exc import OperationalError
from project.config import config
from models.person import people

def create_app(config_name):
	app = Flask(__name__)
	app.config.from_object(config[config_name])
	print("*** Setting up app with", config_name, "configuration... ***")
	with app.app_context():
			db.init_app(app)
	app.register_blueprint(people, url_prefix='/people')
	return app


def setup_database(app):
	print(os.environ['POPULATE_DB'])
	print(os.environ['POPULATE_DB']=="false")
	print(os.environ['POPULATE_DB']=="true")
	if os.environ['POPULATE_DB'] == "true":
		print("Populating...")
		with app.app_context():
			db.drop_all()
			print("Dropped...")
			db.create_all()
			print("Created...")

if __name__ == '__main__':
	app = create_app(os.environ["FLASK_ENV"] or "default")
	CORS(app=app)

	db_ready = False
	while not db_ready:
		try:
			db_ready = True
			setup_database(app=app)
		except OperationalError as e:
			db_ready = False
			print("Database is not ready yet...")
			sleep(5)
			
	app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)
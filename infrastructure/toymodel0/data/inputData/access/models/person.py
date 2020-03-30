from database import db
from flask.blueprints import Blueprint
from flask import jsonify
import json

people = Blueprint('people', __name__,
				 template_folder='templates',
				 static_folder='static')

class Person(db.Model):
	"""model for one of your table"""
	__tablename__ = 'person'
	id = db.Column(db.Integer, primary_key=True)
	fname = db.Column(db.String())
	lname = db.Column(db.String())

	def __init__(self, fname, lname):
		self.fname = fname
		self.lname = lname

	def __repr__(self):
		return json.dumps({"id": self.id, "fname": self.fname})
	
	@property
	def serialize(self):
		"""Return object data in easily serializeable format"""
		return {
			'id' : self.id,
			'fname': self.fname,
			'lname': self.lname,
		}

	@classmethod
	def populate(self, fname, lname):
		person = self(fname, lname)
		db.session.add(person)
		db.session.commit()


@people.route('/')
def main():  
	return "Hello Team Learning Machines"

@people.route('/persons')
def view_persons():
	persons = Person.query.all()
	return jsonify(team=[p.serialize for p in persons])
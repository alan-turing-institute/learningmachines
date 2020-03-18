from flask import Flask
from database import db
from fill_database import create_app,setup_database
from time import sleep
from sqlalchemy.exc import OperationalError

if __name__ == '__main__':

    app = create_app()
    db_ready = False
    while not db_ready:
        try:
            db_ready = True
            setup_database(app=app, datapath='./data/', POPULATE_DB=False)
        except OperationalError as e:
            db_ready = False
            print("Database is not ready yet...")
            sleep(5)

    print("Past this point!")
    app.run(debug=True, host='0.0.0.0')


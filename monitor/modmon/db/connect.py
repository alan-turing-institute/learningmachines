"""
Functions for connecting to the ModMon database.
"""
# import pyodbc
import sqlalchemy
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, inspect

from ..config import config
from .schema import Base


def get_database_config(db_config=config["database"]):
    """Generate a database connection string from a section in the ModMon config file.

    Parameters
    ----------
    db_config : configparser.SectionProxy, optional
        Section from a ConfigParser config file. The section must include the keys
        "dialect", "host" and "database", and optionally can contain "port", "username"
        and "password". By default modmon.config.config["database"].

    Returns
    -------
    str, str
        sqlalchemy database connection string and the name of the database.

    Raises
    ------
    KeyError
        If "dialect", "host" or "database" are not present in db_config
    """
    required = ["dialect", "host", "database"]
    for key in required:
        if key not in db_config:
            raise KeyError(f"{key} not found in database config")

    dialect = db_config.get("dialect")
    host = db_config.get("host")
    port = db_config.get("port")
    database = db_config.get("database")
    username = db_config.get("user")
    password = db_config.get("password", None)

    if username == "":
        username = None
    if password == "":
        password = None
    if port == "":
        port = None

    url = sqlalchemy.engine.url.URL(
        dialect,
        username=username,
        password=password,
        host=host,
        port=port,
        database=database,
        query=None,
    )
    return url, database


DB_CONNECTION_STRING, DATABASE_NAME = get_database_config(config["database"])
ENGINE = create_engine(DB_CONNECTION_STRING)
Base.metadata.bind = ENGINE


def check_connection_ok():
    """Test that connecting to the ModMon database is successful.

    Returns
    -------
    tuple
        Length 2 tuple, where first element is a bool (True is connection successful),
        and second element is a sqlalchemy.exc.OperationalError containing details of
        any exception.
    """
    try:
        with ENGINE.connect() as _:
            pass
        return (True, None)
    except sqlalchemy.exc.OperationalError as e:
        return (False, e)


def get_session():
    """Get a SQLAlchemy session bound to the ModMon database.

    Returns
    -------
    sqlalchemy.orm.session.Session
        ModMon database session.
    """
    DBSession = sessionmaker(bind=ENGINE)
    return DBSession()


def main():
    """Check connection to the ModMon database and, if successful, print the tables and
    columns it contains.
    
    To be used from command line as modmon_db_check
    """
    ok, error = check_connection_ok()
    if not ok:
        print(f"Connecting to the database failed with exception {error}")

    inspector = inspect(ENGINE)
    for table_name in inspector.get_table_names():
        print("=" * 30)
        print("TABLE:   ", table_name)
        print("COLUMNS: ", end=" ")
        columns = inspector.get_columns(table_name)
        for i, column in enumerate(columns):
            if i == len(columns) - 1:
                end = "\n"
            else:
                end = ", "
            print(column["name"], end=end)

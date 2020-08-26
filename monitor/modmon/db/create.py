"""
Functions for creating and deleting the ModMon database.
"""
import argparse
import sys

from sqlalchemy import create_engine
from sqlalchemy.exc import ProgrammingError

from .schema import Base
from .connect import get_database_config, DATABASE_NAME, ENGINE
from ..config import config
from ..utils.utils import ask_for_confirmation

ADMIN_CONNECTION_STRING, _ = get_database_config(config["database-admin"])


def create_database(db_name=DATABASE_NAME, force=False):
    """Create the ModMon database.

    Parameters
    ----------
    db_name : str, optional
        Name of the database to create, by default modmon.db.connect.DB
    force : bool, optional
        If True delete any pre-existing database and create a new one, by default False
    """

    engine = create_engine(ADMIN_CONNECTION_STRING)
    conn = engine.connect()
    conn.execute("commit")
    try:
        conn.execute(f'CREATE DATABASE "{db_name}"')
    except ProgrammingError as e:
        if f'database "{db_name}" already exists' in str(e):
            if force:
                print("Deleting pre-existing database.")
                delete_database(db_name=db_name, force=force)
                print("Creating new database.")
                create_database(db_name=db_name, force=force)
            else:
                print(f'Database "{db_name}" already exists.')
        else:
            raise


def delete_database(db_name=DATABASE_NAME, force=False):
    """Delete the ModMon database.

    Parameters
    ----------
    db_name : str, optional
        Name of the database to delete, by default modmon.db.connect.DB
    force : bool, optional
        Unless True ask the user for confirmation before deleting, by default False
    """
    if not force:
        confirmed = ask_for_confirmation(
            "WARNING: This will delete all data currently in the database."
        )
        if not confirmed:
            print("Aborting create.")
            return

    engine = create_engine(ADMIN_CONNECTION_STRING)
    conn = engine.connect()
    conn.execute("commit")
    try:
        conn.execute(f'DROP DATABASE "{db_name}"')
    except ProgrammingError as e:
        if f'database "{db_name}" does not exist' in str(e):
            print(f'There is no database called "{db_name}".')
        else:
            raise


def create_schema(force=False, checkfirst=True):
    """Create the tables and schema on the ModMon database.

    Parameters
    ----------
    force : bool, optional
        Unless True ask for confirmation before taking potentially destructive action if
        checkfirst is False, by default False
    checkfirst : bool, optional
        If True don't recreate tables already present in the database, by default True
    """
    if not checkfirst and not force:
        confirmed = ask_for_confirmation(
            "WARNING: This will delete all data currently in the database."
        )
        if not confirmed:
            print("Aborting create.")
            return

    Base.metadata.create_all(ENGINE, checkfirst=checkfirst)


def delete_schema(force=False, checkfirst=True):
    """Delete all tables and data stored in the ModMon database.

    Parameters
    ----------
    force : bool, optional
        Unless True ask the user for confirmation before proceeding, by default False
    checkfirst : bool, optional
        If True only issue DROPs for tables confirmed to be present, by default True
    """
    if not force:
        confirmed = ask_for_confirmation(
            "WARNING: This will delete ALL tables and data in the database."
        )
        if not confirmed:
            print("Aborting delete.")
            return

    Base.metadata.drop_all(ENGINE, checkfirst=checkfirst)


def main():
    """Delete and re-create the model monitoring database.
    
    To be used from command-line as modmon_db_create
    """
    parser = argparse.ArgumentParser(
        description="Create the model monitoring database (ModMon)."
    )
    parser.add_argument(
        "--force",
        help="Delete and recreate the database without asking for confirmation if set",
        action="store_true",
    )
    args = parser.parse_args()

    if not args.force:
        confirmed = ask_for_confirmation(
            "WARNING: This will delete all data in any pre-existing ModMon database."
        )
        if not confirmed:
            print("Aborting create.")
            sys.exit(0)

    create_database(force=True)
    create_schema(force=True, checkfirst=False)

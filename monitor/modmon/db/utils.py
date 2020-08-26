"""
General utility functions for querying the ModMon database.
"""
from sqlalchemy import func


def get_unique_id(session, column):
    """Get value one higher than the highest value in an ID column.

    Parameters
    ----------
    session : sqlalchemy.orm.session.Session
        Database session
    column : sqlalchemy.orm.attributes.InstrumentedAttribute
        Column to query for maximum value. Should be the attribute of a class in the
        defined schema in the SQLAlchemy ORM, e.g. Dataset.datasetid

    Returns
    -------
    int
        max_value + 1, where max_value is the current maximum value in column
    """
    max_id = session.query(func.max(column)).scalar()
    if max_id:
        return max_id + 1
    return 1

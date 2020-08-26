import pyodbc
import pandas as pd
import json


def get_data(database):
    with open("db_config.json", "r") as f:
        config = json.load(f)

    cnxn = pyodbc.connect(
        "Driver={" + config["driver"] + "};"
        f"Server={config['server']},{config['port']};"
        f"Database={database};"
        f"UID={config['user']};"
        f"PWD={config['password']}"
    )

    df = pd.read_sql(
        "SELECT con.concept_name AS condition, gen.concept_name AS gender "
        "FROM condition_occurrence occ "
        "LEFT JOIN WEEK_00.dbo.concept con ON occ.condition_concept_id=con.concept_id "
        "LEFT JOIN person per ON occ.person_id=per.person_id "
        "LEFT JOIN WEEK_00.dbo.concept gen ON per.gender_concept_id=gen.concept_id;",
        cnxn,
    )

    return df

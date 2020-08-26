"""
Functions to run models in the ModMon database.
"""
import subprocess
import os
from datetime import datetime
import argparse
import warnings

import pandas as pd
import dateparser
from sqlalchemy import func

from ..report.report import generate_report
from ..db.connect import get_session
from ..db.utils import get_unique_id
from ..db.schema import Modelversion, Dataset, Result
from ..envs.utils import create_env


def build_run_cmd(raw_cmd, start_date=None, end_date=None, database=None):
    """Replace placeholder inputs in the model command with given values.

    Parameters
    ----------
    raw_cmd : str
        Raw command as found in Modelversion.command (or the original metadata file).
        Should contain placeholders <start_date>, <end_date> and <database>.
    start_date : str or datetime.datetimie , optional
        Dataset start date to pass to command (metrics script should use this to modify
        database queries to return data restricted to the given date range), by default
        None
    end_date : str or datetime.datetime , optional
        Dataset end date to pass to command (metrics script should use this to modify
        database queries to return data restricted to the given date range), by default
        None
    database : str, optional
        Name of the database to pass to command (metrics script should use this to
        modify the database it connects to), by default None

    Returns
    -------
    str
        Command to run with at least one of the <start_date>, <end_date> and <database>
        placeholders, to be replaced by the input values.

    Raises
    ------
    ValueError
        If raw_cmd does not contain at least one of the <start_date>, <end_date> and
        <database> placeholders.
    """
    placeholders = {
        "<start_date>": start_date,
        "<end_date>": end_date,
        "<database>": database,
    }

    no_placeholders_found = True
    for key, value in placeholders.items():
        if key in raw_cmd and value is None:
            raise ValueError(f"No value given for {key}")
        else:
            no_placeholders_found = False
            raw_cmd = raw_cmd.replace(key, str(value))

    if no_placeholders_found:
        raise ValueError(
            "Command doesn't include any of the possible placeholders: "
            f"{list(placeholders.keys())}"
        )

    return raw_cmd


def get_model_versions(session, get_inactive=False):
    """Get a list of all active model versions from the database.

    Parameters
    ----------
    session : sqlalchemy.orm.session.Session
        ModMon database session
    get_inactive : bool , optional
        If True also return inactive model versions, by default False

    Returns
    -------
    list
        List of Modelversion objects including all active model versions.
    """
    query = session.query(Modelversion)
    if not get_inactive:
        query = query.filter_by(active=True)

    return query.all()


def get_iso_time():
    """Get the current time in ISO format

    Returns
    -------
    str
        Current time in ISO format (yyyy-mm-ddThh:mm:ss)
    """
    return datetime.now().replace(microsecond=0).isoformat()


def create_dataset(session, start_date=None, end_date=None, database=None):
    """Create a new Dataset in the database. If a dataset already exists for the
    specified start_date, end_date and database, return the ID of that dataset instead.

    Parameters
    ----------
    session : sqlalchemy.orm.session.Session
        ModMon database session
    start_date : str or datetime.datetime , optional
        Dataset start date, by default None
    end_date : str or datetime.datetime , optional
        Dateaset end date, by default None
    database : str , optional
        Dataset database name, by default None

    Returns
    -------
    int
        ID of the created dataset (or the pre-existing dataset if a dataset matching
        the inputs already exists)
         
    Raises
    ------
    ValueError
        If none of the start_date, end_date and database are defined
    """
    if start_date is None and end_date is None and database is None:
        raise ValueError(
            "At least one of start_date, end_date and database " "must be defined"
        )

    # query database for a dataset that matches the given inputs
    # TODO currently only checks by date, not times
    query = session.query(Dataset)
    if start_date is not None:
        query = query.filter(func.date(Dataset.start_date) == start_date)
    if end_date is not None:
        query = query.filter(func.date(Dataset.end_date) == end_date)
    if database is not None:
        query = query.filter_by(databasename=database)

    dataset = query.first()

    # if matching dataset exists return its id
    if dataset:
        return dataset.datasetid

    else:
        # create id for dataset
        dataset_id = get_unique_id(session, Dataset.datasetid)

        # current date and time in iso format
        description = f"Automatically created by ModMon {get_iso_time()}"

        dataset = Dataset(
            datasetid=dataset_id,
            databasename=database,
            description=description,
            start_date=start_date,
            end_date=end_date,
        )
        session.add(dataset)

        return dataset_id


def result_exists(session, model_id, model_version, dataset_id):
    """Check whether the database already contains results for a model version on a
    given dataset.

    Parameters
    ----------
    session : sqlalchemy.orm.session.Session
        ModMon database session
    model_id : int
        ID of the model to check
    model_version : str
        Version of the model to check
    dataset_id : int
        ID of the dataset to check

    Returns
    -------
    bool
        True if the database contains a result for the specifed model version and
        dataset.
    """
    result = (
        session.query(Result)
        .filter_by(modelid=model_id)
        .filter_by(modelversion=model_version)
        .filter_by(testdatasetid=dataset_id)
        .first()
    )

    if result:
        return True
    else:
        return False


def get_metrics_path(model_version):
    """Build the path to the expected location of the metrics file.

    Parameters
    ----------
    model_version : modmon.schema.db.Modelversion
        Model version object


    Returns
    -------
    str
        Expected path to metrics file
    """
    return f"{model_version.location}/metrics.csv"


def add_results_from_file(session, model_version, dataset_id, run_time):
    """Add the values from a model version's metrics file to the database after a new
    run.

    Parameters
    ----------
    session : sqlalchemy.orm.session.Session
        ModMon database session
    model_version : modmon.schema.db.Modelversion
        Model version object
    dataset_id : int
        ID of the dataset the metrics were calculated for
    run_time : str or datetime.datetime
        Time the model version was run to generate the metrics

    Raises
    ------
    FileNotFoundError
        If the file model_version.location/metrics.csv does not exist
    """
    metrics_path = get_metrics_path(model_version)

    if not os.path.exists(metrics_path):
        raise FileNotFoundError(
            f"{metrics_path} not found. This should be created by running {model_version.command}."
        )

    run_id = get_unique_id(session, Result.runid)

    metrics = pd.read_csv(metrics_path)

    for _, row in metrics.iterrows():
        metric_name, metric_value = row

        dataset = Result(
            modelid=model_version.modelid,
            modelversion=model_version.modelversion,
            testdatasetid=dataset_id,
            isreferenceresult=False,
            runtime=run_time,
            runid=run_id,
            metric=metric_name,
            value=metric_value,
        )
        session.add(dataset)


def run_model(
    model_version,
    start_date=None,
    end_date=None,
    database=None,
    force=False,
    session=None,
    reference=False,
    verbose=True,
    capture_output=False,
):
    """Run a model version's command to generate new metrics values with the specified
    dataset inputs.

    Parameters
    ----------
    model_version : modmon.schema.db.Modelversion
        Model version object
    start_date : str or datetime.datetime , optional
        Dataset start date, by default None
    end_date : str or datetime.datetime , optional
        Dataset end date, by default None
    database : str , optional
        Dataset database name, by default None
    force : bool, optional
        If True regenerate results for a model version even if they already exist in the
        database for the same dataset, by default False
    session : sqlalchemy.orm.session.Session, optional
        ModMon database session or None in which case one will be created, by default
        None
    reference : bool, optional
        If True, do not add anything to the database, only setup env and run model, by
        default False
    verbose: bool, optional
        If True print additional progress messages, by default True
    capture_output: bool, optional
        If True capture stdout and stderr of subprocess calls rather than printing to
        console, by default False

    Raises
    ------
    FileNotFoundError
        If the metrics file is not successfully created at
        model_version.location/metrics.csv after the model run.
    """
    if not session:
        session = get_session()
        close_session = True  # if session is created in function, close it in function
    else:
        close_session = False  # if session given, leave it open

    if not reference:
        if verbose:
            print("Creating dataset...")
        dataset_id = create_dataset(session, start_date, end_date, database)

        # Check whether result already exists for this model version and dataset
        if not force and result_exists(
            session, model_version.modelid, model_version.modelversion, dataset_id
        ):
            if verbose:
                print(
                    f"DB already contains result for model {model_version.modelid}, "
                    f"version {model_version.modelversion} on dataset {dataset_id}. "
                    "Skipping."
                )
            return

    if verbose:
        print("Creating environment...")
    env_cmd = create_env(
        model_version.location,
        model_version.modelid,
        model_version.modelversion,
        capture_output=capture_output,
    )

    if verbose:
        print("Running metrics script...")
    # delete any pre-existing metrics file
    metrics_path = get_metrics_path(model_version)
    try:
        os.remove(metrics_path)
    except FileNotFoundError:
        pass

    run_cmd = build_run_cmd(model_version.command, start_date, end_date, database)
    if env_cmd is not None:
        run_cmd = f"{env_cmd} && {run_cmd}"

    # run metrics script
    run_time = get_iso_time()
    if verbose:
        print("RUN_CMD", run_cmd)
    subprocess.run(
        run_cmd,
        cwd=model_version.location,
        shell=True,
        check=True,
        capture_output=capture_output,
    )

    if not reference:
        if verbose:
            print("Adding results to database...")
        if not os.path.exists(metrics_path):
            raise FileNotFoundError(
                f"{metrics_path} not found. This should be created by running {run_cmd}."
            )

        add_results_from_file(session, model_version, dataset_id, run_time)
    session.commit()

    if close_session:
        session.close()


def run_all_models(
    start_date=None, end_date=None, database=None, force=False, run_inactive=False
):
    """Run all active model versions in the database to generate metrics values for a
    new dataset.

    Parameters
    ----------
    start_date : str or datetime.datetime , optional
        Dataset start date, by default None
    end_date : str or datetime.datetime , optional
        Dataset end date, by default None
    database : str, optional
        Dataset database name, by default None
    force : bool, optional
        If True regenerate results for a model version even if they already exist in the
        database for the same dataset, by default False
    """
    # Set up db connection
    print("Connecting to monitoring database...")
    session = get_session()

    # get active model versions from db
    print("Getting active model versions...", end=" ")
    model_versions = get_model_versions(session, get_inactive=run_inactive)
    print(f"found {len(model_versions)} model versions.")

    if len(model_versions) == 0:
        print("No active model versions found. Returning.")
        return

    # run metrics script for all model versions
    for i, mv in enumerate(model_versions):
        print("=" * 30)
        print(
            f"MODEL {i + 1} OUT OF {len(model_versions)}: ID {mv.modelid} VERSION {mv.modelversion}"
        )
        print("=" * 30)

        try:
            run_model(mv, start_date, end_date, database, force=force, session=session)
        except subprocess.CalledProcessError as e:
            print(f"FAILED: subprocess error: {e}")
        except FileNotFoundError as e:
            print(f"FAILED: File not found: {e}")
        except ValueError as e:
            print(f"FAILED: ValueError: {e}")

    session.close()


def main():
    """Run all active model versions in the datbase on a new model version.

    Available from the command-line as modmon_run
    """
    parser = argparse.ArgumentParser(
        description="Automatically run all active model versions in the monitoring database"
    )
    parser.add_argument("--start_date", help="Start date of dataset")
    parser.add_argument("--end_date", help="End date of dataset")
    parser.add_argument("--database", help="Name of the database to connect to")
    parser.add_argument(
        "--force",
        help="If set, run models even if results already exist in the database",
        action="store_true",
    )
    parser.add_argument(
        "--run_inactive",
        help="If set, also run models marked as inactive",
        action="store_true",
    )

    args = parser.parse_args()
    # TODO currently only deal with dates, not times
    if args.start_date is not None:
        start_date = dateparser.parse(args.start_date).date()
    else:
        start_date = None
    if args.end_date is not None:
        end_date = dateparser.parse(args.end_date).date()
    else:
        end_date = None

    run_all_models(
        start_date,
        end_date,
        args.database,
        force=args.force,
        run_inactive=args.run_inactive,
    )
    generate_report()

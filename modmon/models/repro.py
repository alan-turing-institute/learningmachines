import argparse
import json
from os import listdir, devnull, mkdir
import shutil
import subprocess
import tempfile

import pandas as pd

from ..db.connect import get_session
from ..db.schema import Modelversion, Model
from .run import run_model


class DummyModelversion:
    """
    Dummy Modelversion class to use to pass a model to run functions without needing a
    database entry.
    """

    modelid = "TMP"
    modelversion = "TMP"

    def __init__(self, location, command):
        """Initialise an instance of DummyModelversion

        Parameters
        ----------
        location : str
            Path to model directory
        command : str
            Command to run model, including <start_date>, <end_date> and <database>
            placeholders.
        """
        self.location = location
        self.command = command


def catalogue_metrics(path, tmpdirname, dev_null):
    """Use the repro-catalogue package to create a directory called catalogue_results
    inside tmpdirname containing hashed versions of the data, code and results dirs,
    which in this case are empty except for metrics.csv in results

    Parameters
    ----------
    path : str
        Path to model directory
    tmpdirname : str
        Path to temporary directory to store repro-catalogue results
    dev_null : _io.TextIOWrapper
        Opened reference to /dev/null for stdout and stderr
    """
    shutil.copyfile(path + "/metrics.csv", tmpdirname + "/results/metrics.csv")

    subprocess.run(
        ["git", "add", "metrics.csv"],
        check=True,
        cwd=tmpdirname + "/results",
        stdout=dev_null,
        stderr=dev_null,
    )
    try:
        subprocess.run(
            ["git", "commit", "-m", "'add reference result'"],
            check=True,
            cwd=tmpdirname,
            stdout=dev_null,
            stderr=dev_null,
        )
    except subprocess.CalledProcessError:  # Commit will fail when metrics.csv is added unchanged
        pass

    subprocess.run(
        ["catalogue", "engage", "--input_data", "data", "--code", "code"],
        check=True,
        cwd=tmpdirname,
        stdout=dev_null,
        stderr=dev_null,
    )
    subprocess.run(
        [
            "catalogue",
            "disengage",
            "--input_data",
            "data",
            "--code",
            "code",
            "--output_data",
            "results",
        ],
        check=True,
        cwd=tmpdirname,
        stdout=dev_null,
        stderr=dev_null,
    )


def results_match(tmpdirname):
    """Check whether the hashes of metrics.csv generated by repro-catalogue match between
    two folders in tmpdirname/catalogue_results, which we assume are the reference
    and generated results ordered by date

    Parameters
    ----------
    tmpdirname : str
        Path to temporary directory where repro-catalogue results are stored.

    Returns
    -------
    bool
        True if the hashes of the original and generated metrics.csv files match.
    """

    # Get the location of JSON files generated by repro-catalogue
    reference_metrics_file, generated_metrics_file = sorted(
        listdir(tmpdirname + "/catalogue_results")
    )

    # Compare the hashes for the metrics csv
    with open(tmpdirname + "/catalogue_results/" + reference_metrics_file, "r") as f:
        reference_metrics = json.load(f)
    with open(tmpdirname + "/catalogue_results/" + generated_metrics_file, "r") as f:
        generated_metrics = json.load(f)
    if (
        reference_metrics["output_data"]["results"]["results/metrics.csv"]
        == generated_metrics["output_data"]["results"]["results/metrics.csv"]
    ):
        return True
    return False


def reference_result_is_reproducible(path, metadata):
    """Use repro-catalogue to determine whether the model appraisal system generated
    matching metrics for the model to those supplied as reference metrics by the analyst

    Parameters
    ----------
    path : str
        Path to model directory
    metadata : dict
        Contents of metadata JSON file

    Returns
    -------
    bool
        True if the hashes of the original and generated metrics.csv files match.
    """
    session = get_session()
    dev_null = open(devnull, "w")

    with tempfile.TemporaryDirectory() as tmpdirname:
        subprocess.run(
            ["git", "init"],
            check=True,
            cwd=tmpdirname,
            stdout=dev_null,
            stderr=dev_null,
        )

        mkdir(tmpdirname + "/data")
        mkdir(tmpdirname + "/code")
        mkdir(tmpdirname + "/results")

        # Use repro-catalogue with reference metrics supplied by analyst
        catalogue_metrics(path, tmpdirname, dev_null)

        # Create a dummy model version to mimic one from the database
        model_version = DummyModelversion(path, metadata["command"])

        # Run the model in reference mode (do not add results to db)
        # This overwrites metrics.csv within the dir supplied to modmon_model_check
        run_model(
            model_version,
            metadata["data_window_start"],
            metadata["data_window_end"],
            metadata["db_name"],
            reference=True,
            session=session,
            verbose=False,
            capture_output=True,
        )

        # Use repro-catalogue with new metrics just generated
        catalogue_metrics(path, tmpdirname, dev_null)

        match_bool = results_match(tmpdirname)
    return match_bool

"""
Functions to add a model version to the ModMon database.

Run this script once, the first time an analyst submits a model file (including for a
new version of a model)
"""
import argparse
import json

import pandas as pd

from ..db.connect import get_session
from ..db.utils import get_unique_id
from ..db.schema import (
    Team,
    Dataset,
    Metric,
    Researchquestion,
    Model,
    Modelversion,
    Result,
)
from .store import copy_model_to_storage
from .check import check_submission
from ..utils.utils import ask_for_confirmation


def setup_model(
    model_path,
    check_first=True,
    confirm=True,
    force=False,
    warnings_ok=True,
    create_envs=True,
    repro_check=True,
    set_old_inactive=True,
):
    """Add a model version to the ModMon monitoring system. Includes copying the
    directory model_path to the ModMon storage area and creating database entries.

    Parameters
    ----------
    model_path : str
        Path to model version directory
    check_first : bool, optional
        Run model checks before attempting model version setup, by default True
    confirm : bool, optional
        Ask for user whether its ok to contitnue after performing model checks, by
        default True
    force : bool, optional
        Continue with model setup even if checks fail. Only applies if confirm is False.
        By default False
    warnings_ok : bool, optional
        Continue with model setup if warnings encountered during checks. Only applies
        if confirm is False. By default True
    create_envs : bool, optional
        Check environment creation if performing model checks, by default True
    repro_check : bool, optional
        Check running the model and reproducing its results if performing model checks,
        by default True
    set_old_inactive : bool , optional
        If True, set all previous versions of this model to be inactive, by default True
    """
    if check_first:
        check_result = check_submission(
            model_path, create_envs=create_envs, repro_check=repro_check
        )
        if confirm:
            message = "Add this model to the database?"
            if check_result["error"] > 0:
                message += " NOT RECOMMENDED WITH ERRORS ABOVE!"

            confirmed = ask_for_confirmation(message)
            if not confirmed:
                print("Aborting model setup.")
                return

        elif not force:
            if check_result["error"] > 0:
                print("Model checks failed. Aborting model setup.")
                return
            elif check_result["warning"] > 0 and not warnings_ok:
                print("Warnings during model checks. Aborting model setup.")
                return

    print("-" * 30)
    print(f"Adding model {model_path}...")

    # Set up SQLAlchemy session
    session = get_session()

    #############
    # Files ###
    #############
    metadata_json = model_path + "/metadata.json"
    training_metrics_csv = model_path + "/training_metrics.csv"
    prediction_metrics_csv = model_path + "/metrics.csv"

    #####################
    # Load metadata ###
    #####################

    with open(metadata_json, "r") as f:
        metadata = json.load(f)

    #################
    # Load data ###
    #################

    # Load model run reference metrics
    metrics = pd.read_csv(prediction_metrics_csv)

    # Load model train metrics, if included
    try:
        training_metrics = pd.read_csv(training_metrics_csv)
        metrics = pd.concat(
            [training_metrics, metrics]
        )  # Create a single metrics dictionary
    except FileNotFoundError:
        pass

    #######################
    # Save data to db
    #######################

    # Team:
    teams = [team.teamname for team in session.query(Team).all()]
    if metadata["team"] not in teams:
        newteam = Team(
            teamname=metadata["team"],
            contactname=metadata["contact"],
            contactemail=metadata["contact_email"],
            description=metadata["team_description"],
        )
        session.add(newteam)
        session.commit()
        print(f"Team: Created: \"{metadata['team']}\"")
    else:
        print(f"Team: Already exists: \"{metadata['team']}\"")

    # Research Questions:
    research_questions = [q.description for q in session.query(Researchquestion).all()]
    if metadata["research_question"] not in research_questions:
        question_id = get_unique_id(session, Researchquestion.questionid)
        newquestion = Researchquestion(
            questionid=question_id, description=metadata["research_question"]
        )
        session.add(newquestion)
        session.commit()
        print(
            f"Research Question: Created with ID {question_id}: "
            f"\"{metadata['research_question']}\""
        )
    else:
        question = (
            session.query(Researchquestion)
            .filter_by(description=metadata["research_question"])
            .first()
        )
        question_id = question.questionid
        print(
            f"Research Question: Already exists with ID {question_id}: "
            f"\"{metadata['research_question']}\""
        )

    # Metrics:
    metrics_in_db = [metric.metric for metric in session.query(Metric).all()]
    for index, row in metrics.iterrows():
        metric, value = row
        if metric not in metrics_in_db:
            newmetric = Metric(metric=metric)
            session.add(newmetric)
            session.commit()

    # Models:
    models = [model.name for model in session.query(Model).all()]
    if metadata["model_name"] not in models:
        model_id = get_unique_id(session, Model.modelid)
        newmodel = Model(
            modelid=model_id,
            teamname=metadata["team"],
            questionid=question_id,
            name=metadata["model_name"],
            description=metadata["model_description"],
        )
        session.add(newmodel)
        session.commit()
        print(f"Model: Created with ID {model_id}: \"{metadata['model_name']}\"")
    else:
        model = session.query(Model).filter_by(name=metadata["model_name"]).first()
        model_id = model.modelid
        print(f"Model: Already exists with ID {model_id}: \"{metadata['model_name']}\"")

    # Model version, training and testing datasets
    model_versions = [
        model.modelversion
        for model in session.query(Modelversion).filter_by(modelid=model_id).all()
    ]
    if metadata["model_version"] not in model_versions:
        # Copy model files to storage
        modmon_model_path = copy_model_to_storage(
            model_path, model_id, metadata["model_version"]
        )
        print(f'Model Version: Copied to storage: "{modmon_model_path}"')

        # Training Dataset:
        training_dataset_id = get_unique_id(session, Dataset.datasetid)
        training_dataset = Dataset(
            datasetid=training_dataset_id,
            databasename=metadata["db_name"],
            description=metadata["training_data_description"],
            start_date=metadata["data_window_start"],
            end_date=metadata["data_window_end"],
        )
        session.add(training_dataset)
        session.commit()

        # Test Dataset:
        test_dataset_id = get_unique_id(session, Dataset.datasetid)
        test_dataset = Dataset(
            datasetid=test_dataset_id,
            databasename=metadata["db_name"],
            description=metadata["test_data_description"],
            start_date=metadata["data_window_start"],
            end_date=metadata["data_window_end"],
        )
        session.add(test_dataset)
        session.commit()

        # Model Version
        model_version = Modelversion(
            modelid=model_id,
            modelversion=metadata["model_version"],
            trainingdatasetid=training_dataset_id,
            referencetestdatasetid=test_dataset_id,
            location=str(modmon_model_path),
            command=metadata["command"],
            modeltraintime=metadata["model_train_datetime"],
            active=True,
        )
        session.add(model_version)
        session.commit()
        print(f"Model Version: Created: \"{metadata['model_version']}\"")

        if set_old_inactive:
            # Set any older versions of the same model as inactive
            old_versions_this_model = (
                session.query(Modelversion)
                .filter_by(modelid=model_id)
                .filter(Modelversion.modelversion != metadata["model_version"])
                .all()
            )
            for old_model_version in old_versions_this_model:
                old_model_version.active = False
                session.commit()

        # Save analyst reference result for this model version
        run_id = get_unique_id(session, Result.runid)
        for index, row in metrics.iterrows():
            metric, value = row
            reference_result = Result(
                modelid=model_id,
                modelversion=metadata["model_version"],
                testdatasetid=test_dataset_id,
                isreferenceresult=True,
                runtime=metadata["model_run_datetime"],
                runid=run_id,
                metric=metric,
                value=value,
            )
            session.add(reference_result)
            session.commit()

    else:
        print(f"Model Version: Already exists: \"{metadata['model_version']}\"")


def main():
    """Add a model version to the monitoring database.
    
    Available from the command-line as modmon_model_setup
    """
    parser = argparse.ArgumentParser(
        description="Add a model version to the ModMon monitoring system."
    )
    parser.add_argument("model", help="Path to model directory to add")
    parser.add_argument(
        "--nocheck",
        help="If set, setup model without performing pre-submission checks",
        action="store_true",
    )
    parser.add_argument(
        "--quickcheck",
        help="If set, don't perform environment or reproducibility checks",
        action="store_true",
    )
    parser.add_argument(
        "--noconfirm",
        help="If set, don't ask for user confirmation after checks",
        action="store_true",
    )
    parser.add_argument(
        "--force", help="If set, setup model even if checks fail", action="store_true",
    )
    parser.add_argument(
        "--keepold",
        help="If set, don't set previous versions of this model to be inactive",
        action="store_true",
    )

    args = parser.parse_args()
    model_path = args.model

    if args.nocheck:
        setup_model(model_path, check_first=False, set_old_inactive=not args.keepold)
    else:
        if args.quickcheck:
            create_envs = False
            repro_check = False
        else:
            create_envs = True
            repro_check = True

        setup_model(
            model_path,
            check_first=True,
            create_envs=create_envs,
            repro_check=repro_check,
            force=args.force,
            confirm=not args.noconfirm,
            set_old_inactive=not args.keepold,
        )

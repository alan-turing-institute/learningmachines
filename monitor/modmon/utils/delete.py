"""
Functions to delete all ModMon artefacts
"""
import argparse

from .utils import ask_for_confirmation
from ..db.create import delete_database
from ..envs.conda import remove_modmon_envs
from ..models.store import delete_all_models_from_storage
from ..report.report import delete_all_reports_from_storage


def delete_all_artefacts(
    db=False, envs=False, models=False, reports=False, all=False, force=False
):
    """Delete ModMon artefacts: database, environments, models and reports.

    Parameters
    ----------
    db : bool, optional
        If True delete the database, by default False
    envs : bool, optional
        If True delete all ModMon conda environments, by default False
    models : bool, optional
        If True delete all models in storage, by default False
    reports : bool, optional
        If True delete all reports in storage, by default False
    all : bool, optional
        If True equivalent to setting db, envs, models and reports to True,
        by default False
    force : bool, optional
        If True delete without asking for confirmation, by default False
    """
    if all:
        db = True
        envs = True
        models = True
        reports = True
  
    if not (db or envs or models or reports):
        print("Nothing set to delete")
        return

    if not force:
        message = "Delete ModMon "
        if db:
            message += "database, "
        if models:
            message += "models, "
        if envs:
            message += "environments, "
        if reports:
            message += "reports, "
        message = message[:-2] + "? This can't be undone!"
        
        confirmed = ask_for_confirmation(message)
        if not confirmed:
            print("Not confirmed. Aborting.")
            return
        else:
            confirmed = ask_for_confirmation("Are you sure?")
            if not confirmed:
                print("Not confirmed. Aborting.")
                return

    if db:
        print("Deleting database...")
        delete_database(force=True)
    if envs:
        print("Deleting environments...")
        remove_modmon_envs(models=True, r_versions=True, tmp=True)
    if models:
        print("Deleting models in storage...")
        delete_all_models_from_storage(force=True)
    if reports:
        print("Deleting reports in storage...")
        delete_all_reports_from_storage(force=True)

    print("DONE")


def main():
    """Entry-point for delete_all_artefacts available from the command-line as
    modmon_delete.
    """
    parser = argparse.ArgumentParser(
        description="Delete all ModMon artefacts (database, model storage and environments)"
    )
    parser.add_argument(
        "--db", help="Delete the ModMon database", action="store_true",
    )
    parser.add_argument(
        "--envs",
        help="Delete conda environments created by ModMon",
        action="store_true",
    )
    parser.add_argument(
        "--models",
        help="Delete all models in the ModMon storage area",
        action="store_true",
    )
    parser.add_argument(
        "--reports",
        help="Delete all reports in the ModMon storage area",
        action="store_true",
    )
    parser.add_argument(
        "--all", help="Delete everything", action="store_true",
    )
    parser.add_argument(
        "--force",
        help="Delete without asking for confirmation if set",
        action="store_true",
    )
    args = parser.parse_args()

    if not args.all and not (args.db or args.envs or args.models or args.reports):
        print("Nothing set to delete, try 'modmon_delete --help' for options.")
        return

    delete_all_artefacts(
        db=args.db,
        envs=args.envs,
        models=args.models,
        reports=args.reports,
        all=args.all,
        force=args.force,
    )

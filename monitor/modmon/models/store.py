import os
from pathlib import Path
import shutil

from ..config import config
from ..utils.utils import build_model_identifier, ask_for_confirmation


def get_storage_dir(storage_config=config["models"], create=True, exist_ok=True):
    """Get the path to the ModMon model storage directory as defined in the config file.

    Parameters
    ----------
    storage_config : configparser.SectionProxy, optional
        configparser section containing the key 'modeldir',
        by default modmon.config.config["storage"]
    create : bool, optional
        Whether to create the models storage directory, by default True
    exist_ok : bool, optional
        If False raise an error if trying to create the directory but it already
        exists, by default True

    Returns
    -------
    str
        Path to ModMon model storage directory.

    Raises
    ------
    KeyError
        If storage_config does not contain the key 'modeldir'
    """
    if "modeldir" not in storage_config:
        raise KeyError(
            "storage_config must contain the key 'modeldir', containing "
            "the path where all ModMon models will be stored."
        )

    model_dir = storage_config["modeldir"]

    if create:
        os.makedirs(model_dir, exist_ok=True)

    return model_dir


STORAGE_DIR = get_storage_dir()


def get_report_dir(storage_config=config["reports"], create=True, exist_ok=True):
    """Get the path to the ModMon reports directory as defined in the config file.

    Parameters
    ----------
    storage_config : configparser.SectionProxy, optional
        configparser section containing the key 'modeldir',
        by default modmon.config.config["storage"]
    create : bool, optional
        Whether to create the reports storage directory, by default True
    exist_ok : bool, optional
        If False raise an error if trying to create the directory but it already
        exists, by default True

    Returns
    -------
    str
        Path to ModMon reports storage directory.

    Raises
    ------
    KeyError
        If storage_config does not contain the key 'reportdir'
    """
    if "reportdir" not in storage_config:
        raise KeyError(
            "storage_config must contain the key 'reportdir', containing "
            "the path where all ModMon reports will be stored."
        )

    report_dir = storage_config["reportdir"]

    if create:
        os.makedirs(report_dir, exist_ok=True)

    return report_dir


REPORT_DIR = get_report_dir()


def copy_model_to_storage(
    model_source_dir, model_id, model_version, storage_dir=STORAGE_DIR
):
    """Copy a model directory to the ModMon storage area.

    Parameters
    ----------
    model_source_dir : str or Path
        Path to current model directory on the local system
    model_id : int
        ID for this model from the database
    model_version : str
        Version string for this model (from the database or metadata file)
    storage_dir : str or Path, optional
        Directory to copy the model to, by default STORAGE_DIR - the directory defined
        by storage.modeldir in the ModMon configuration file.

    Returns
    -------
    pathlib.Path
        Path to where the model has been copied in the ModMon storage area.
    """
    model_identifier = build_model_identifier(model_id, model_version)
    model_target_dir = Path(storage_dir, model_identifier)

    if os.path.exists(model_target_dir):
        overwrite = ask_for_confirmation(
            "A model already exists in storage with "
            f"id {model_id} and "
            f"version {model_version}, "
            f"at path {model_target_dir}. This is likely to be "
            "something that has been deleted from the database.\n"
            "Would you like to delete and overwrite the "
            "existing directory?"
        )
        if overwrite:
            shutil.rmtree(model_target_dir)
        else:
            raise FileExistsError(
                "Aborting model setup. A model already exists in "
                f"storage with id {model_id} and "
                f"version {model_version}. "
                f"{model_target_dir}"
            )

    shutil.copytree(model_source_dir, model_target_dir)

    return model_target_dir


def delete_model_from_storage(
    model_id, model_version, storage_dir=STORAGE_DIR, force=False
):
    """Delete a model directory from the ModMon storage area.

    Parameters
    ----------
    model_id : int
        ID for the model to delete (from the database)
    model_version : str
        Model version string for the model version to delete (from the database)
    storage_dir : str or Path, optional
        Path to the ModMon storage area, by default STORAGE_DIR
    force : bool, optional
        If True delete the directory without askinig for confirmation, by default False
    """
    if not force:
        confirmed = ask_for_confirmation(
            f"Delete model id {model_id} version "
            f"{model_version} from ModMon storage?"
        )
        if not confirmed:
            print("Not confirmed. Aborting.")
            return

    model_identifier = build_model_identifier(model_id, model_version)
    model_dir = Path(storage_dir, model_identifier)

    shutil.rmtree(model_dir)
    print(f"Deleted {model_dir}")


def delete_all_models_from_storage(storage_dir=STORAGE_DIR, force=False):
    """Delete the ModMon storage directory.

    Parameters
    ----------
    storage_dir : str or Path, optional
        Path to the ModMon storage area, by default STORAGE_DIR
    force : bool, optional
        CAREFUL! If True delete everything without askinig for confirmation, by default
        False
    """
    if not force:
        confirmed = ask_for_confirmation(
            f"Delete all models in storage? This can't be undone!"
        )
        if not confirmed:
            print("Not confirmed. Aborting.")
            return

    shutil.rmtree(storage_dir)

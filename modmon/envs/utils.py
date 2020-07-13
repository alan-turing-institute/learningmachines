"""
General functions for managing and creating virtual environments.
"""
import os
import warnings

from .renv import create_renv_env
from .conda import get_conda_activate_command, create_conda_env


def get_model_env_types(path):
    """Determine whether a model specifies a conda or renv environment. The presence of
    a conda environment is defined by the existence of the file path/environment.yml,
    or the file path/renv.lock for a renv environment.

    Parameters
    ----------
    path : str
        Path to model directory

    Returns
    -------
    dict
        {env_type: env_found} dictionary, where env_type is the type of environment and
        env_found is True if an environment of that type was discovered and False
        otherwise.
    """
    if os.path.exists(f"{path}/environment.yml"):
        conda = True
    else:
        conda = False

    if os.path.exists(f"{path}/renv.lock"):
        renv = True
    else:
        renv = False

    return {"conda": conda, "renv": renv}


def build_env_name(model_id, model_version):
    """Generate the name of the conda environment to use for a given model ID and
    version.

    Parameters
    ----------
    model_id : int
        ID of the model
    model_version : str
        Version of the model

    Returns
    -------
    str
        Environment name with the format ModMon-model-<model_id>-version-<model_version>
    """
    return f"ModMon-model-{model_id}-version-{model_version}"


def create_env(model_path, model_id, model_version, capture_output=False):
    """Create all the environments defined in a model directory.

    Parameters
    ----------
    model_path : str
        Path to model directory
    model_id : int
        ID for the model
    model_version : str
        Version of the model
    capture_output : bool, optional
        Passed to subprocess.run, by default False

    Returns
    -------
    str
       Command needed to activate the model environment. If both conda and renv
       environments specified this will be the command to activate the conda environment
       only.
    """
    env_types = get_model_env_types(model_version.location)
    env_cmd = None

    if env_types["renv"] and env_types["conda"]:
        warnings.warn(
            "Both conda and renv environment detected - conda environment will be given priority."
        )

    if env_types["renv"]:
        conda_env = create_renv_env(
            model_version.location, capture_output=capture_output
        )
        # create_renv_env returns conda environment with appropriate R version
        #  (as well as setting up renv)
        env_cmd = get_conda_activate_command(conda_env)

    if env_types["conda"]:
        env_name = build_env_name(model_version.modelid, model_version.modelversion)
        create_conda_env(
            env_name,
            env_file=f"{model_version.location}/environment.yml",
            capture_output=capture_output,
        )
        env_cmd = get_conda_activate_command(env_name)

    return env_cmd

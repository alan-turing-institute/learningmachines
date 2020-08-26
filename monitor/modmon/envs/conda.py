"""
Functions for creating, activating and maintaining conda environments.
"""
import subprocess
import os
from pathlib import Path

from ..config import config


def get_conda_envs():
    """Get a list of all conda environments on the system.

    Returns
    -------
    list
        Name (str) of all the conda environments returned by "conda env list"
    """
    output = subprocess.run(["conda", "env", "list"], capture_output=True, check=True)
    lines = output.stdout.decode("utf-8").split("\n")
    envs = [line.split()[0] for line in lines if len(line) > 0]
    envs = [env for env in envs if env != "#"]
    return envs


def conda_env_exists(env_name):
    """Check whether a given conda environment exists on the system.

    Parameters
    ----------
    env_name : str
        Name of the environment to search for

    Returns
    -------
    bool
        True if env_name found on the system.
    """
    envs = get_conda_envs()
    return env_name in envs


def create_conda_env(
    env_name,
    env_file=None,
    dependencies=None,
    overwrite=False,
    capture_output=False,
    offline=None,
):
    """Create a conda environment from a file or list of dependencies.

    Parameters
    ----------
    env_name : str
        Name of the environment to create
    env_file : str, optional
        Path to environment file, by default None
    dependencies : list, optional
        List of packages to install (with conda) in "package_name=version" format, where
        the version is optional. Not used if env_file is defined. By default None
    overwrite : bool, optional
        If True remove any pre-existing environment called env_name, by default False
    capture_output : bool, optional
        Passed to subprocess.run, whether to catch stdout and stderr of calls to conda,
        by default False
    offline : bool, optional
        Whether to create environments offline by setting the --offline flag, by default
        None which uses the value of modmon.config["conda"]["offline"] if available, or
        False otherwise.

    Raises
    ------
    ValueError
        If neither env_file nor dependencies is defined.
    """
    
    if conda_env_exists(env_name):
        if overwrite:
            subprocess.run(
                ["conda", "remove", "-y", "--name", env_name, "--all"],
                check=True,
                capture_output=capture_output,
            )
        else:
            return

    if env_file:
        # get name of environment file without directory
        env_filename = Path(env_file).name
        
        # get environment file's directory
        cwd = Path(env_file).parent
        if not os.path.isabs(cwd):
            # if a relative path was given convert it into an absolute path
            cwd = Path(os.getcwd(), cwd)

        conda_create_cmd = [
            "conda",
            "env",
            "create",
            "-n",
            env_name,
            "-f",
            env_filename,
            "--force",
        ]

    elif dependencies:
        conda_create_cmd = [
            "conda",
            "create",
            "-n",
            env_name,
            "-c",
            "conda-forge",
            "-y",
            *dependencies,
        ]
        # working directory doesn't matter if using a list of dependencies, but need
        #  something to pass to subprocess.run
        cwd = Path(__file__).parent

    else:
        raise ValueError("One of env_file and dependencies must be specified.")

    # Set offline flag
    if offline is None:
        if "conda" in config and config["conda"].get("offline") == "True":
            offline = True
        else:
            offline = False
    if offline:
        conda_create_cmd.append("--offline")

    subprocess.run(
        conda_create_cmd, check=True, capture_output=capture_output, cwd=cwd,
    )


def get_conda_activate_command(env_name, conda_path=None):
    """Build command needed to source conda and activate an environment.

    Parameters
    ----------
    env_name : str
        Name of the environment to activate
    conda_path : str, optional
        Path to conda executable, or if None use the value of the "CONDA_EXE"
        environment variable, by default None

    Returns
    -------
    str
        Command to source conda and activate the environment called env_name
    """
    if not conda_path:
        conda_path = os.path.dirname(os.environ["CONDA_EXE"])

    # needed for conda activate to work
    source_conda = f"source {conda_path}/../etc/profile.d/conda.sh"
    activate_env = f"conda activate {env_name}"
    command = f"{source_conda} && {activate_env}"

    return command


def create_r_conda(r_version, overwrite=False):
    """Create a conda environment with a specific version of R and renv installed. The
    environment will be called "ModMon-R-<r_version>".

    Parameters
    ----------
    r_version : str
        Version of R to install
    overwrite : bool, optional
        If True overwrite any pre-existing conda environment for this R version, by
        default False

    Returns
    -------
    [type]
        [description]
    """
    env_name = f"ModMon-R-{r_version}"
    dependencies = [f"r-base={r_version}", "r-renv"]
    create_conda_env(env_name, dependencies=dependencies, overwrite=overwrite)
    return env_name


def remove_conda_env(env_name):
    """Remove a conda environment.

    Parameters
    ----------
    env_name : str
        The name of the conda environment to delete.
    """
    subprocess.run(["conda", "remove", "--name", env_name, "--all", "-y"], check=True)


def remove_modmon_envs(models=False, r_versions=False, tmp=False):
    """Remove conda environments created by ModMon.

    Parameters
    ----------
    models : bool, optional
        Delete model environments with names starting "ModMon-model", by default False
    r_versions : bool, optional
        Delete R version environments with names starting "ModMon-R", by default False
    tmp : bool, optional
        Delete temporary environments with names starting "ModMon-TMP", by default False
    """
    envs = get_conda_envs()

    if models:
        [remove_conda_env(env) for env in envs if env.startswith("ModMon-model")]

    if r_versions:
        [remove_conda_env(env) for env in envs if env.startswith("ModMon-R")]

    if tmp:
        [remove_conda_env(env) for env in envs if env.startswith("ModMon-TMP")]
        remove_conda_env("ModMon-model-TMP-version-TMP")

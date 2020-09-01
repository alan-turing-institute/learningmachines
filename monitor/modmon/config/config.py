import configparser
from pathlib import Path
import warnings

from .interpolate import EnvInterpolation

config = configparser.ConfigParser(interpolation=EnvInterpolation())

# search for .modmon.ini in home directory, if not present use defaults.ini
user_config_path = Path(Path.home(), ".modmom.ini")
default_config_path = Path(Path(__file__).parent, "defaults.ini")

if user_config_path.exists():
    config_path = user_config_path
elif default_config_path.exists():
    config_path = default_config_path
else:
    raise FileNotFoundError(
        f"Could not find ModMon configuration file at {user_config_path} or "
        f"{default_config_path}"
    )

with open(config_path, "r") as f:
    config.read_file(f)

error_sections = ["database", "models", "reports"]
for section in error_sections:
    if section not in config:
        raise KeyError(
            f"[{section}] section not found in {config_path}: "
            "This must be defined for core modmon functionality."
        )

warn_sections = ["database-admin", "conda", "renv"]
for section in warn_sections:
    if section not in config:
        warnings.warn(
            f"[{section}] not found in {config_path}: "
            "Some modmon features may not work or will take default values."
        )

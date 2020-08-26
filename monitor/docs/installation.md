# ModMon Installation and Configuration

## Pre-requisites

* conda: [Linux](https://docs.conda.io/projects/conda/en/latest/user-guide/install/linux.html), [Mac](https://docs.conda.io/projects/conda/en/latest/user-guide/install/macos.html)
* PostgreSQL: [Linux](https://www.postgresql.org/download/linux/), [Mac](https://wiki.postgresql.org/wiki/Homebrew)
* Git: [link](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* python 3 (developed on 3.8): [link](https://www.python.org/downloads/)
* R: [link](https://www.r-project.org/)

## Conda Environment

We recommend running ModMon in a virtual environment, such as a conda environment. To create one:
```bash
> conda create -n ModMon -y python=3.8
```
Then activate the environment with:
```bash
> conda activate ModMon
```
⚠️ **_All `ModMon` commands should then be run with this environment activated._**

## Install ModMon

Navigate to the `monitor` directory and then run:
```bash
> pip install .
```
For ModMon development you can add the `-e` flag to install the package in editable mode.

## Configure ModMon

To configure database and some environoment settings ModMon uses a configuration file in .ini format. By default this is the file in [modmon/config/defaults.ini](../modmon/config/defaults.ini). This defines:
* The ModMon database to be a postgresql database on localhost, without a username and password.
* conda environments to install dependencies via the internet.
* R models to be run in a conda environment with the R version specified by the renv.lock file.
* Submitted models to be stored in the user's home directory at `$HOME/modmon/models`.
* Reports to be stored in the user's home directory at `$HOME/modmon/reports`.

To change the default values you should copy [modmon/config/defaults.ini](../modmon/config/defaults.ini) to the file `$HOME/.modmon.ini`, where `$HOME` is the path to your home directory. You can then edit the file in your home directory as you wish.

## Setup ModMon Database

To create the ModMon database run:
```bash
> modmon_db_create
```

To check the database exists and is functioning normally run:
```bash
> modmon_db_check
```
This should print a list of tables and columns. Or you can connect directly to the database with the psql command line tool (assuming the default database configuration):
```bash
> psql -h localhost -p 5432 ModMon
```

## Delete ModMon Data

To delete ModMon artefacts (database, models, environments and reports) you can run:
```bash
> modmon_delete
```
With the following options:
- `--all` - Delete everything!
- `--envs` - Delete conda environments
- `--models` - Delete models in storage
- `--db` - Delete the database
- `--reports` - Delete reports in storage

**⚠️ This cannot be undone!** 


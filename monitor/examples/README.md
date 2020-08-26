# Model examples for the DECOVID model appraisal system

This directory contains several example model folders that were used for testing the model appraisal system, all of which follow the format outlined in [monitor/docs/project_structure.md](../docs/project_structure.md).

- `wine-quality` models are trained on a [popular machine learning dataset](http://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/)
- `synpuf` models are trained on a dummy OMOP dataset called [synpuf](https://forums.ohdsi.org/t/synpuf/4936), for which the Turing REG team have set up multiple databases on a remote server, see below.

## Synpuf Example Models

For testing purposes, a script has been added that will set up a model monitoring database called `ModMon` and add results for the example models found in [monitor/examples/synpuf](../examples/synpuf), which use the dummy OMOP database "Synpuf".

### Synpuf Database

Multiple instances of the Synpuf database have been set up on a remote server, that the models connect to. The different databases are named `WEEK_01` through `WEEK_10`, each including all data from the previous week as well as new data. This simulates the model appraisal scenario for DECOVID where the OMOP database is updated periodically with new patient data.

The configuration of this database server is stored in [synpuf/db_config.json](synpuf/db_config.json), and should not need to be changed (unless the Azure resources where it is hosted are disabled/moved). This file is copied to all the example model directories as part of running [synpuf_modmon_db_setup.sh](synpuf/synpuf_modmon_db_setup.sh).

### Example models

- An R model (synpuf_R) with version 1.0.0 using a `glmnet` classifier.
- A python model (synpuf_python) with two versions (1.0.0 and 2.0.0), one using `LogisticRegression` with no preprocessing of condition strings, the other using `RandomForest` and preprocessing (stemmer, removal of stopwords etc.) on the condition strings.

### Setup and run the examples

Before running the example:
- To connect to the Synpuf database you will need "Microsoft ODBC Driver 17 for SQL Server" to be installed on your system. [See the instructions here.](https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver15)

- If an existing ModMon db exists first run `modmon_delete --all` (see [monitor/docs/installation.md](../docs/installation.md)), assuming there is no ModMon data you wish to keep!

To run the example:
- Navigate to the [monitor/examples/synpuf](../examples/synpuf/) directory and run: 
  ```bash
  > bash synpuf_modmon_db_setup.sh
  ```

⚠️ _If you have installed ModMon in a conda environment you will need to have it activated before running this script - see [installation docs](../docs/installation.md)._

⚠️ _This will take quite a while to run, about 15 minutes._

This script does the following:
- Adds the 3 example models versions (see above) to the ModMon database and model storage area (by default `$HOME/ModMon/models`).

- Runs every model on every database (WEEK_01 to WEEK_10), including setting up conda environments for the python models and a renv environment for the R model.

- Generates a monitoring report after each run, by default stored in `$HOME/ModMon/reports`. These will show the values of each example model's performance metrics on each database.

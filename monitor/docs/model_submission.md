# Model Submission

To add a model to the monitoring system you should first ensure it's in the necessary format (see project structure docs). In particular, it must be contained within a single directory including (at its top level):
- `metadata.json` file defining the command to run your model, and other metadata.
- `metrics.csv` file containing the results of running your code on known inputs.

## Check a model before submission

To check the code, environments, metadata and metrics files of a model are in the expected formats you can run the command:
```bash
> modmon_model_check path/to/model
```
Where `path/to/model` is the path to the directory to be submitted to the database. By default, this command runs general sanity checks of the metadata, database and metrics. To perform a more substantial check you can also pass the arguments:
- `--create_envs` to test that any defined virtual environments (conda or renv) can be created successfully.
- `--repro_check` to verify that the command can be run successfully and the same metrics values are reproduced (in this case the virtual environment will be created even if the `--create_envs` flag is not used). The newly generated `metrics.csv` file must be _identical_ to the submitted file to pass this check. The reproducibility check on `metrics.csv` is done with `repro-catalogue` (see [docs](https://repro-catalogue.readthedocs.io/en/latest/example_use.html#run-analysis)).

A successful run of `modmon_model_check --repro_check` will give output similar to this:
```
[ ] Checking wine-quality/sklearn_basic...
[✓] Metadata: File exists
[✓] Metadata: All keys present
[✓] Metadata: All keys have valid values
[!] Database: New entries will be created for ['research_question', 'db_name', 'model_name']
[!] Database: Entries already exist for ['team']
[✓] Metrics: File exists
[✓] Metrics: Found expected columns
[✓] Environment: conda found
[ ] Environment: Creating conda env...
[✓] Environment: conda environment created
[ ] Reproducibility: Checking reproducibility...
[✓] Reproducibility: Reference metrics are reproducible
[ ] RESULT: [✓] 8 passed, [!] 2 warnings, [x] 0 failed
```
In all cases `modmon_model_check` will show warnings about entries in the database that will be newly created or referred to. For example, the output above indicates that we already have a model in the database from the same team that made the model we're checking. You should check these are what you expect and change the values in the metadata file if not.

## Add a Model to the Database

To add a new model to the database:
```bash
> modmon_model_setup path/to/model
```
Where `path/to/model` is the absolute path to the directory submitted by the analyst.

By default `modmon_model_setup` initially runs pre-submission checks (see above) and asks the user whether they want to continue with the setup based on the results of those checks. There are several arguments that can be used to configure this behaviour, to see these run `modmon_model_setup --help` from the command-line, which should give you something like this:
```
usage: modmon_model_setup [-h] [--nocheck] [--quickcheck] [--noconfirm] [--force] model

Add a model version to the ModMon monitoring system.

positional arguments:
  model         Path to model directory to add

optional arguments:
  -h, --help    show this help message and exit
  --nocheck     If set, setup model without performing pre-submission checks
  --quickcheck  If set, don't perform environment or reproducibility checks
  --noconfirm   If set, don't ask for user confirmation after checks
  --force       If set, setup model even if checks fail
  --keepold     If set, don't set previous versions of this model to be inactive
```

After the checks pass (or if the checks are skipped) `modmon_model_setup` does the following:
- Uses the metadata to create a new Model Version in the database (and define its relationships with new or existing groups of models, research questions, teams etc.).
- Adds the reference metrics values (the contents of the submitted `metrics.csv` file) to the results table in the database.
- Copies your model directory to the ModMon storage area (see installation instructions).
- Sets previous versions of the model to be inactive (so they are not run by default in future ModMon runs). To keep previous versions active you can use the `--keepold` flag.
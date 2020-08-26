# Running Models

## Log a new result for all models

To run all active model versions in the database on a new dataset, run this command, replacing `<start_date>` and `<end_date>` with appropriate values (in `Y-m-d` format), and `<database>` with the name of the database to connect to:
```bash
> modmon_run --start_date <start_date> --end_date <end_date> --database <database>
```
At least one of `--start_date`, `--end_date` and `--database` must be given.

`modmon_run` then performs the following steps:
- Gets all active model versions from the database (unless the `--run_inactive` flag is set, in which case inactive models are obtained too).
- For each model: 
  - Checks whether a result already exists on the dataset (defined by the input start date, end date and database). If so skips running this model unless the `--force` flag is set.
  - Creates and activates any virtual environments defined in the model's directory.
  - Runs the model's command with the given inputs to generate a new metrics file.
  - Saves the contents of the new metrics file to the results table in the database.

## Visualise model reults

To generate a report that summarises the performance of all models in the ModMon DB that have been run, simply use the following command, which will save the report document to the directory defined in the ModMon configuration (see installation instructions):

```bash
> modmon_report
```

The report will also be generated automatically as the final step in `modmon_run` (see above).

## Synpuf Example

For testing purposes, a script has been added that will set up a model monitoring database called `ModMon` and add results for the example models found in `monitor/examples/synpuf` which use the dummy OMOP database "Synpuf". If an existing ModMon db exists first run `modmon_delete` (see above). Navigate to the `monitor/examples/synpuf` dir and run:

```bash
> bash synpuf_modmon_db_setup.sh
```

Multiple instances of this database have been set up on a remote server, that the models connect to. By changing the `--database` flag to one of `WEEK_01` through `WEEK_10`, different versions of the Synpuf data can be used by the models. This simulates the model appraisal scenario for DECOVID where the OMOP database is updated periodically with new patient data.

*NOTE: You will need to have activated the ModMon environment and installed ModMon to run this script.*



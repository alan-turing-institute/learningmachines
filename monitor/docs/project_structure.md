# Project and Code Structure

ModMon is designed to require as few modifications to your code as possible and your code does not need ModMon as a dependency to be submitted to a ModMon system. The main requirements are:
- All code and artefacts required to run the model must be in a single parent directory.
- It must be runnable with a single command from the command-line.
- The command can have up to 3 arguments used to modify a dataset query - a start date, end date and database name.
- The output must be a CSV file `metrics.csv` with two columns - the name of a metric and its value.
- A metadata JSON file is required containing details and descriptions of your model. 
- Python and R are the supported languages. Others should work as long as they follow the requirememts above and are are available where ModMon is installed, but there will be no management of virtual environments (unless you can use a conda environment).

With these in place your code, for example code to run a pre-trained model, can be submitted to a ModMon system and evaluated on new datasets (see submission and monitoring guidelines).

## File Structure

A simple example of a directory ready to submit to ModMon may look something like this:
```
|-- model/
|  |-- run_model.py                <- Required: Metrics calculation script (language of choice e.g. run_model.R)
|  |-- metrics.csv                 <- Required: Output from a run of run_model.py on known inputs
|  |-- metadata.json               <- Required: Manually compiled metadata
|  |-- environment.yml             <- Recommended: Sets up environment needed for model to run
|  |-- data/			   <- Sub-directories are fine too
|  |  |-- model.sav                <- Optional: Artefacts, such as a pre-trained model
```

This is one example, but only the metrics calculation script (`run_model.py` or whichever name and language you choose), `metrics.csv` and `metadata.json` are essential. The metrics and metadata files must always be in the parent directory and have the names above.

## Specifying a Virtual Environment

### conda (Python)

Python dependencies should be specified with a `conda` environment file named `environment.yml` (see [conda docs on environment files](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#create-env-file-manually)) in the parent directory of your project. A simple example may look something like this:
```yaml
name: sklearn-model

dependencies:
  - python=3.8.3
  - pip
  - pip:
    - -r requirements.txt
```
It should specify the python version and all packages that should be installed, as well as their versions. Note that in the example above all packages are installed with `pip` as specified by a separate `requirements.txt` file, a text file specifying packages and their versions as follows:
```
lightgbm==2.3.1
mccabe==0.6.1
numpy==1.18.4
pandas==1.0.3
```

`conda` has a large ecosystem and supports languages other than python. Although we have only tested ModMon with conda environments for python and R, any valid conda environment for any language should work as expected.

### renv (R)

R dependencies should be specified with a `renv` environment ([renv docs](https://rstudio.github.io/renv/articles/renv.html)). With `renv` installed, run `Rscript -e "renv::init()"` from your project directory, which will create the files/directories `renv.lock`, `renv`, and `.Rprofile` specifying all your dependencies (these should be in the parent directory of your project).

## Run Command

The command to run your model must contain at least one of the following parameters:

  - **Database:** The name of a database to connect to (all other server parameters should be defined separately).
  - **Start Date:** The date of the earliest row to extract from the database (`Y-m-d` format)
  - **End Date:**: The date of the latest row to extract from the database (`Y-m-d` format)

Your script must use these inputs to connect to the given database, and to modify any database queries to return only data updated between the given start and end date.

In the command string you define in the metadata (see below) the value to pass to each of the inputs above should be encoded by the placeholders `<database>`, `<start_date>` and `<end_date>` (case sensitive but in any order). For example, you could define the command to run your model to be:
```
python run_model.py --db <database> --start <start_date> --end <end_date>
```
When your code is run by ModMon, `<database>`, `<start_date>` and `<end_date>` will be automatically replaced by the user-defined values for the run.

Although the placeholder strings must always have the name and formats given above, the names of the inputs in your command can be anything you like. For example, this would be an equally valid run command:
```
python run_model.py --DATES <start_date> <end_date> --DATABASE <database> 
```
You also don't need to use all three placeholders, so this is also valid:
```
python run_model.py <database>
```



## Metrics Files

The `metrics.csv` file created by your run command must have two columns: "metric" (a string representing the name of the metric that has been calculated) and "value" (the value of that metric), and should look something like this:

```cs
metric,value
mse,0.1
r2,0.9
```

The column headings ("metric,value") are required.

When you submit your model (see model submission guidelines) you must also provide a `metrics.csv` file containing the result of running your model on known inputs (with the inputs used to create that metrics file defined in the metadata, see below). Before adding your model to the ModMon database its reproducibility will be checked by validating that a metrics file with exactly the same format and contents is produced by running your command with the inputs specified in the metadata file.

## Metadata Files

The metadata file must be called `metadata.json`, be in the parent directory of your project, and should have the following format:

```JSON
{
	"team": "REG",
	"contact": "Ed Chalstrey",
	"contact_email": "echalstrey@turing.ac.uk",
	"team_description": "A team from The Alan Turing Institute",
	"research_question": "Investigate wine quality dataset",
	"model_name": "WineQuality1",
	"model_description": "Model to assess wine quality",
	"model_version": "1.0.0",
	"db_name": "dummydb",
	"data_window_start": "03/03/2020",
	"data_window_end": "03/06/2020",
	"model_train_datetime": "03/06/2020",
	"training_data_description": "This is 50% of the wine quality dataset",
	"model_run_datetime": "11/07/2020",
	"test_data_description": "This is the 50% of the wine quality dataset that was not used for training the model",
	"command": "python run_prediction_model.py <database> <start_date> <end_date>"
}
```

The contents of this file are used to produce unique identifiiers for your project in the monitoring database, for defining the command to run your code, and for giving reference values to use for reproducibility checks.

- **`<data_window_start>`, `<data_window_end>` and `<db_name>`:** The date range and database used to produce the values in the `metrics.csv` file you provide. Running your specified command with `data_window_start` as `<start_date>`, `data_window_end` as `<end_date>` and `db_name` as `<database>` should exactly reproduce the values in `metrics.csv`. This will be tested before adding a model to the monitoring system.

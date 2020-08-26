# ModMon Docs

This page gives the general context and motivation for developing ModMon, how it works and what it's trying to achieve. For usage instructions see the following links:

- [Installation and configuration](installation.md)
- [Required project/code structure](project_structure.md)
- [Adding a model to ModMon](model_submission.md)
- [Running models with ModMon](run_models.md)

## Context

Predictive models, and any type of analysis, represent the data they were trained on and developed with. Over time it's likely that aspects of the data will change, and the performance of the original model may drop as a result.

DECOVID is happening in an uncertain, rapidly developing environment:
- Changing status of the pandemic: Number and severity of cases being treated, development of new treatments, different government response & lockdown measures etc. 
- The project is developing: Data from new hospitals will be added, new types of data or measurements will become available, old data may have corrections made etc.

DECOVID is therefore a prime example of a project where the models or analyses developed at one time may not necessarily continue to perform as expected (or at least not as well as possible), and the timescale over which those changes happen and performance drops occur may be quite short.

As DECOVID outputs are intended to be used to make clinical decisions for patients, it's critical to ensure that they stay relevant, or in other words to validate that any model being used still reflects the current status of the data. Therefore, it's critical to have practices, infrastructure and tools in place to test DECOVID models and other outputs on the latest data.


## ModMon: A model appraisal system for DECOVID

The ModMon package aims to provide a system where analysts can submit their models (or other analyses) to be easily run on new data as it arrives, and to compare the results to previous runs. It will reduce the burden on analysts of needing to revalidate and appraise their models.

DECOVID teams will be answering many different research questions, with different programming languages (mostly python and R), packages (though limitied to what's available in the secure research environment) and workflows. Being able to run models of completely different formats in one automated system requires some standardisation of the code that's provided.

We have developed ModMon to be as workflow-agnostic as possible, with the main requirement being to provide a single command to run your model with several known inputs defining the dataset to use. The output of this command must be a CSV file containing the values of the metrics for evaluating the performance of your model (these metrics must be single-valued, but can be anything you choose to define).

In summary:

**Analysts provide:**
- Code and artefacts (pre-trained model files etc.) with their own choice of language, packages and workflow.
- A command to run their model from the command-line, taking dataset parameters as inputs and producing a CSV file containing performance metric values.
- A metrics file containing the results of running the command above on a known dataset.
- A metadata file specifying other general details about your model and team.

**ModMon provides:**
- Automated checks that your model can be run by someone else and that it gives the same results.
- A way to store and maintain different versions of multiple models.
- A way to run multiple models on new data with a single command, and to store the results.
- Automatically generated reports on the performance of your models across multiple datasets.

## ModMon and Reproducibility

Before your model/code is added to the ModMon system it will be run through checks to ensure it is compatible. This also includes a reprooducibility check on previously calculated metrics from a known dataset. If ModMon is unable to setup your code environment and reproduce identical metric values the checks will fail. Reproducibility is another core value of DECOVID and it is our intention that all models added to the ModMon system should be known entities proven to produce expected results. Reproducibility checks are performed with the [repro-catalogue package](https://github.com/alan-turing-institute/repro-catalogue).

## Performance Reports and Feedback

The results (metric values) of all model runs on each different dataset are stored in the ModMon database. Building off the [descriptive stats work](../../analysis/plotting) for DECOVID, ModMon uses the database and [unitreport](https://github.com/annahadji/unitreport) to automatically generate formatted reports showing how the performance of each model has changed with subsequent runs. These can be used by analysts to quickly determine whether a model is giving questionable results and needs to be investigated in more detail.

If an analysis team intervenes and improves their model it can be resubmitted to ModMon with a new version number. In this way ModMon keeps a version history of each model group, and can optionally monitor either only the latest version of each model or all versions of each model.

## Data Source

For DECOVID, clinical data from the partner hospitals will be converted to the OMOP database format (see [DECOVID-datamgmt repo](https://github.com/alan-turing-institute/DECOVID-datamgmt)), and all analyst teams will have access to an OMOP database derived from this source.

DECOVID has considered two main approaches for updating the analyst database  with new data (or corrected data) when it arrives:

- **Temporal Tables:** The history of values for all rows is stored in the database. When a new row is added (or a value updated) to the database it is added with a timestamp of the update time. Using these timestamps, analysts can query the database to return data in the state it was in at any point in its history.

- **Database Snapshots:** Analysts are provided with (for example weekly or monthly) "snapshots" of the database containing all the data up until that time. Analysts should have access to the full history of snapshots to be able to re-run their analyses at a later date with exactly the same data.

As the purpose of ModMon is to identify changes in performance on new data the temporal tables approach would be preferable. With temporal tables, database queries can be easily modified to only return data that has been added or updated since a given time (e.g. since the last time a model was evaluated). 

With database snapshots there's no straightforward way to query the database only for new data (previously unseen by the model), so the metrics calculation will be less sensitive to changes. However, ModMon will work with either approach. With temporal tables the required inputs to specify a dataset will be a start date, end date and database name. For database snapshots only a database name is likely to be needed.

## Information Governance

DECOVID analysis teams will be working in a secure research environment (SRE) based on the [Turing Safe Haven](https://www.turing.ac.uk/research/research-projects/data-safe-havens-cloud). Analysts will not have internet access from the SRE, and for each research question there will be a different SRE containing only the subset of the data strictly necessary to be able to answer that question.

This has consequences for ModMon and it has been developed with two possible implementations in mind:

1. _(Unlikely for information governance reasons)_ A single ModMon system in a separate SRE with access to the full, combined DECOVID dataset. This could then provide a single place to store and run all the modelling outputs developed by DECOVID teams for acrooss all the different research questions. However, it would need careful consideration to guarantee each model is run on the correct data subset (identical to the one used by the analysts in their SRE).

2. _(More likely)_ One ModMon system in each analyst SRE. With this setup ModMon will essentially be a tool available for analysts to use, and each analyst team maintains their own ModMon system. This is simpler both for inforomation governance reasons and because all the models in each ModMon system will be using datasets with identical features and formats.

In either case, not having access to the internet has consequences for setting up virtual environments and installing packages. ModMon can be set up to use conda in offline mode (but this has not yet been tested with renv).

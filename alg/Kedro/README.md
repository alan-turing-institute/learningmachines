Based on Spaceflights tutorial in the Kedro docs: https://kedro.readthedocs.io/en/stable/index.html

## Installation (in a conda environment)

```bash
> conda create -n kedro python=3.7
> conda activate kedro
> pip install kedro
> pip install kedro-viz
```

## Setup

```bash
> cd alg/Kedro/kedro-tutorial
> kedro install
```

## Description

Creates a pipeline to train a model that predicts the price of a space shuttle trip based on three datasets:
* reviews.csv
* companies.csv
* shuttles.xlsx

These are stored in `data/01_raw`. All data files should have a reference in the "Data Catalog" in `conf/base/catalog.yml`, which defines the type of data and its location. These can be referenced by name in steps of the pipelines.

The project defines a master pipeline in `kedro_tutorial/src/pipeline.py`, which is constructed from a data engineering pipeline (preprocess and merge data) and a data science pipeline (train and evaluate a model).

The data science/data engineering pipelines comprise of several `node`, e.g. in `kedro_tutorial/src/pipelines/data_engineering/nodes.py`. Each node runs a python function and has inputs and outputs (names defined in the data catalog).

Kedro figures out the dependencies between pipelines and which ones should be run first.

## Things you can do

### Run pipeline:

Whole pipeline:
```bash
> kedro run
```

Part of the pipeline:
```bash
> kedro run --pipeline=ds
```

### Visualise pipeilne:
```bash
> kedro viz
```

Will open a page in the browser showing a visualisation of the datasets, parameters and functions that are part of the pipeline.

### Build documentation for project:
```bash
> kedro build-docs
```
Generates html files in `docs/build/html`.

### Run tests
```bash
> kedro test
```

### Lint
```bash
> kedro lint
```

### Build python package:
```bash
> kedro build-reqs # freeze package versions
> kedro package
```

### Run interactively with project specific config
Notebook:
```bash
> kedro jupyter
```
IPython:
```bash
> kedro ipython
```

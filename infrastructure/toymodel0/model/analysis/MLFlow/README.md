Example comes from the MLFlow repo: https://github.com/mlflow/mlflow

Documentation for tutorials and MLFlow: https://mlflow.org/docs/latest/index.html

## Install MLFlow (in a conda environment)

```
conda create -n mlflow python=3.7
conda activate mlflow
pip install mlflow
```

If using the notebook:
```
pip install jupyter
pip install "mlflow[extras]"
```

## sklearn Wine Example

**Run commands from the `learningmachines/alg/MLFlow` directory.**

Trains a sklearn ElasticNet model to predict wine quality, using the [UCI wine quality dataset](http://archive.ics.uci.edu/ml/datasets/Wine+Quality). Tracks metrics from different training runs and serves the results as an API.

### Train model and track results

MLFlow (creates conda environment with required dependencies):
```
mlflow run examples/sklearn_elasticnet_wine -P alpha=0.42
```

Run the above command multiple times with different alpha values. You can also pass the L1 ratio as a parameter: `l1_ratio=0.2`. The setup of the project is defined in the `MLProject` file, which defines a conda environment, parameters, and the command (python script) to be run.

By default run results are stored as files in the `mlruns` directory. This can be configured to be a remote server, and/or a SQL database.

There's also a notebook if you prefer:
```
jupyter-notebook examples/sklearn_elasticnet_wine/train.ipynb
```

### UI

Start it:
```
mlflow ui
```
Then browse to http://localhost:5000/

You can:
* Look at the results of each run
* Compare runs visually
* Query runs by metrics, parameters etc.

### Serve Model

```
mlflow models serve -m <REPO_DIR>/learningmachines/alg/MLFlow/mlruns/0/<RUN_ID>/artifacts/model -p 1234
```

Where `<REPO_DIR>` is the absolute path to the directory you have the learning machines repo in, and `<RUN_ID>` is the ID of the run you want to make an API of the model from (get it by clicking on a run in the UI).

This creates an API end-point for the model on port 1234. To get a prediction:
```
curl -X POST -H "Content-Type:application/json; format=pandas-split" --data '{"columns":["alcohol", "chlorides", "citric acid", "density", "fixed acidity", "free sulfur dioxide", "pH", "residual sugar", "sulphates", "total sulfur dioxide", "volatile acidity"],"data":[[12.8, 0.029, 0.48, 0.98, 6.2, 29, 3.33, 1.2, 0.39, 75, 0.66]]}' http://127.0.0.1:1234/invocations
```

Should return a predicted value like `[3.986343895324344]`.

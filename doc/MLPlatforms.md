# Version controlling, monitoring and deploying models

## MLflow
- _Open source package for packaging, deploying and tracking models_
- https://mlflow.org/

3 components:
1) MLflow Tracking: Record and query experiments (code, data, config, and results).
2) MLflow Projects: Packaging format for reproducible runs on any platform.
3) MLflow Models: General format for sending models to diverse deployment tools.

Command-line tools and python APIs for functionality

Some integration with Azure databricks

### MLflow tracking

Log parameters, code versions, metrics and output files when running code. Visualise/analyse and compare results.

Run has: code version (git commit), start/end time, source, parameters, metrics, artifacts (e.g. images, trained models, data etc.)

Runs recorded to local file, SQLAlchemy database or remote server.

Log metrics (performance tracking) with timestamp

Tracking UI for visualising metrics

Group runs - "experiments"

Query and compare runs

Runs configured for automated hyperparameter tuning

### MLflow Projects

Convention for organizing and describing your code.

Any Git repo can be treated as MLflow project

Run projects from a Git URI or local directory

MLflow can run projects based on a convention for placing files in the (Git) directory
 - a conda.yaml file is treated as a Conda environment
 - can describe your project in more detail by adding a MLproject  yaml file, can specify
   - name
   - entry points: commands (.py or .sh) and parameters
   - environment: local system, conda or docker
 - if directory doesn't have MLproject file, behaviour inferred from directory names etc.

Launch runs locally, databricks, kubernetes or any computing infrastucture
  - not sure what is "automatically" setup for databricks/kubernetes vs. something else

Multistep workflows combining project runs and tracking, e.g. output of some steps used as input to others. Launch runs in parallel.


### MLflow Models

Standard format for packaging machine learning models

Use that standard format e.g. to make REST API

Model is a directory containing (any) files and a MLmodel file.

MLmodel file defines "flavours" model is compatible with(?):
  - python function
  - R function
  - sklearn, Keras, PyTorch, TensorFlow
  - sagemaker (AWS)
  - pickled model
  - ...

Model can be used with any tool that supports any of the flavours in the MLmodel file

Also support for custom models/flavours

Built-in deployment tools - including deployment to Azure ML
  - local REST API
  - Docker container with REST API endpoint


## DVC
- _Data Version Control for Machine Learning Projects_
- https://dvc.org/

Integrates with GitHub, meant to be nice way to version control large data files.

"dvc" files in repo with metadata about data, large files stored remotely elsewhere

Functionality to:
- store and retrieve version controlled data
- pipelines
- version control metrics (evaluate results of pipelines)
- experiments with different parameters

It all happens within the git repo so changes are commits etc., dvc used to bring
in/manage data files in a nice way?

## Pachyderm
_Open source, containerised data science platform._\
https://www.pachyderm.com/

## neptune.ai
_Experiment management workflow_\
https://neptune.ai/

## Azure Machine Learning and MLOps (commercial)
_Pipelines, automation, tracking etc._\
https://azure.microsoft.com/en-gb/services/machine-learning/

## Tensorboard*
_Measure and visualise model performance during training_\
_Living with Machines (Kasra) have used this_\
https://www.tensorflow.org/tensorboard\

## Databricks (commercial)

## Alteryx (commercial)

## rapidMiner (commercial)

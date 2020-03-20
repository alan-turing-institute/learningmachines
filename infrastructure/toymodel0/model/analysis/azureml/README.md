Azure Data Drift

From this repo: https://github.com/Azure/MachineLearningNotebooks

### Create an Azure ML Workspace

Search for "Machine Learning" resource in the portal and create one in your subscription.


### Local attempt (failed):

0) Create an activate a virtual environment, e.g. `conda create -n azureml python=3.7 && conda activate azureml`

1) Run `bash setup_azureml.sh`

2) Start `jupyter-notebook`

3) Open `MachineLearningNotebooks/configuration.ipynb` and follow the instructions to setup and configure an Azure ML workspace.

4) Open `MachineLearningNotebooks/work-with-data/datadrift-tutorial.ipynb`

5) Failed import of azureml.datadrift

### Attempt in Azure ML VM (success):

1) Go to your Azure Machine Learning resource in the Azure portal.

2) Go to Compute (under Assets on the left)

3) Click Compute Instances -> New. Pick a name and a VM size etc.

4) In the list of compute instances, once the new VM has been created, you should see the options "JupyterLab", "Jupyter", "RStudio" and "SSH" under Application URI. Click Jupyter. Jupyter should open in a new tab (running on your VM).

5) In the Jupyter menu, Go to AzureML Samples -> How to Use AzureML -> Work with Data -> datadrift-tutorial and click "clone", then "clone" again in the pop-up window.

6) Notebook should open and can run the cells normally.

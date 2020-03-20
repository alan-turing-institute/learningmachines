# install just the base SDK
pip install azureml-sdk

# clone the sample repoistory
git clone https://github.com/Azure/MachineLearningNotebooks.git

# below steps are optional
# install the base SDK, Jupyter notebook server and tensorboard
pip install azureml-sdk[notebooks,tensorboard]

# install model explainability component
pip install azureml-sdk[explain]

# install automated ml components
pip install azureml-sdk[automl]

# install experimental features (not ready for production use)
pip install azureml-sdk[contrib]

# install data drift components
pip install azureml-datadrift

from get_data import get_data
import pandas as pd
import pickle
from sklearn import svm
import timeit

# Pull the training data into dataframes (imagine this was a database query)
X_train, y_train = get_data()

# Create and train model and get training time metric
model = svm.SVC()
start_model_training = timeit.default_timer()
model.fit(X_train, y_train)
stop_model_training = timeit.default_timer()
training_time = stop_model_training - start_model_training

# Save model to disk
filename = "model.sav"
pickle.dump(model, open(filename, "wb"))

# Output metrics as csv
metrics = pd.DataFrame([["training_time", training_time]], columns=["metric", "value"])
metrics.to_csv("training_metrics.csv", index=False)

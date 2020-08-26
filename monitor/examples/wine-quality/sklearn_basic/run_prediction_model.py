import argparse
from datetime import datetime
from get_data import get_data
import numpy as np
import pickle
import pandas as pd
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

# Set seed for consistent results
np.random.seed(42)

# Load the model from disk
model = pickle.load(open("model.sav", "rb"))

# Get the database name, start and end of date range to use for the model
parser = argparse.ArgumentParser()
parser.add_argument("db_name")
parser.add_argument("start_date", type=lambda s: datetime.strptime(s, "%Y-%m-%d"))
parser.add_argument("end_date", type=lambda s: datetime.strptime(s, "%Y-%m-%d"))
args = parser.parse_args()

#  In this dummy example, we don't actually use these args as there is no db query
args.db_name
args.start_date
args.end_date

# Pull the test data into dataframes (imagine this was a database query)
X_test, y_test = get_data(test=True)

# Predict with model
predicted_qualities = model.predict(X_test)

# Calculate model prediction metrics
metrics = pd.DataFrame(
    [
        ["r2", r2_score(y_test, predicted_qualities)],
        ["mse", mean_squared_error(y_test, predicted_qualities)],
        ["mar", mean_absolute_error(y_test, predicted_qualities)],
    ],
    columns=["metric", "value"],
)

# Save metrics csv
metrics.to_csv("metrics.csv", index=False)

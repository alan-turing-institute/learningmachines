import joblib
import pandas as pd

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.metrics import roc_auc_score

from db import get_data

random_seed = 64


# Get condition and gender data from WEEK_00 database
df = get_data("WEEK_00")

# predict whether gender is male from condition
y = df["gender"] == "MALE"
X = df["condition"]

# Create train and test datasets
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=random_seed)

# Fit vectorizer and RandomForest classifier pipeline
pipe = Pipeline(
    [
        ("vectorizer", CountVectorizer()),
        ("classifier", LogisticRegression(max_iter=200)),
    ]
)

pipe.fit(X_train, y_train)

# save fitted pipeline
joblib.dump(pipe, "pipeline.joblib")

# Score fitted model
acc_train = pipe.score(X_train, y_train)
acc_test = pipe.score(X_test, y_test)

y_pred_train = pipe.predict_proba(X_train)
y_pred_test = pipe.predict_proba(X_test)
auc_train = roc_auc_score(y_train, y_pred_train[:, 1])
auc_test = roc_auc_score(y_test, y_pred_test[:, 1])

print("TRAIN: accuracy =", acc_train, ", AUC =", auc_train)
print("TEST: accuracy =", acc_test, ", AUC =", auc_test)


# for reproducibility check calculate metrics on full dataset and save to file
acc = pipe.score(X, y)
y_pred = pipe.predict_proba(X)
auc = roc_auc_score(y, y_pred[:, 1])

# Create df of test metrics
metrics = pd.DataFrame([["accuracy", acc], ["AUC", auc]], columns=["metric", "value"],)

# Save the metrics to csv:
metrics.to_csv("metrics.csv", index=False, float_format="%.3f")

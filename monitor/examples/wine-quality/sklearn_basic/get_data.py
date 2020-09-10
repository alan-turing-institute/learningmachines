from sklearn.model_selection import train_test_split
import pandas as pd
import logging

logging.basicConfig(level=logging.WARN)
logger = logging.getLogger(__name__)


def get_data(test=False):
    """This script gets training or testing data
    (in a real scenario, this would involve select query to db)"""
    csv_url = "http://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/winequality-white.csv"
    try:
        data = pd.read_csv(csv_url, sep=";")
    except Exception as e:
        logger.exception(
            "Unable to download training & test CSV, check your internet connection. Error: %s",
            e,
        )

    # Split into training and test data
    y = data.quality
    X = data.drop("quality", axis=1)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5)

    if test:
        return X_test, y_test
    else:
        return X_train, y_train

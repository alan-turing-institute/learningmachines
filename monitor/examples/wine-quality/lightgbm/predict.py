import lightgbm as lgb
import pandas as pd
import argparse
from datetime import datetime


def get_input_data(start_idx, end_idx):
    df = pd.read_csv("winequality-white.csv", sep=";")
    predict_col = "quality"
    df = df.drop(predict_col, axis=1)
    return df.iloc[start_idx : (end_idx + 1)]


def predict(data):
    model = lgb.Booster(model_file="model.txt")
    return model.predict(data)


if __name__ == "__main__":

    parser = argparse.ArgumentParser(
        description="Predict wine quality with pre-trained model."
    )
    parser.add_argument(
        "--start_date", help="Index of first row to predict for", required=True
    )
    parser.add_argument(
        "--end_date", help="Index of last row to predict for", required=True
    )
    parser.add_argument(
        "--database",
        help="Dummy placeholder for database to connect to, not used",
        required=False,
    )

    args = parser.parse_args()
    #  Interpret year of dates as row indexes to use for dummy example
    start_idx = datetime.strptime(args.start_date, "%Y-%m-%d").year
    end_idx = datetime.strptime(args.end_date, "%Y-%m-%d").year

    data = get_input_data(start_idx, end_idx)
    preds = predict(data)
    preds = pd.DataFrame(preds, index=data.index)
    preds.index.name = "idx"
    preds.to_csv("predictions.csv")

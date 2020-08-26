import pandas as pd
import lightgbm as lgb


def train():
    print("loading data...")
    df = pd.read_csv("winequality-white.csv", sep=";")
    print(df.head())
    print(len(df), "rows")

    # only train with first 2500 rows (use rest for playing with model monitoring)
    n_train_rows = 2500
    df = df.iloc[:n_train_rows]
    print(len(df), "rows after selecting first", n_train_rows)

    # create lightgbm train and validation datasets
    predict_col = "quality"
    data = df.drop(predict_col, axis=1)
    label = df[predict_col]

    n_valid_rows = 500
    train_data = lgb.Dataset(data.iloc[n_valid_rows:], label=label.iloc[n_valid_rows:])
    validation_data = lgb.Dataset(
        data.iloc[:n_valid_rows], label=label.iloc[:n_valid_rows], reference=train_data
    )

    # set lightgbm parameters
    param = {"objective": "multiclass", "num_class": 11}

    # train model with 5 fold cross validation
    print("training model...")
    model = lgb.train(param, train_data, valid_sets=[validation_data])

    print("saving model...")
    model.save_model("model.txt")


if __name__ == "__main__":
    train()

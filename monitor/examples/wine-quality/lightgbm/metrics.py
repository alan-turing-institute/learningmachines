import pandas as pd
import numpy as np


def get_labels(idx):
    df = pd.read_csv("winequality-white.csv", sep=";")
    labels = df.loc[idx, "quality"]
    return labels


def correct_class(predictions, true_values):
    """Fraction of predictions that exactly matched the correct quality score.
    """
    pred_labels = predictions.idxmax(axis=1)
    df = pd.DataFrame({"true": true_values, "predicted": pred_labels})
    return (df["true"] == df["predicted"]).mean()


def mean_log_loss(predictions, true_values):
    labels = range(11)
    scores = []
    for label in labels:
        probabilities = predictions.loc[:, label]
        is_this_label = true_values == label
        probabilities = probabilities[is_this_label]
        scores.append(-np.log(probabilities).mean())
    return np.nanmean(scores)


if __name__ == "__main__":
    preds = pd.read_csv("predictions.csv", index_col="idx")
    preds.columns = preds.columns.astype(int)
    labels = get_labels(preds.index)

    cc_score = correct_class(preds, labels)
    print("correct_class", cc_score)
    ll_score = mean_log_loss(preds, labels)
    print("log loss", ll_score)

    metrics = {"correct_class": cc_score, "mean_log_loss": ll_score}

    with open("metrics.csv", "w") as f:
        f.write("metric, value\n")
        f.write(f"correct_class, {cc_score}\n")
        f.write(f"mean_log_loss, {ll_score}\n")

from typing import Dict
from kedro.pipeline import node, Pipeline
from kedro_tutorial.pipelines.data_science.nodes import (
    evaluate_model,
    split_data,
    train_model,
)


def create_pipeline(**kwargs) -> Dict[str, Pipeline]:
    return Pipeline(
        [
            node(
                func=split_data,
                inputs=["master_table", "params:test_size", "params:random_state"],
                outputs=["X_train", "X_test", "y_train", "y_test"],
            ),
            node(func=train_model, inputs=["X_train", "y_train"], outputs="regressor"),
            node(
                func=evaluate_model,
                inputs=["regressor", "X_test", "y_test"],
                outputs=None,
            ),
        ]
    )

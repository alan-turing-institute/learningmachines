
# 26/5/2020

Starting to sketch out requirements for what we will need from the analysts to run their models, and what we will provide.

## Analysts Provide (as much as possible):
- **Pre-trained model**
  - Previously passed repro-catalogue tests?
- **Script to run model predictions on (new) data:**
  - Configuration:
    - Environment, package versions etc. (yaml file or equivalent)
  - Script Input Parameters:
    - Start date, end date, data version
    - and/or database connection/query
  - Script Output:
    - Predictions
      - id, prediction, confidence
    - File as input to metrics script
- **Functions to calculate metrics based on predictions:**
    - Configuration:
      - Environment, package versions etc. (yaml file or equivalent)
    - Input parameters:
      - Predictions
      - True values
    - Metrics
      - Analyst-team defined
      - Monitoring team defined
    - Script Output:
      - Metrics
      - File or db?

## REG Model validation team provides:
- Visualisation of metrics for different runs (params)
- Changes with new model versions:
  - Logging of different predictions made by model versions on same data
  - Logging/tracking of different model versions.
- Changes with new data versions:
  - Performance on new data.
  - Logging of change in performance due to data corrections.
- Comparison of different models on the same question.

## Plan

- Me and Ed to separately make dummy models and versions of the scripts above on the UCI Wine Quality Dataset (https://archive.ics.uci.edu/ml/datasets/wine+quality) (white wine file).
- See what difficulties/challenges arise by then trying to integrate them with MLFlow/some other framework for monitoring purposes.

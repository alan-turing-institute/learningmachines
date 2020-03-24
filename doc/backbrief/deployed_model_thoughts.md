# Thoughts on deploying and retraining models

- Retrain regularly, maybe with a sliding window e.g. only using last 6 months of data
  - Check accuracy of new model (or other metrics).
  - Not hurt by old, irrelevant data if a suitable window chosen.
  - Still need a way to deal with any big jumps/changes in concept/data within the sliding window.

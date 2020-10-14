## ModMon - currently

Analysts provide:
- Pre-trained model
- Command + script to calculate metrics on a date range/database
  - Including accessing and preprocessing patient database in whatever way they like.
- Environment definition (conda/renv)
- Metrics file from model training (for reproducibility check)
- Metadata

ModMon provides:
- Check model results can be reproduced.
- Add model metadata and training metrics to the ModMon database.
- Setup code environment defined by analysts.
- Calculate metrics on a new date range/database (store results in database)
- Create simple reports of model performance across different date ranges/databases.
- Store and run multiple models for the same source dataset.

Note:
- Everything done on date range/database level - _not_ individual level.
- No predictions saved, only final metrics.
- No retraining.
- No/limited descriptive stats (can be integrated to some extent).

## ModMon - propose

- Keep ModMon at a _date range_ level for now, don't attempt to modify it to provide results for individuals.
- Ideally change the models to have (optionally) up to 3 commands:
  - Train (new):
    - Retrain the model for a new date range.
  - Predict (new):
    - Calculate predictions for all patients in a date range, and save them to a new _predictions_ table.
    - Not trivial (maybe not possible) to make this generalisable - different types of models have different predictions (e.g. single value, multiple classes, full distribution) - how will that work for database table schema?
  - Score (metrics as before)
- API to trigger ModMon commands.
- API to get results from ModMon databases when needed (e.g. for individual results)

## Toy Model - thoughts

- No descriptive stats for now?

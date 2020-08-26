## Create Environment

From the parent directory, should be enough just to do:
```
conda env create
```
Which will create an environment called `wine-lightgbm` as defined in `environment.yml`.

Or use this more explicit command:
```
conda env create -f environment.yml -n wine-lightgbm
```
The name passed to `-n` overwrite the name defined in `environment.yml`.

## Activate Environment

```
conda activate wine-lightgbm
```

### Create a new metrics file

Defined in `Makefile`. Note that files won't be regenerated correctly if `predictions.csv` or
`metrics.csv` already exist. These must be deleted first by running `make clean`. The
environment must also be activated before running these commands.

Full command:
```
make clean; make START_DATE=<start_date> END_DATE=<end_date> DATABASE=<database>
```
Replace `<start_date>`, `<end_date>` and `<database>` with appropriate values. Start and
end date should be dates in `%Y-%m-%d` format, and the year will be interpreted as the
row index. E.g. a `<start_date>` of `2500-1-1` will calculate the metrics starting from
row 2500. Database is not used.

### Deacticate Environment

```
conda deactivate
```
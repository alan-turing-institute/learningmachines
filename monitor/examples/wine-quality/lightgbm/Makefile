# Run as follows:
# Delete previous outputs:
#	make clean
# Calculate metrics between start and end idx:
#	make START_DATE=<start_date> END_DATE=<end_date> DATABASE=<database>

all: metrics.csv

predictions.csv:
	python predict.py --start_date $(START_DATE) --end_date $(END_DATE) --database $(DATABASE)

metrics.csv: predictions.csv
	python metrics.py

clean:
	rm -f metrics.csv
	rm -f predictions.csv
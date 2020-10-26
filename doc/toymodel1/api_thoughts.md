## Toy Model API Planning

### SEER database
```javascript
getPatients(int startYear, int endYear, int maxPatients) {
    // MonMon generates predictions for patients -> prediction table
    return [{"id":"87","yearOfDiagnosis":"1992-10-26T13:06:03.572Z","personalInfo":[{"name":"age","value":"7"}],"medicalHistory":[]},{"id":"34","yearOfDiagnosis":"1993-10-26T13:06:03.572Z","personalInfo":[{"name":"age","value":"7"}],"medicalHistory":[]},{"id":"49","yearOfDiagnosis":"1994-10-26T13:06:03.572Z","personalInfo":[{"name":"age","value":"7"}],"medicalHistory":[]},{"id":"15","yearOfDiagnosis":"1995-10-26T13:06:03.572Z","personalInfo":[{"name":"age","value":"0"}],"medicalHistory":[]},{"id":"42","yearOfDiagnosis":"1996-10-26T12:06:03.572Z","personalInfo":[{"name":"age","value":"5"}],"medicalHistory":[]},{"id":"43","yearOfDiagnosis":"1997-10-26T13:06:03.572Z","personalInfo":[{"name":"age","value":"7"}],"medicalHistory":[]},{"id":"29","yearOfDiagnosis":"1998-10-26T13:06:03.572Z","personalInfo":[{"name":"age","value":"1"}],"medicalHistory":[]},{"id":"81","yearOfDiagnosis":"1999-10-26T12:06:03.572Z","personalInfo":[{"name":"age","value":"1"}],"medicalHistory":[]},{"id":"69","yearOfDiagnosis":"2000-10-26T12:06:03.572Z","personalInfo":[{"name":"age","value":"4"}],"medicalHistory":[]},{"id":"24","yearOfDiagnosis":"2001-10-26T12:06:03.572Z","personalInfo":[{"name":"age","value":"9"}],"medicalHistory":[]},{"id":"50","yearOfDiagnosis":"2002-10-26T12:06:03.572Z","personalInfo":[{"name":"age","value":"2"}],"medicalHistory":[]},{"id":"3","yearOfDiagnosis":"2003-10-26T13:06:03.572Z","personalInfo":[{"name":"age","value":"5"}],"medicalHistory":[]},{"id":"44","yearOfDiagnosis":"2004-10-26T12:06:03.572Z","personalInfo":[{"name":"age","value":"7"}],"medicalHistory":[]},{"id":"87","yearOfDiagnosis":"2005-10-26T12:06:03.572Z","personalInfo":[{"name":"age","value":"5"}],"medicalHistory":[]},{"id":"35","yearOfDiagnosis":"2006-10-26T12:06:03.572Z","personalInfo":[{"name":"age","value":"7"}],"medicalHistory":[]},{"id":"3","yearOfDiagnosis":"2007-10-26T12:06:03.572Z","personalInfo":[{"name":"age","value":"9"}],"medicalHistory":[]},{"id":"98","yearOfDiagnosis":"2008-10-26T13:06:03.572Z","personalInfo":[{"name":"age","value":"2"}],"medicalHistory":[]},{"id":"22","yearOfDiagnosis":"2009-10-26T13:06:03.572Z","personalInfo":[{"name":"age","value":"8"}],"medicalHistory":[]},{"id":"96","yearOfDiagnosis":"2010-10-26T12:06:03.572Z","personalInfo":[{"name":"age","value":"3"}],"medicalHistory":[]},{"id":"99","yearOfDiagnosis":"2011-10-26T12:06:03.572Z","personalInfo":[{"name":"age","value":"5"}],"medicalHistory":[]},{"id":"83","yearOfDiagnosis":"2012-10-26T12:06:03.572Z","personalInfo":[{"name":"age","value":"9"}],"medicalHistory":[]},{"id":"47","yearOfDiagnosis":"2013-10-26T12:06:03.572Z","personalInfo":[{"name":"age","value":"2"}],"medicalHistory":[]},{"id":"55","yearOfDiagnosis":"2014-10-26T13:06:03.572Z","personalInfo":[{"name":"age","value":"9"}],"medicalHistory":[]},{"id":"71","yearOfDiagnosis":"2015-10-26T13:06:03.572Z","personalInfo":[{"name":"age","value":"2"}],"medicalHistory":[]},{"id":"13","yearOfDiagnosis":"2016-10-26T12:06:03.572Z","personalInfo":[{"name":"age","value":"6"}],"medicalHistory":[]}]
}

getYears():void{
    return [{"value":"1992","purpose":"unseen","icon":"circle","numberOfRows":74},{"value":"1993","purpose":"unseen","icon":"circle","numberOfRows":81},{"value":"1994","purpose":"unseen","icon":"circle","numberOfRows":26},{"value":"1995","purpose":"unseen","icon":"circle","numberOfRows":17},{"value":"1996","purpose":"unseen","icon":"circle","numberOfRows":52},{"value":"1997","purpose":"unseen","icon":"circle","numberOfRows":31},{"value":"1998","purpose":"unseen","icon":"circle","numberOfRows":89},{"value":"1999","purpose":"unseen","icon":"circle","numberOfRows":49},{"value":"2000","purpose":"unseen","icon":"circle","numberOfRows":84},{"value":"2001","purpose":"unseen","icon":"circle","numberOfRows":34},{"value":"2002","purpose":"unseen","icon":"circle","numberOfRows":51},{"value":"2003","purpose":"unseen","icon":"circle","numberOfRows":96},{"value":"2004","purpose":"unseen","icon":"circle","numberOfRows":68},{"value":"2005","purpose":"unseen","icon":"circle","numberOfRows":96},{"value":"2006","purpose":"unseen","icon":"circle","numberOfRows":9},{"value":"2007","purpose":"unseen","icon":"circle","numberOfRows":99},{"value":"2008","purpose":"unseen","icon":"circle","numberOfRows":75},{"value":"2009","purpose":"unseen","icon":"circle","numberOfRows":91},{"value":"2010","purpose":"unseen","icon":"circle","numberOfRows":97},{"value":"2011","purpose":"unseen","icon":"circle","numberOfRows":67},{"value":"2012","purpose":"unseen","icon":"circle","numberOfRows":41},{"value":"2013","purpose":"unseen","icon":"circle","numberOfRows":11},{"value":"2014","purpose":"unseen","icon":"circle","numberOfRows":90},{"value":"2015","purpose":"unseen","icon":"circle","numberOfRows":67},{"value":"2016","purpose":"unseen","icon":"circle","numberOfRows":2},{"value":"2017","purpose":"unseen","icon":"circle","numberOfRows":65}]
  }

 getDescriptiveStatistics(): void {
    return [{"id":"numCases","sizeClass":"autoSize","vis":"bar","title":"Dataset Size","data":[{"x":"1992","y":796},{"x":"1993","y":835},{"x":"1994","y":508},{"x":"1995","y":992},{"x":"1996","y":106},{"x":"1997","y":374},{"x":"1998","y":839},{"x":"1999","y":588},{"x":"2000","y":20},{"x":"2001","y":68},{"x":"2002","y":309},{"x":"2003","y":785},{"x":"2004","y":166},{"x":"2005","y":607},{"x":"2006","y":880},{"x":"2007","y":242},{"x":"2008","y":120},{"x":"2009","y":708},{"x":"2010","y":413},{"x":"2011","y":175},{"x":"2012","y":389},{"x":"2013","y":632},{"x":"2014","y":326},{"x":"2015","y":609},{"x":"2016","y":994},{"x":"2017","y":428}]},{"id":"numCases1","sizeClass":"autoSize","vis":"bar","title":"Dataset Size","data":[{"x":"1992","y":996},{"x":"1993","y":109},{"x":"1994","y":11},{"x":"1995","y":474},{"x":"1996","y":847},{"x":"1997","y":566},{"x":"1998","y":625},{"x":"1999","y":388},{"x":"2000","y":965},{"x":"2001","y":636},{"x":"2002","y":353},{"x":"2003","y":479},{"x":"2004","y":478},{"x":"2005","y":983},{"x":"2006","y":774},{"x":"2007","y":62},{"x":"2008","y":311},{"x":"2009","y":115},{"x":"2010","y":221},{"x":"2011","y":233},{"x":"2012","y":779},{"x":"2013","y":396},{"x":"2014","y":697},{"x":"2015","y":291},{"x":"2016","y":239},{"x":"2017","y":117}]}]
  }
```

### ModMon database

NOTE1: Calculating predictions, metrics and retraining takes some amount of time (especially retraining). There probably needs to be a concept of waiting/checking when things have finished running somewhere.

NOTE2 (for Jack mostly): Currently assuming there's always only one active model version in the ModMon database, and predictions/metrics only generated for that active model version. If storing results from multiple models/model versions then queries below will need to include filtering on modelid and modelversion fields in the database.

```javascript
// -----------------
// Utility functions
// -----------------

getDates(int startYear, int endYear) {
	start_date = "startYear-1-1";
 	end_date = "endYear-12-31";
	return start_date, end_date;
}

getDatasetID(int startYear, int endYear) {
	start_date, end_date = getDates(startYear, endYear);
	datasetid = query("SELECT datasetid FROM dataset WHERE start_date='start_date' AND end_date='end_date';");
	return datasetid;
}

// -----------------
// API functions
// -----------------

runPrediction(int startYear, int endYear) {
    start_date = "startYear-1-1";
    end_date = "endYear-12-31";
    call("modmon_predict --start_date start_date --end_date end_date");
    return true;
}

getPredictions(int startYear, int endYear, int maxPredictions) {
    datasetid = getDatasetID(startYear, endYear);
    if datasetid is NULL:
    	runPrediction(startYear, endYear);
	// wait for prediction to finish;
	datasetid = getDatasetID(startYear, endYear);

    predictions = query("SELECT recordid, values FROM prediction WHERE datasetid='datasetid' LIMIT maxPredictions;")
    return predictions;
    // [{recordid: 1, values: {"alive": 0.76, "cvd": 0.05, "cancer": 0.19}}]
}

runMetrics(int startYear, int endYear) {
    start_date, end_date = getDates(startYear, endYear);
    call("modmon_score --start_date start_date --end_date end_date");
    return true;
}
    
getMetrics(int startYear, int endYear) {
    datasetid = getDatasetID(startYear, endYear);
    if datasetid is NULL:
    	runMetrics(startYear, endYear);
	// wait for metrics to finish
	datasetid = getDatasetID(startYear, endYear);

    metrics = query("SELECT metric, value FROM score WHERE datasetid='datasetid';");
    return metrics;
    // [{"metric": "accuracy", "value": 0.92}, {"metric": "AUC", "value": 0.89}]
}

retrainModel(int startYear, int endYear) {
    start_date, end_date = getDates(startYear, endYear);
    call("modmon_retrain --start_date start_date --end_date end_date");
    return true;
}
```
---
```
getPerformanceData(): void { // this is the same as getMetrics?
    return {"id":"performanceVis","vis":"line","sizeClass":"fixedSize","title":"Model Performance","data":[{"x":"V.0","y":80},{"x":"2003","y":77},{"x":"2004","y":60},{"x":"2005","y":55},{"x":"V.1","y":81},{"x":"2006","y":79}]}
  }
```

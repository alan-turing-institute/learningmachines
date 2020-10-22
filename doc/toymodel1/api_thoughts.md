## Toy Model API Planning

### SEER database
```javascript
getPatients(int startYear, int endYear, int maxPatients) {
    // MonMon generates predictions for patients -> prediction table
    return [
        [{"id":"49","personalInfo":[{"name":"age","value":"7"},{"name":"yearOfDiagnosis","value":"1992"}],"medicalHistory":[]},{"id":"16","personalInfo":[{"name":"age","value":"2"},{"name":"yearOfDiagnosis","value":"1993"}],"medicalHistory":[]},{"id":"86","personalInfo":[{"name":"age","value":"3"},{"name":"yearOfDiagnosis","value":"1994"}],"medicalHistory":[]},{"id":"54","personalInfo":[{"name":"age","value":"4"},{"name":"yearOfDiagnosis","value":"1995"}],"medicalHistory":[]},{"id":"10","personalInfo":[{"name":"age","value":"10"},{"name":"yearOfDiagnosis","value":"1996"}],"medicalHistory":[]},{"id":"69","personalInfo":[{"name":"age","value":"8"},{"name":"yearOfDiagnosis","value":"1997"}],"medicalHistory":[]},{"id":"85","personalInfo":[{"name":"age","value":"1"},{"name":"yearOfDiagnosis","value":"1998"}],"medicalHistory":[]},{"id":"92","personalInfo":[{"name":"age","value":"6"},{"name":"yearOfDiagnosis","value":"1999"}],"medicalHistory":[]},{"id":"66","personalInfo":[{"name":"age","value":"3"},{"name":"yearOfDiagnosis","value":"2000"}],"medicalHistory":[]},{"id":"76","personalInfo":[{"name":"age","value":"6"},{"name":"yearOfDiagnosis","value":"2001"}],"medicalHistory":[]},{"id":"39","personalInfo":[{"name":"age","value":"2"},{"name":"yearOfDiagnosis","value":"2002"}],"medicalHistory":[]},{"id":"3","personalInfo":[{"name":"age","value":"4"},{"name":"yearOfDiagnosis","value":"2003"}],"medicalHistory":[]},{"id":"54","personalInfo":[{"name":"age","value":"6"},{"name":"yearOfDiagnosis","value":"2004"}],"medicalHistory":[]},{"id":"32","personalInfo":[{"name":"age","value":"6"},{"name":"yearOfDiagnosis","value":"2005"}],"medicalHistory":[]},{"id":"95","personalInfo":[{"name":"age","value":"7"},{"name":"yearOfDiagnosis","value":"2006"}],"medicalHistory":[]},{"id":"69","personalInfo":[{"name":"age","value":"3"},{"name":"yearOfDiagnosis","value":"2007"}],"medicalHistory":[]},{"id":"83","personalInfo":[{"name":"age","value":"1"},{"name":"yearOfDiagnosis","value":"2008"}],"medicalHistory":[]},{"id":"9","personalInfo":[{"name":"age","value":"10"},{"name":"yearOfDiagnosis","value":"2009"}],"medicalHistory":[]},{"id":"27","personalInfo":[{"name":"age","value":"3"},{"name":"yearOfDiagnosis","value":"2010"}],"medicalHistory":[]},{"id":"5","personalInfo":[{"name":"age","value":"1"},{"name":"yearOfDiagnosis","value":"2011"}],"medicalHistory":[]},{"id":"30","personalInfo":[{"name":"age","value":"9"},{"name":"yearOfDiagnosis","value":"2012"}],"medicalHistory":[]},{"id":"74","personalInfo":[{"name":"age","value":"4"},{"name":"yearOfDiagnosis","value":"2013"}],"medicalHistory":[]},{"id":"63","personalInfo":[{"name":"age","value":"9"},{"name":"yearOfDiagnosis","value":"2014"}],"medicalHistory":[]},{"id":"7","personalInfo":[{"name":"age","value":"9"},{"name":"yearOfDiagnosis","value":"2015"}],"medicalHistory":[]},{"id":"19","personalInfo":[{"name":"age","value":"0"},{"name":"yearOfDiagnosis","value":"2016"}],"medicalHistory":[]}]
}

getYears():void{
    return [{"value":"1992","purpose":"unseen","icon":"circle","numberOfRows":74},{"value":"1993","purpose":"unseen","icon":"circle","numberOfRows":81},{"value":"1994","purpose":"unseen","icon":"circle","numberOfRows":26},{"value":"1995","purpose":"unseen","icon":"circle","numberOfRows":17},{"value":"1996","purpose":"unseen","icon":"circle","numberOfRows":52},{"value":"1997","purpose":"unseen","icon":"circle","numberOfRows":31},{"value":"1998","purpose":"unseen","icon":"circle","numberOfRows":89},{"value":"1999","purpose":"unseen","icon":"circle","numberOfRows":49},{"value":"2000","purpose":"unseen","icon":"circle","numberOfRows":84},{"value":"2001","purpose":"unseen","icon":"circle","numberOfRows":34},{"value":"2002","purpose":"unseen","icon":"circle","numberOfRows":51},{"value":"2003","purpose":"unseen","icon":"circle","numberOfRows":96},{"value":"2004","purpose":"unseen","icon":"circle","numberOfRows":68},{"value":"2005","purpose":"unseen","icon":"circle","numberOfRows":96},{"value":"2006","purpose":"unseen","icon":"circle","numberOfRows":9},{"value":"2007","purpose":"unseen","icon":"circle","numberOfRows":99},{"value":"2008","purpose":"unseen","icon":"circle","numberOfRows":75},{"value":"2009","purpose":"unseen","icon":"circle","numberOfRows":91},{"value":"2010","purpose":"unseen","icon":"circle","numberOfRows":97},{"value":"2011","purpose":"unseen","icon":"circle","numberOfRows":67},{"value":"2012","purpose":"unseen","icon":"circle","numberOfRows":41},{"value":"2013","purpose":"unseen","icon":"circle","numberOfRows":11},{"value":"2014","purpose":"unseen","icon":"circle","numberOfRows":90},{"value":"2015","purpose":"unseen","icon":"circle","numberOfRows":67},{"value":"2016","purpose":"unseen","icon":"circle","numberOfRows":2},{"value":"2017","purpose":"unseen","icon":"circle","numberOfRows":65}]
  }

 getDescriptiveStatistics(): void {
    return [{"id":"numCases","sizeClass":"autoSize","vis":"bar","title":"Dataset Size","data":[{"x":"1992","y":796},{"x":"1993","y":835},{"x":"1994","y":508},{"x":"1995","y":992},{"x":"1996","y":106},{"x":"1997","y":374},{"x":"1998","y":839},{"x":"1999","y":588},{"x":"2000","y":20},{"x":"2001","y":68},{"x":"2002","y":309},{"x":"2003","y":785},{"x":"2004","y":166},{"x":"2005","y":607},{"x":"2006","y":880},{"x":"2007","y":242},{"x":"2008","y":120},{"x":"2009","y":708},{"x":"2010","y":413},{"x":"2011","y":175},{"x":"2012","y":389},{"x":"2013","y":632},{"x":"2014","y":326},{"x":"2015","y":609},{"x":"2016","y":994},{"x":"2017","y":428}]},{"id":"numCases1","sizeClass":"autoSize","vis":"bar","title":"Dataset Size","data":[{"x":"1992","y":996},{"x":"1993","y":109},{"x":"1994","y":11},{"x":"1995","y":474},{"x":"1996","y":847},{"x":"1997","y":566},{"x":"1998","y":625},{"x":"1999","y":388},{"x":"2000","y":965},{"x":"2001","y":636},{"x":"2002","y":353},{"x":"2003","y":479},{"x":"2004","y":478},{"x":"2005","y":983},{"x":"2006","y":774},{"x":"2007","y":62},{"x":"2008","y":311},{"x":"2009","y":115},{"x":"2010","y":221},{"x":"2011","y":233},{"x":"2012","y":779},{"x":"2013","y":396},{"x":"2014","y":697},{"x":"2015","y":291},{"x":"2016","y":239},{"x":"2017","y":117}]}]
  }
```

### ModMon database
```
runPrediction(int startYear, int endYear) {
    // MonMon generates predictions for patients in year -> prediction table
    return true;
}

getPredictions(int startYear, int endYear, int maxPredictions, [optional: modelID]) {
    // query ModMon dataset table -> get dataset ID for startYear and endYear
    // if dataset exists:
        // query Predictions table -> get all predictions values for that dataset ID
	// else
        // run Modmon to generate predictions
        //  get all predictions from predictions table for generated dataset ID	
    return {
        data: {[patient: {prediction: B, uncertaintyValue: 0.9}]}
    }
}

runMetrics(int startYear, int endYear) {
    // MonMon generates metrics for patients in year -> metrics table
    return true;
}
    
getMetrics(int startYear, int endYear, [optional: int modelID]) {
    // query ModMon dataset table -> get dataset ID for startYear and endYear
    // if dataset exists:
        // query Metrics table -> get all metrics values for that dataset ID
	// else
        // run Modmon to generate metrics
        // get all metrics from metrics table for generated dataset ID
    return {data: {"accuracy": 0.92, "auc": 0.82}	}
}

retrainModel(int startYear, int endYear, [optional: modelID]) {
             // run retraining command for all models/model defined by modelID
}

(this is the same as getMetrics?)
  getPerformanceData(): void {
    return {"id":"performanceVis","vis":"line","sizeClass":"fixedSize","title":"Model Performance","data":[{"x":"V.0","y":80},{"x":"2003","y":77},{"x":"2004","y":60},{"x":"2005","y":55},{"x":"V.1","y":81},{"x":"2006","y":79}]}
  }
```

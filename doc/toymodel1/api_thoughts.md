## Toy Model API Planning
## 12th Oct 2020

```javascript
getPatients(int startYear, int endYear, int maxPatients) {
    // MonMon generates predictions for patients -> prediction table
    return {
        data: {[patient1:{age:23, gender m}, patient2:{age:43, gender:F}]
    }
}
    
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
```

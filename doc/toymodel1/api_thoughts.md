## Toy Model API Planning
## 12th Oct 2020

```javascript
getPatients(int startYear, int endYear, int maxPatients) {
    // MonMon generates predictions for patients -> prediction table
    return [
        { id: '1', 
        personalInfo: [
          {property: 'age', value:'16'}
        ],
        medicalHistory: []
      },
      { id: '2', 
        personalInfo: [
          {property: 'age', value:'16'}
        ],
        medicalHistory: []
      },
      { id: '3', 
        personalInfo: [
          {property: 'age', value:'16'}
        ],
        medicalHistory: []
      },
      { id: '4', 
        personalInfo: [
          {property: 'age', value:'16'}
        ],
        medicalHistory: []
      },
      { id: '5', 
        personalInfo: [
          {property: 'age', value:'16'}
        ],
        medicalHistory: []
      },
      { id: '6', 
        personalInfo: [
          {property: 'age', value:'16'}
        ],
        medicalHistory: []
      }
    ]
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
``` javascript
getYears():void{
    let yearsSelection = []
    for (let y = 1992; y <=2017; y++)
    {
      this.yearsSelection.push({value: y.toString(), 
        purpose: 'unseen', 
        icon: 'circle',
        numberOfRows: Math.round(Math.random()*100)}
      )
    }
    return yearsSelection
  }

  getPerformanceData(): void {
    let performance = {
      id: "performanceVis", 
      vis: "line",
      sizeClass:"fixedSize", 
      title: "Model Performance",
      data: [{x:'V.0', y:80}, 
      {x:'2003', y:77}, 
      {x:'2004', y:60},
      {x:'2005', y:55},
      {x:'V.1', y:81},
      {x:'2006', y:79},
    ]}
    return performance
  }

  getDescriptiveStatistics(): void {
    let descriptiveStatistics = [
      { id: "numCases", 
        sizeClass: "autoSize",
        vis: "bar", 
        title: "Dataset Size",
        data: []
      },
      {id: "numCases1", 
      sizeClass: "autoSize",
      vis: "bar", 
        title: "Dataset Size",
        data: []
      }
    ]
    descriptiveStatistics = descriptiveStatistics.map(function(element){
      for (let y = 1992; y <=2017; y++)
        element.data.push({x:y.toString(), y:Math.round(Math.random()*1000)})
      return element
    })
  }
```
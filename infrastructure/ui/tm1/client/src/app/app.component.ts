import { Component } from '@angular/core';
import { DataView } from './vis/chartSpecification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  performance:DataView = this.getPerformanceData()
  title = 'toymodel0';

  getPerformanceData(): DataView {
    let performance:DataView = {id: "performanceVis", 
        vis: "line", 
        title: "Model Performance",
        data: [{x:'V.0', y:80}, 
          {x:'2003', y:77}, 
          {x:'2004', y:60},
          {x:'2005', y:55},
          {x:'V.1', y:81},
          {x:'2006', y:79},
        ]
      }
    return performance
  }
}



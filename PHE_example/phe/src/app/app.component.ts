import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Chart } from 'chart.js';
declare var require: any

const axios = require("axios");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title:string = 'phe';
  

  constructor(private dataService: DataService) {
    this.dataService = dataService
  }

  ngOnInit() {
    this.dataService.printHello()
    const getData = async() => {
      const
          AreaType = "ltla",
          AreaName = "Horsham";
  
      
      var filters = [
          `areaType=${ AreaType }`,
          `areaName=${ AreaName }`
        ],
        structure = {
          date: "date",
          newCases:"newCasesBySpecimenDate",
          cumCases:"cumCasesBySpecimenDate"
      };
  
      
      var apiParams = {
          filters: filters.join(";"),
          structure: JSON.stringify(structure),
          // latestBy: "newCasesByPublishDate"
      };
  
      const result = await this.dataService.getData(apiParams);
      console.log(JSON.stringify(result));
    }
    getData()
  }
}



import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';


type newCases = "newCasesBySpecimenDate" | "newCasesByPublishDate"
type cumCases = "cumCasesBySpecimenDate" | "cumCasesByPublishDate"
type areaName = "Horsham" | "Crawley" | "Ipswich" | "Birmingham" | "Leicester" | "England"
type areaCode = "E10000032"
type areaType = "utla" | "ltla" | "nation"

interface requestStructure {
  date: string,
  newCases:string,
  cumCases:string
}

interface caseResponseStructure {
  date: string,
  newCases:number,
  cumCases:number
}

interface genderResponseStructure {
  age:string, value: number, rate: number
}
interface ageResponseStructure {
  date: string,
  male:Array<genderResponseStructure>,
  female:Array<genderResponseStructure>,
}

interface params {
  filters: string,
  structure:string,
}

interface response {
  length: number,
  maxPageLimit:number,
  data:Array<caseResponseStructure> | Array<ageResponseStructure>
}

interface value {
  name: string,
  value: number
}

interface chartDataFormat {
  name: string,
  series: Array<value>
} 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 

export class AppComponent {
  title:string = 'Horsham COVID-19 Case Tracker';
  newCasesData: chartDataFormat[];
  ageCasesData: chartDataFormat[];
  view: any[] = [1500, 300];
  
  // options
  legend: boolean = true;
  legendTitle: string = "Area Names"
  ageLegendTitle: string = "Age"
  legendPosition: string = "right"
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Number of Cases';
  xAxisLabelAge: string = "Age"
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private dataService: DataService) {
    this.dataService = dataService
  }

  ngOnInit() {
    let areasOfInterest:Array<{areaType, areaName}> = [
      {areaType:"ltla", areaName:"Horsham"},
      // {areaType:"ltla", areaName:"Ipswich"},
      {areaType:"ltla", areaName:"Crawley"},
      {areaType:"ltla", areaName:"Adur"},
      {areaType:"ltla", areaName:"Arun"},
      {areaType:"ltla", areaName:"Mid Sussex"},
      {areaType:"ltla", areaName:"Chichester"},
      {areaType:"ltla", areaName:"Worthing"},
      {areaType:"utla", areaName:"West Sussex"}] 
    this.updateCasesData(areasOfInterest)
    this.updateAgeData()
  }

  constructParamsByName (areaType:areaType, areaName: areaName) 
  {
    var filters:Array<string> = [
            `areaType=${ areaType }`,
            `areaName=${ areaName }`
          ]
  
    var structure:requestStructure= {
            date: "date",
            newCases:"newCasesBySpecimenDate",
            cumCases:"cumCasesBySpecimenDate"
          } 
        
    var apiParams:params = {
        filters: filters.join(";"),
        structure: JSON.stringify(structure),
        // latestBy: "newCasesByPublishDate"
    };  
    return apiParams
  }      

  async updateCasesData(areasOfInterest:Array<{areaType, areaName}>) {
    let areas:Array<chartDataFormat> = []
    for (var areaIndex = 0; areaIndex < areasOfInterest.length; areaIndex++) {
      let response:response = await this.dataService.getData(this.constructParamsByName(areasOfInterest[areaIndex].areaType,areasOfInterest[areaIndex].areaName));
      areas.push({name: areasOfInterest[areaIndex].areaName, series:[]})
      for (var day = response.length-1; day >= 0; day--){
        let caseResponseOnDay:caseResponseStructure = <caseResponseStructure>response.data[day]
        areas[areas.length-1].series.push({name:caseResponseOnDay.date, value:caseResponseOnDay.newCases})
      }
    }
    this.newCasesData = []
    this.newCasesData = areas
    // console.log(this.newCasesData)
  }

  async updateAgeData() {
    let ages:Array<chartDataFormat> = []
    let response:response = await this.dataService.getData({filters: "areaType=nation;areaName=England", structure: "{\"date\":\"date\",\"male\":\"maleCases\",\"female\":\"femaleCases\"}"});  
    let genderData:ageResponseStructure = <ageResponseStructure>response.data[0]
    let maleData:Array<genderResponseStructure> = genderData.male
    let femaleData:Array<genderResponseStructure> = genderData.female
    let sortedAgeBins = ["0_to_4", "5_to_9",
    "10_to_14", "15_to_19",
    "20_to_24", "25_to_29",
    "30_to_34", "35_to_39",
    "40_to_44", "45_to_49",
    "50_to_54", "55_to_59",
    "60_to_64", "65_to_69",
    "70_to_74", "75_to_79",
    "80_to_84", "85_to_89",
    "90+",
  ]
    for (var bin = 0; bin < sortedAgeBins.length; bin++){
      ages.push({name: sortedAgeBins[bin], series:[]})
    }
    
    ages.forEach(ageBin => {
      let maleRate = maleData.filter(bin => {
        return bin.age == ageBin.name
      })
      ageBin.series.push({name:"male", value:maleRate[0].rate}) 
      
      let femaleRate = femaleData.filter(bin => {
        return bin.age == ageBin.name
      })
      ageBin.series.push({name:"female", value:femaleRate[0].rate}) 
    });

    this.ageCasesData = []
    this.ageCasesData = Object.assign(this.ageCasesData,ages)

    console.log(this.ageCasesData)
  }

  
}


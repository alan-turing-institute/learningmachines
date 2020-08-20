import { Injectable } from '@angular/core';
declare var require: any

const axios = require("axios");

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  printHello() {
    console.log("Hello World")
  }
  
  public getData = async ( queries={} )=> {
    console.log(queries)
    const endpoint = 'https://api.coronavirus.data.gov.uk/v1/data';
    const { data, status, statusText } = await axios.get(endpoint, { 
        params: queries,
        timeout: 10000 
    });

    if ( status >= 400 )
        throw new Error(statusText);
    return data
  };  // getData

}

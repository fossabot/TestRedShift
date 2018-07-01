import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interval, FindBetween, FindBetweenResult, GenericData, Country, Movement } from '../classes/interval';

import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 

@Injectable() 
export class PeriodService {

  private periodApi: string = 'api/Period/';
  constructor(private http:HttpClient) {
  }

  
  getData(): Observable<Interval<number>> {
    const url = environment.urlApi +  this.periodApi + 'Periods';
    
    return this.http.get<Interval<number>>(url);
    
  }
  findData(f :FindBetween ):Observable<FindBetweenResult[]>{

    const url = environment.urlApi +  this.periodApi + 'Find';    
    //window.alert(JSON.stringify(f));
    return this.http.post<FindBetweenResult[]>(url, f,httpOptions);

  }
  findCountries():Observable<Country[]>{
    const url = environment.urlApi +  this.periodApi + 'countries';    
    return this.http.get<Country[]>(url);
  }
  findMovements():Observable<Movement[]>{ 
    const url = environment.urlApi +  this.periodApi + 'movements';    
    return this.http.get<Movement[]>(url);
  }
}

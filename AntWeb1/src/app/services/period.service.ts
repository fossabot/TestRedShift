import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interval, FindBetween, FindBetweenResult } from '../classes/interval';

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

    const url = environment.urlApi +  this.periodApi + 'Find/'+ f.fromDate + '/'+ f.toDate ;    
    
    return this.http.get<FindBetweenResult[]>(url);

  }
}

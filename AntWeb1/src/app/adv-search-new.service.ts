import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { NewCountry } from './NewCountry';
import { FindBetweenResult, GenericData } from './classes/interval';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AdvSearchNewService {

  private urlAPI: string = 'api/NewData/';
  constructor(private http:HttpClient) { }

  public GetCountry(id: number): Observable<NewCountry[]>{
    let url = environment.urlApi +  this.urlAPI + 'GetCountry';    
    if(id != 0){
      url+='/'+id;
    }
    return this.http.get<NewCountry[]>(url);
  }
  public GetAuthorsNewCountry(id:number):Observable<FindBetweenResult[]>{
    let url = environment.urlApi +  this.urlAPI + 'GetAuthorsNewCountry';    
    if(id != 0){
      url+='/'+id;
    }
    return this.http.get<FindBetweenResult[]>(url);
  }
  public GetParent(id:number): Observable<GenericData[]>{
    let url= environment.urlApi +  this.urlAPI + 'getparent/'+id;
    return this.http.get<GenericData[]>(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
class NewCountry{
  public numberAuthors:number ;
  public  id :number;
  public name:string; 
  public idParent :number;
}
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
}

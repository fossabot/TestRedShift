import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from './topic';
import { environment } from 'src/environments/environment';
import { FindBetweenResult } from './classes/interval';

@Injectable({
  providedIn: 'root'
})
export class AdvfindService {
  private periodApi: string = 'api/Period/';
  constructor(private http:HttpClient) { }

  public getTopics(): Observable<Topic[]>{
    const url = environment.urlApi +  this.periodApi + 'FindTopics';
    
    return this.http.get<Topic[]>(url);
  }

  public FindAdvanced(id:number) : Observable<FindBetweenResult[]> {
    const url = environment.urlApi +  this.periodApi + 'FindAdvanced/'+ id;
    
    return this.http.get<FindBetweenResult[]>(url);
  }
}

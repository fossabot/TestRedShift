import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from './topic';
import { environment } from 'src/environments/environment';
import { FindBetweenResult } from './classes/interval';
import { Specialization } from './Specialization';

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
  public FindAdvancedTopic(idTopic:Array<number>) : Observable<FindBetweenResult[]> {
    idTopic= idTopic || [];
    const tops=idTopic.join("-");
    const url = environment.urlApi +  this.periodApi + 'FindAdvanced/'+ tops+'/0' ;
    return this.http.get<FindBetweenResult[]>(url);
  }

  public FindAdvanced(idTopic:number, idSpec : number) : Observable<FindBetweenResult[]> {
    idTopic= idTopic || 0;
    idSpec =idSpec || 0;
    const url = environment.urlApi +  this.periodApi + 'FindAdvanced/'+ idTopic +'/'+idSpec;
    return this.http.get<FindBetweenResult[]>(url);
  }
  public getSpecializations():Observable<Specialization[]>{
    const url = environment.urlApi +  this.periodApi + 'findspecializations';
    
    return this.http.get<Specialization[]>(url);
  } 
}

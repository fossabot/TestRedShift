import { Injectable } from '@angular/core';
import { FindBetweenResult } from './classes/interval';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoundResultsService {

  private s=new Subject<FindBetweenResult[]>();
  constructor() { 

  }
  public  NextRest(res:FindBetweenResult[]){
    this.s.next(res);
  }
  public Obs():Observable<FindBetweenResult[]>{
    return this.s.asObservable();
  }


}

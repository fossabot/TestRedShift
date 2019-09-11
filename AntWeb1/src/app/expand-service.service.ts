import { Injectable } from '@angular/core';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { GenericData } from './classes/interval';
import { debounceTime, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpandServiceService {
  
  public s : Observable<GenericData>;
  private sg:ReplaySubject<GenericData> ;
  constructor() { 
    this.sg=new  ReplaySubject<GenericData>(20);
    this.s=this.sg.asObservable();    
  }
  public  nextG(g:GenericData){    
    this.sg.next(g);    
    
  }
  public completeFrom(i:number){
    
    while(i<20){
      i++;
      this.sg.next(null);
    }
    
  }
}

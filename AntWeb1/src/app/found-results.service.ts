import { Injectable } from '@angular/core';
import { FindBetweenResult } from './classes/interval';
import { Subject, Observable } from 'rxjs';
import { TodoItemFlatNode } from './adv-search/TodoItemFlatNode';

@Injectable({
  providedIn: 'root'
})
export class FoundResultsService {

  private s=new Subject<FindBetweenResult[]>();

  private whatToFind=new Subject<TodoItemFlatNode[]>();

  constructor() { 

  }
  public  NextRest(res:FindBetweenResult[]){
    this.s.next(res);
  }
  public Obs():Observable<FindBetweenResult[]>{
    return this.s.asObservable();
  }


  public  NextFind(res:TodoItemFlatNode[]){
    this.whatToFind.next(res);
  }
  public ObsFind():Observable<TodoItemFlatNode[]>{
    return this.whatToFind.asObservable();
  }


}

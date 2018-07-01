import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class ChangeYears {
  public from: string;
  public dateFrom: number | null;
  public dateTo: number | null;
}
@Injectable({
  providedIn: 'root'
})
export class ChangedDatesService {

  private changedYears = new Subject<ChangeYears>();
  private data=new  Map<string,ChangeYears>();
  // Observable string streams
  changedYears$ = this.changedYears.asObservable();
  constructor() { }

  public AnnouncechangeYears(c: ChangeYears) {
    console.log('announce');
    this.data.set(c.from,c);
    this.changedYears.next(c);
  }
  public ChangeYearMin():ChangeYears{
    var c=new ChangeYears();
    c.from = "ChangedDataService";
    c.dateFrom  =Math.max(... Array.from(this.data.values()).map(it=>it.dateFrom));
    c.dateTo=Math.max(... Array.from(this.data.values()).map(it=>it.dateTo));
    return c;
  }
}
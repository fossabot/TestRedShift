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

  // Observable string streams
  changedYears$ = this.changedYears.asObservable();
  constructor() { }

  public AnnouncechangeYears(c: ChangeYears) {
    console.log('announce');
    this.changedYears.next(c);
  }
}
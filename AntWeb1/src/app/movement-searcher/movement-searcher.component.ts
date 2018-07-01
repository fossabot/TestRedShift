import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PeriodService } from '../services/period.service';
import { GenericData, Country, Movement } from '../classes/interval';
import { FormControl } from '@angular/forms';
import { startWith, map, every } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ChangedDatesService, ChangeYears } from '../services/changed-dates.service';


@Component({
  selector: 'app-movement-searcher',
  templateUrl: './movement-searcher.component.html',
  styleUrls: ['./movement-searcher.component.css']
})
export class MovementSearcherComponent implements OnInit {

  private changeYears: ChangeYears;
  
  public movements: Array<Movement>;
  public myControl = new FormControl();
  public filteredOptions: Observable<GenericData[]>;
  @Output() itemSelectedEmit = new EventEmitter<Movement>();
  constructor(private ps: PeriodService, private notifyChanged: ChangedDatesService) {

    this.notifyChanged.changedYears$.subscribe(it => {
      console.log('received movement' + it.from);
      if (it.from != this.constructor.name) {

        this.changeYears = it;
        console.log('movement' + this.movements.length + JSON.stringify(this.changeYears || {})) 
        this.movements.every(it=>it.canBeSelected = true);
        if (this.changeYears != null && this.changeYears.dateFrom != null) {
           this.movements.filter(it => this.changeYears.dateFrom > it.toDate).forEach(it =>{
            
            it.canBeSelected=false;
           });
        }
        if (this.changeYears != null && this.changeYears.dateTo != null) {
          this.movements.filter(it => this.changeYears.dateTo < it.fromDate  ).forEach(it=>it.canBeSelected=false);
        }
        
      }
    }
    );

  }


  ngOnInit() {



    this.ps.findMovements()
      .subscribe(
        it => {
          this.movements = it.sort((a, b) => a.name.localeCompare(b.name));          
          this.movements.forEach(it=>it.canBeSelected=true);
          this.filteredOptions = this.myControl.valueChanges
            .pipe(
              startWith<string | Country>(''),
              map(value => typeof value === 'string' ? value : value.name),
              map(name => name ? this._filter(name) : this.movements.slice())
            );
          //window.alert(it.length);
        }
      )
  }
  public itemSelected(t: Movement) {

    if (t == null) {
      this.itemSelectedEmit.emit(new Movement());
    }
    else {

      this.itemSelectedEmit.emit(t);
    }

  }
  public displayFn(c?: Movement): string | undefined {
    return c ? c.name + " " + c.fromDate + " - " + c.toDate : undefined;
  }
  private _filter(value: string): Movement[] {
    const filterValue = (value || '').toLowerCase();
    console.log(' in filter ' + this.movements.length);
    var ret = this.movements.filter(option => option.name.toLowerCase().includes(filterValue));
    
    return ret;
  }


}

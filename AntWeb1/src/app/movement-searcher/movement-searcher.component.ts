import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PeriodService } from '../services/period.service';
import { GenericData, Country, Movement } from '../classes/interval';
import { FormControl } from '@angular/forms';
import { startWith, map, every } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-movement-searcher',
  templateUrl: './movement-searcher.component.html',
  styleUrls: ['./movement-searcher.component.css']
})
export class MovementSearcherComponent implements OnInit {

  public movements:Array<Movement>;
  public myControl = new FormControl();
  public filteredOptions:Observable<GenericData[]>;
  @Output() itemSelectedEmit = new EventEmitter<Movement>();
  constructor(private ps : PeriodService) { }
  
  ngOnInit() {
    
    

    this.ps.findMovements()
      .subscribe(
      it=>{
        this.movements = it.sort((a,b)=>a.name.localeCompare(b.name));  
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
  public itemSelected(t:Movement){
    if(t== null){
      this.itemSelectedEmit.emit(new Movement());
    }
    else{
      this.itemSelectedEmit.emit(t);
    }
    
  }
  public displayFn(c?: Movement): string | undefined {
    return c ? c.name : undefined;
  }
  private _filter(value: string): Movement[] {
    const filterValue = (value||'').toLowerCase();

    return this.movements.filter(option => option.name.toLowerCase().includes(filterValue));
  }


}

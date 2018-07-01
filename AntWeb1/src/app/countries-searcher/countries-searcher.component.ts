import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PeriodService } from '../services/period.service';
import { GenericData, Country } from '../classes/interval';
import { FormControl } from '@angular/forms';
import { startWith, map, every } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ChangedDatesService, ChangeYears } from '../services/changed-dates.service';

@Component({
  selector: 'app-countries-searcher',
  templateUrl: './countries-searcher.component.html',
  styleUrls: ['./countries-searcher.component.css']
})
export class CountriesSearcherComponent implements OnInit {
  
  private changeYears :ChangeYears;
  public countries:Array<Country>;
  public myControl = new FormControl();
  public filteredOptions:Observable<GenericData[]>;
  @Output() countrySelected = new EventEmitter<Country>();
  constructor(private ps : PeriodService, private notifyChanged: ChangedDatesService) { 
    
    this.notifyChanged.changedYears$.subscribe(res=>{
      console.log('received at CountriesSearcherComponent ' +JSON.stringify(res));
      
      if(res.from != 'CountriesSearcherComponent')
          this.changeYears = res;
          this.countries.every(it=>it.canBeSelected = true);
        if (this.changeYears != null && this.changeYears.dateFrom != null) {
           this.countries.filter(it => this.changeYears.dateFrom > it.toDate).forEach(it =>{
            console.log(it.fromDate);
            it.canBeSelected=false;
           });
        }
        if (this.changeYears != null && this.changeYears.dateTo != null) {
          this.countries.filter(it => this.changeYears.dateTo < it.fromDate  ).forEach(it=>it.canBeSelected=false);
        }
      }
    );

  }
  
  ngOnInit() {
    
    

    this.ps.findCountries()
      .subscribe(
      it=>{
        this.countries = it.sort((a,b)=>a.name.localeCompare(b.name));  
        this.countries.forEach(it=>it.canBeSelected = true);
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
              startWith<string | Country>(''),
              map(value => typeof value === 'string' ? value : value.name),
              map(name => name ? this._filter(name) : this.countries.slice()) 
            );
        //window.alert(it.length);
      }
    )
  }
  public itemSelected(t:Country){
    var c :Country ;
    if(t== null){
      c=new Country();
    }
    else{
      c=t;
    }
    this.countrySelected.emit(c);
    var cy=new ChangeYears();
    cy.from = 'CountriesSearcherComponent';
    cy.dateFrom = c.fromDate;
    cy.dateTo = c.toDate;
    this.notifyChanged.AnnouncechangeYears(cy);
  }
  public displayFn(c?: Country): string | undefined {
    return c ?  c.name + " "  + c.fromDate + " - " + c.toDate : undefined;
  }
  private _filter(value: string): Country[] {
    const filterValue = (value||'').toLowerCase();

    return this.countries.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}

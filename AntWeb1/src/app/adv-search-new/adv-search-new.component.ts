import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdvSearchNewService } from '../adv-search-new.service';
import { NewCountry } from '../NewCountry';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';
class FoundCountry{
  constructor(){
    this.ids=[];
  }
  name: string;
  ids: Array<number>;

}
@Component({
  selector: 'app-adv-search-new',
  templateUrl: './adv-search-new.component.html',
  styleUrls: ['./adv-search-new.component.css']
})
export class AdvSearchNewComponent implements OnInit {
  FoundCountries: Map< string, FoundCountry>;

  nrResultsCountries: number;
  //folders: NewCountry[];
  constructor(private  adv: AdvSearchNewService) {
    this.FoundCountries=new Map<string,FoundCountry>();
   }

  ngOnInit() {
  //    this.adv.GetCountry(0).subscribe(it=>this.folders=it);
  const searchBox = document.getElementById('textSearch');
  const typeahead = fromEvent(searchBox, 'input').pipe(
    map((e: any) => e.currentTarget.value),
    filter(text => text.length > 4),
    debounceTime(3*1000),
    distinctUntilChanged(),  
    switchMap(it=>this.adv.SearchCountryFromKingdoms(it))

  );
  
  typeahead.subscribe(data => {
   // Handle the data from the API
   console.log('changed' + data.length);
   this.nrResultsCountries = data.length;
   
   this.FoundCountries.clear();
   data.map(it=>{
     var name=it.name.trim();
      if(!this.FoundCountries.has(name)){
        var f=new FoundCountry();
        f.name = name;
        this.FoundCountries.set(name,f);
        
      }
      this.FoundCountries.get(name).ids.push(it.id);
      
   });
   console.log('nr:' + this.FoundCountries.size);
  });

  }
  
  
}

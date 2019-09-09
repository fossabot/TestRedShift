import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdvSearchNewService } from '../adv-search-new.service';
import { NewCountry } from '../NewCountry';
import { map, filter, debounceTime, distinctUntilChanged, switchMap, concatMap, delay } from 'rxjs/operators';
import { fromEvent, from, Observable, concat, of } from 'rxjs';
import { GenericData } from '../classes/interval';

class FoundCountry{
  constructor(){
    this.ids=new Map<number,boolean>();
    this.names=new Map<number,GenericData[]>();
  }
  name: string;
  ids: Map<number,boolean>;
  names:Map<number,GenericData[]>;
  public AddId(id: number){
      this.ids.set(id,false);
    
      
  }
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
   menuOpened(f: FoundCountry){
     console.log('open'+f.name);
     var arr=Array.from(f.ids.keys()).filter(it=>!f.ids.get(it));
     var s = from(arr);

     s.pipe(
       
       concatMap(it=>this.adv.GetParent(it).pipe(delay(2000))) ,
       
     )
     .subscribe(res=>{
        var first=res[0];
        var id=first.orig;
        f.ids.set(id,true);
        f.names.set(id,res);
     });
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
      this.FoundCountries.get(name).AddId(it.id);
      
   });
   console.log('nr:' + this.FoundCountries.size);
  });

  }
  
  
}

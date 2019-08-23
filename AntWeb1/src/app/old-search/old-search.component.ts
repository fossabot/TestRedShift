import { Component, OnInit } from '@angular/core';
import { FindBetweenResult, FindBetween, Country, Movement } from '../classes/interval';
import { MovementSearcherComponent } from '../movement-searcher/movement-searcher.component';
import { finalize } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { PeriodService } from '../services/period.service';
import { FoundResultsService } from '../found-results.service';

@Component({
  selector: 'app-old-search',
  templateUrl: './old-search.component.html',
  styleUrls: ['./old-search.component.css']
})
export class OldSearchComponent implements OnInit {

  public searchTitle: string;
  public found: Array<FindBetweenResult>;
  public message:string="";

 
  public searchBetween: FindBetween;
  public searchCountry: Country;
  public searchMovement : Movement;
  public movementComponent: MovementSearcherComponent;
  public myalert(t: FindBetweenResult ){
    window.alert('deci:'+t.id);
  }
  constructor(private breakpointObserver: BreakpointObserver, private ps: PeriodService, private fs: FoundResultsService) {
    this.searchCountry = new Country();
    this.searchMovement= new Movement();


  }
  public onCountrySelected(country:Country){
    
    this.searchCountry= country;
    
    this.search();

  }
  public onMovementSelected(m:Movement){
    if(this.searchMovement != null)
    {
      if(JSON.stringify(this.searchMovement) == JSON.stringify(m)){
          console.log('same movement');
          return ;
      }
    }
    this.searchMovement  = m;
    this.search();
  }
 
  public onSearchTime(f: FindBetween) {
      this.searchBetween = f;
      this.search();
  }
  doAdd: boolean;
  
  ngOnInit() {
  }
  public onSearchTitle(term:string){
    console.log(" in search title" + term);
    this.searchTitle = term;
    this.search();
  }

  search(){
    this.found=[];
    this.doAdd=false;
    var mess='';
    var search=new FindBetween();
    if(this.searchBetween != null){
      mess +="finding from year " + this.searchBetween.fromDate + " to year " + this.searchBetween.toDate ;
      search.fromDate = this.searchBetween.fromDate;
      search.toDate = this.searchBetween.toDate;
    }
    if(this.searchCountry.id > 0){
      mess += 'in country ' + this.searchCountry.name;
    }
    search.countryId=this.searchCountry.id || -1;
    

    if(this.searchMovement.id > 0){
      mess += ' in movement ' + this.searchMovement.name;
    }
    search.movementId=this.searchMovement.id || -1;

    this.searchTitle = this.searchTitle ||'';
    if(this.searchTitle.length > 0){
      mess += ' title : ' +this.searchTitle;
      search.term = this.searchTitle;
    }
    this.message =mess;
    this.found=[];
    this.ps.findData(search)
    .pipe(
      finalize(()=>{
        
      })
    )
    .subscribe(
      it=>{
        this.doAdd = true;
          this.message += " found : " + it.length;
          it.sort((a,b)=>a.name.localeCompare(b.name));
          var nr:0, max:number;
          max=it.length;
          //var pagesCount=max / 50;
          this.found=[];
          if(max == 0 )
            return;
          //var once  = Math.min(50,max);
          //this.found.push(...it.slice(0,once));
          this.found=it;
          this.fs.NextRest(this.found);
          return;
          // interval(1000)
          // .pipe(
          //   //timeInterval(),
          //   takeWhile(page=> this.doAdd && pagesCount>page ),
            
          // ).
          // subscribe(nr=>{
            
          //   console.log("slice" + JSON.stringify(nr));
          //   const maxEl = Math.min((nr+1)*10,max-1);
          //   this.found.push(...it.slice((nr)*10,maxEl));
          // })
            
          
          

      }
    )
}
}

import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, of, interval } from 'rxjs';
import { map, finalize, delay, timeInterval, take, takeWhile } from 'rxjs/operators';
import { FindBetween, FindBetweenResult } from '../classes/interval';
import { PeriodService } from '../services/period.service';

@Component({
  selector: 'my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent {

  public found: Array<FindBetweenResult>;
  public message:string="";

  public searchTitle: string;
  public searchBetween: FindBetween;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, private ps: PeriodService) {}

  public onSearchTitle(term:string){
    console.log(" in search title" + term);
    this.searchTitle = term;
    this.search();
  }
  public onSearchTime(f: FindBetween) {
      this.searchBetween = f;
      this.search();
  }
  doAdd: boolean;
  search(){
      this.found=[];
      this.doAdd=false;
      var mess='';
      var search=new FindBetween()
      if(this.searchBetween != null){
        mess +="finding from year " + this.searchBetween.fromDate + " to year " + this.searchBetween.toDate ;
        search.fromDate = this.searchBetween.fromDate;
        search.toDate = this.searchBetween.toDate;
      }
      
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
            var pagesCount=max / 20;
            this.found=[];
            if(max == 0 )
              return;
            var once  = Math.min(10,max);
            this.found.push(...it.slice(0,once));
            return;
            interval(1000)
            .pipe(
              //timeInterval(),
              takeWhile(page=> this.doAdd && pagesCount>page ),
              
            ).
            subscribe(nr=>{
              
              console.log("slice" + JSON.stringify(nr));
              const maxEl = Math.min((nr+1)*10,max-1);
              this.found.push(...it.slice((nr)*10,maxEl));
            })
              
            
            

        }
      )
  }
  
}

  

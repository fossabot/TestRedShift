import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, of, interval } from 'rxjs';
import { map, finalize, delay, timeInterval, take } from 'rxjs/operators';
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
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, private ps: PeriodService) {}
  
  public onSearchTime(f: FindBetween) {
      this.message = "finding from year " + f.fromDate + " to year " + f.toDate;
      this.found=[];
      this.ps.findData(f)
      .pipe(
        finalize(()=>{
          
        })
      )
      .subscribe(
        it=>{
            this.message += " found : " + it.length;
            it.sort((a,b)=>a.name.localeCompare(b.name));
            var nr:0, max:number;
            max=it.length;
            var pagesCount=max / 20;
            
            interval(1000)
            .pipe(
              //timeInterval(),
              take(pagesCount),
              
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

  

import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, of, interval } from 'rxjs';
import { map, finalize, delay, timeInterval, take, takeWhile, count } from 'rxjs/operators';
import { FindBetween, FindBetweenResult, Country, Movement } from '../classes/interval';
import { PeriodService } from '../services/period.service';
import { MovementSearcherComponent } from '../movement-searcher/movement-searcher.component';
import { FoundResultsService } from '../found-results.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent {

  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, private fs: FoundResultsService) {
    fs.Obs().subscribe(it=> this.found=it);

  }
  public message:string;
  public found: Array<FindBetweenResult>;
  

}

  

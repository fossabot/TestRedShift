import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, of, interval } from 'rxjs';
import { map, finalize, delay, timeInterval, take, takeWhile, count } from 'rxjs/operators';
import { FindBetween, FindBetweenResult, Country, Movement } from '../classes/interval';
import { PeriodService } from '../services/period.service';
import { MovementSearcherComponent } from '../movement-searcher/movement-searcher.component';
import { FoundResultsService } from '../found-results.service';
import { TodoItemFlatNode } from '../adv-search/TodoItemFlatNode';
import { AdvSearchNewService } from '../adv-search-new.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css'],
 // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyNavComponent {

  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, private fs: FoundResultsService, private adv: AdvSearchNewService) {
    fs.Obs().subscribe(it=> this.found=it);
    fs.ObsFind().subscribe(it=>this.WhatToFind=it);

  }
  public WhatToFind: TodoItemFlatNode[];
  public message:string;
  public found: Array<FindBetweenResult>;
  public myalert(t: FindBetweenResult ){
    // window.alert('am gasit '+t.id);
    this.adv.GetParent(t.id).subscribe(it=>{
      var res = it.map(t => `${t.name}  )`).join('\r\n\r\n');
      window.alert(res);
    });

  }

}

  

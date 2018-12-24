import { Component, OnInit } from '@angular/core';
import { AdvfindService } from '../advfind.service';
import { Observable } from 'rxjs';
import { Topic } from '../topic';
import { FoundResultsService } from '../found-results.service';
import { FormControl } from '@angular/forms';
import { FindBetweenResult } from '../classes/interval';

@Component({
  selector: 'app-adv-search',
  templateUrl: './adv-search.component.html',
  styleUrls: ['./adv-search.component.css']
})
export class AdvSearchComponent implements OnInit {

  topics:Observable<Topic[]>;
  public topicSearch = new FormControl();
  constructor(private adv: AdvfindService, private fs: FoundResultsService) { }

  ngOnInit() {
    this.topics = this.adv.getTopics();
  }
  public displayFnTopic(c?: Topic): string | undefined {
    return c ?  c.name : undefined;
  }
  public topicSelected(t?:Topic){
    var fArr=[];
    var f=new FindBetweenResult();
    f.id=0;
    f.name="Loading data ... please wait";
    fArr.push(f);
    this.fs.NextRest(fArr);
    this.adv.FindAdvanced(t.id).subscribe(it=>{
      this.fs.NextRest(it);
    });
    //this.fs.NextRest
  }
}

import { Component, OnInit, Input } from "@angular/core";
import { NewCountry } from "../NewCountry";
import { AdvSearchNewService } from "../adv-search-new.service";
import { FoundResultsService } from '../found-results.service';
import { FindBetweenResult } from '../classes/interval';

@Component({
  selector: "app-country-new",
  templateUrl: "./country-new.component.html",
  styleUrls: ["./country-new.component.css"]
})
export class CountryNewComponent implements OnInit {
  @Input() nc: NewCountry;
  
  constructor(private adv: AdvSearchNewService, private fs: FoundResultsService) {
    
  }

  ngOnInit() {
      if(this.nc === undefined)
      this.adv.GetCountry(0).subscribe(it => {
        //window.alert(JSON.stringify(it));
        this.nc= it[0];
      });
  }
  

  clickCountry(c : NewCountry) {
    var fArr=[];
    var f=new FindBetweenResult();
    f.id=0;
    f.name=`Loading data ${c.name}... please wait`;
    fArr.push(f);
    this.fs.NextRest(fArr);
    this.adv.GetAuthorsNewCountry(c.id).subscribe(it=>this.fs.NextRest(it));
    
    const name = c.name;
    c.name = " Loading " + c.name;
    this.adv.GetCountry(c.id).subscribe(newIt => {
      c.childs = newIt;
      window.alert(JSON.stringify(newIt));
      c.name = name;
    });
  }
}

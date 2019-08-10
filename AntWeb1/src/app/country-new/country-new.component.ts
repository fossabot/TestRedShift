import { Component, OnInit, Input } from "@angular/core";
import { NewCountry } from "../NewCountry";
import { AdvSearchNewService } from "../adv-search-new.service";

@Component({
  selector: "app-country-new",
  templateUrl: "./country-new.component.html",
  styleUrls: ["./country-new.component.css"]
})
export class CountryNewComponent implements OnInit {
  @Input() nc: NewCountry;
  
  constructor(private adv: AdvSearchNewService) {
    
  }

  ngOnInit() {
      if(this.nc === undefined)
      this.adv.GetCountry(0).subscribe(it => {
        //window.alert(JSON.stringify(it));
        this.nc= it[0];
      });
  }
  

  clickCountry(c : NewCountry) {
    const name = c.name;
    c.name = " Loading " + c.name;
    this.adv.GetCountry(c.id).subscribe(newIt => {
      c.childs = newIt;
      window.alert(JSON.stringify(newIt));
      c.name = name;
    });
  }
}

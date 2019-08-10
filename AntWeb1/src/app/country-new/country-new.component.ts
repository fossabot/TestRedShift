import { Component, OnInit, Input } from "@angular/core";
import { NewCountry } from "../NewCountry";
import { AdvSearchNewService } from "../adv-search-new.service";

@Component({
  selector: "app-country-new",
  templateUrl: "./country-new.component.html",
  styleUrls: ["./country-new.component.css"]
})
export class CountryNewComponent implements OnInit {
  @Input() id: number;
  newCountries: NewCountry[];
  constructor(private adv: AdvSearchNewService) {
    this.newCountries = [];
  }

  ngOnInit() {
    
      this.adv.GetCountry(this.id).subscribe(it => {
        //window.alert(JSON.stringify(it));
        this.newCountries = it;
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

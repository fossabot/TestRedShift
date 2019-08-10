import { Component, OnInit } from '@angular/core';
import { AdvSearchNewService } from '../adv-search-new.service';
import { NewCountry } from '../NewCountry';


@Component({
  selector: 'app-adv-search-new',
  templateUrl: './adv-search-new.component.html',
  styleUrls: ['./adv-search-new.component.css']
})
export class AdvSearchNewComponent implements OnInit {


  folders: NewCountry[];
  constructor(private  adv: AdvSearchNewService) { }

  ngOnInit() {
      this.adv.GetCountry(0).subscribe(it=>this.folders=it);
  }
  clickCountry(c: NewCountry){
    
    const name=c.name;
    c.name = " Loading "  + c.name;
    this.adv.GetCountry(c.id).subscribe(it=>{
      c.childs=it;
      c.name = name;
    });
    
    
  }
}

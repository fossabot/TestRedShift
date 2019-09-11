import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { NewCountry } from "../NewCountry";
import { AdvSearchNewService } from "../adv-search-new.service";
import { FoundResultsService } from '../found-results.service';
import { FindBetweenResult, Country } from '../classes/interval';
import { ExpandServiceService } from '../expand-service.service';

@Component({
  selector: "app-country-new",
  templateUrl: "./country-new.component.html",
  styleUrls: ["./country-new.component.css"]
})

export class CountryNewComponent implements OnInit, AfterViewInit {
  @Input() nc: NewCountry;
  icon : string="folder";
  color: string = "black";
  @ViewChild('scrollToMe') scrollToMe: ElementRef;
  constructor(private adv: AdvSearchNewService, private fs: FoundResultsService,private expand:ExpandServiceService) {
    
  }
  ngAfterViewInit() {
    this.expand.s.subscribe(it=>{
      if(it == null)
        return;
      //console.log(`received from ${this.nc.id} --- ${it.iDhd}`);
      
      if(this.nc.id == it.iDhd){
        console.log('expand');
        console.log(JSON.stringify(it) );
        console.log(JSON.stringify(this.nc) );
        if( !this.hasChilds(this.nc))
          this.clickCountry(this.nc);
          this.scrollToMe.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    })
  }
  ngOnInit() {
      if(this.nc === undefined)
      this.adv.GetCountry(0).subscribe(it => {
        //window.alert(JSON.stringify(it));
        this.nc= it[0];
      });
  }
  hasChilds(c:NewCountry):boolean{
    return (c.childs ||[]).length>0;
  }
  resetChilds(){
    this.nc.childs=[];
  }
  clickCountry(c : NewCountry) {
    
    var fArr=[];
    var f=new FindBetweenResult();
    f.id=0;
    f.name=`Loading data ${c.name}... please wait`;
    fArr.push(f);
    this.fs.NextRest(fArr);
    this.adv.GetAuthorsNewCountry(c.id).subscribe(it=>this.fs.NextRest(it));

    if(this.hasChilds(c)){
      c.childs=[];
      this.color='black';
      return; 
    }
    const name = c.name;
    c.name = " Loading " + c.name;
    
    
    this.adv.GetCountry(c.id).subscribe(newIt => {
      this.color='blue';
      c.childs = newIt.sort((a,b)=>a.name.localeCompare(b.name));
      if(c.childs.length == 0){
        this.icon="";
      }
      //window.alert(JSON.stringify(newIt));
      c.name = name;
    });
  }
}

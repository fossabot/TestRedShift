import { Component, OnInit } from '@angular/core';
import { AdvSearchNewService } from '../adv-search-new.service';
export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-adv-search-new',
  templateUrl: './adv-search-new.component.html',
  styleUrls: ['./adv-search-new.component.css']
})
export class AdvSearchNewComponent implements OnInit {

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];
  constructor(private  adv: AdvSearchNewService) { }

  ngOnInit() {
      this.adv.GetCountry(0).subscribe(it=>window.alert(JSON.stringify(it)));
  }

}

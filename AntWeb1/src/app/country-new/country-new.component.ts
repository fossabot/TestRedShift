import { Component, OnInit, Input } from '@angular/core';
import { NewCountry } from '../NewCountry';

@Component({
  selector: 'app-country-new',
  templateUrl: './country-new.component.html',
  styleUrls: ['./country-new.component.css']
})
export class CountryNewComponent implements OnInit {

  @Input()  newCountries: NewCountry[];
  constructor() { }

  ngOnInit() {
  }

}

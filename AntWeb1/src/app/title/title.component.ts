import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Output() searchString= new EventEmitter<string>();
  searchTerm$ = new Subject<string>();
  constructor() { 
    var self=this;
    this.searchTerm$.asObservable().pipe
      (
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(it=>{
        console.log("before emit " + it);
        self.searchString.emit(it);
        console.log("after emit " + it);
      })
  }

  ngOnInit() {
  }


}

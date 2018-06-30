import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { ninvoke } from 'q';
import { PeriodService } from '../services/period.service';
import { FindBetween } from '../classes/interval';


declare const noUiSlider : any;
declare const wNumb: any;

@Component({
  selector: 'app-period-searcher',
  templateUrl: './period-searcher.component.html',
  styleUrls: ['./period-searcher.component.scss']
})
export class PeriodSearcherComponent implements OnInit {

  @Output() searchTime= new EventEmitter<FindBetween>();

  numberShowOnSlide:number=0;
  constructor(private ps: PeriodService ) { }

  initSlide(minValue: number, maxValue:number){
    
    let  valMin = minValue / 100;
    valMin = parseInt(valMin.toString(10),10);
    valMin=valMin*100;
    var arrDates = [minValue,maxValue];
    while(valMin < maxValue)
    {
      arrDates.push(valMin);
      valMin = valMin+300;
    }
    var range_all_sliders = {
      'min': [     minValue],
      
      'max': [ maxValue ]
    };
    var slider = document.getElementById('slider');
    var min = (<HTMLInputElement> document.getElementById('PeriodMin'));
    var max = (<HTMLInputElement>  document.getElementById('PeriodMax'));
    min.value = minValue.toString(10);
    max.value = maxValue.toString(10);
    
noUiSlider.create(slider, {
  start: [minValue,maxValue],
	range: range_all_sliders,
	
	pips: {
    
    
      mode: 'values',
      values: arrDates ,// [-799,-500,0,500, 1000,1300,1600,1930],
      //density: 4
      filter: ( value, type ) =>{
        this.numberShowOnSlide++;

        if(this.numberShowOnSlide % 2  == 0)
          return 2;

        return 1;
        let val = +value ;
        val = (val / 100 ) % 2;

        if(val  == 0)
          return 2;

        return 1;
      }
    
    
    //mode: 'steps'
		// density: 3,
		// filter: this.filter500,
		// format: wNumb({
		// 	decimals: 0,
      
    //   suffix: 'th'
		// })
	}
});
var self=this;
slider.noUiSlider.on('end', function( values, handle ) {

		if(handle){
        max.value=parseInt(values[1].toString(),10).toString(10);
    }
    else{
      min.value= parseInt(values[0].toString(),10).toString(10);
    }
    self.findData(values[0],values[1]);
	
});

  }
  ngOnInit() {
    
    this.ps.getData().subscribe(interval=>{
      
      this.initSlide(interval.start,interval.end);
    })

   
  }
  findData(min: number, max: number){
      var f= new FindBetween();
      f.fromDate = min;
      f.toDate = max;
      this.searchTime.emit(f);
      
    
  }

}

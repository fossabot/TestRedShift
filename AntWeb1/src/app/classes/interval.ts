export class Interval<T> {
    
    
    constructor (public  start: T,public end: T) {
        
        
    }
    
 
}
export class FindBetweenResult {
    fromDate: number;
    toDate: number;
    id: number;
    name: string;
}
export class FindBetween{
    constructor(public fromDate: number, public toDate: number) {
        this.fromDate = parseInt(fromDate.toString(10),10);
        this.toDate = parseInt(toDate.toString(10),10);
        
    }
    
}
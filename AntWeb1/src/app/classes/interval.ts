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
    constructor() {
        // this.fromDate = parseInt(fromDate.toString(10),10);
        // this.toDate = 
    }
    public  term: string;
    public get fromDate(): number  {
        if(this.FromDate == null)
            return null;
        
            return parseInt(this.FromDate.toString(10),10);
    }
    public set fromDate(value: number | null)  {
        this.FromDate = value;
    }

    private FromDate: number | null;

    public ToDate: number;
    public get toDate(): number {
        if(this.ToDate== null)
            return null;

        return parseInt(this.ToDate.toString(10),10);        
    }
    public set toDate(value: number)  {
        this.ToDate = value;
    }
}
export class ExpenditureInfo {
    CLIENT_ID: number;
    ID: any;
    INCOME_INFORMATION_ID:number
    HOUSE:number;
    TRADE:number;
    AGRICULTURE:number;
    INSURANCE:number;
    EDUCATION:number;
    MISCELLANEOUS:number;
    OTHER:number;
    TOTAL:number;
    ARCHIVE_FLAG:string;

    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }
}

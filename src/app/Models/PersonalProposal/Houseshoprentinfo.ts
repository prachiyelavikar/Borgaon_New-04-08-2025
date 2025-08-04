export class HouseShopRentInfo {
CLIENT_ID: number;
ID: any;
PROPOSAL_ID: number;
INCOME_INFORMATION_ID:number
RENT_DETAILS:string;
INCOME_FROM_RENT:number;
AMOUNT:number;
ADDRESS_ID: number;
YEARLY_INCOME: number;
ARCHIVE_FLAG:string;

    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }
}
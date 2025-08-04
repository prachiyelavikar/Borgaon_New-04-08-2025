export class Incomeinformation {
    CLIENT_ID: number;
    ID: number;
    PROPOSAL_ID: number;
    INCOME_SOURCE_ID: number;
    OTHER_INCOME_SOURCE_ID: number;
    OTHER_INCOME_SOURCE_ID2:number
    OTHER_INCOME_SOURCE_ID3:number
    OTHER_INCOME_SOURCE_ID4:number
    IS_HOLD_AGRICULTURE_LAND: number;
    IS_SAVED:boolean
    TYPE:string
    APPLICANT_ID:number
    INCOME_INFORMATION_ID: number;
    INCOME_FROM_RENT:number
    SUGAR:number


    IS_SALARY: boolean = false;
    IS_BUSINESS: boolean = false;
    IS_AGRICULTURE: boolean = false;
    IS_HOUSE: boolean = false;
    IS_OTHER: boolean = false;

    IS_EXPENDITURE: boolean = false;
    IS_NO_INCOME: boolean = false;
}

// export class HouseRentInfo{
//     CLIENT_ID: number = 1;
//     ID: number;
//     TYPE:string
//     APPLICANT_ID:number
//     INCOME_INFORMATION_ID: number;
// }
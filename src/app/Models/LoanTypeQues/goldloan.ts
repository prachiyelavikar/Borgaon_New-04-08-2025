export class Goldloan {
    ID: number;
    
    PROPOSAL_ID: number;
  
    ARCHIVE_FLAG:string;
    
    NOMINEE_NAME = ''
    NOMINEE_ADDRESS = ''
    NOMINEE_AGE = ''
    NOMINEE_RELATION = ''
    SANCTION_DATE: any =null
    total: number;
    total1: number;
    total2: number;
    total3: number;
    VALUATION_AMOUNT_IN_WORDS:string;
    HAND_WRITTEN_AMT_IN_WORDS3:string
    VALUATORS_NAME:string;
    V_DATE:any =null
    LOAN_AMOUNT1 : number;


    VALUATION_AMOUNT : any;
    NET_WEIGHT : number;
    PER_GRAM_RATE : number;
    DESCRIPTION_OF_JEWELS : string;
    TOTAL_QUANTITY : number;
    GROSS_WEIGHT : number;
    REMARK: string;

    PERCENT : number;
    AMOUNT : number;



    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }
}

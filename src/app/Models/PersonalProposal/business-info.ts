export class BusinessInfo {
    CLIENT_ID: number = 1;
    ID: number;
    INCOME_INFORMATION_ID: number;
    NAME_OF_FIRM: string;
    NATURE_OF_FIRM: string;
    ADDRESS_ID: number;
    NUMBER_OF_YEARS: number;
    OWNERSHIP_TYPE: string = 'O';
    IS_SHOP_ACT_LICENSE: boolean;
    IS_SHOP_ACT_LICENSE_RENEWAL_FOR_CURRENT_YEAR: boolean;
    IS_GST_REGISTARTION_CERTIFICATE: boolean;
    IS_CERTIFICATE_FROM_PROFESSIONAL_TAX_AUTHORITY: boolean;
    IS_OTHER_LICENSE: boolean;
    OTHER_LICENSE_NUMBER: string;
    SHOP_ACT_NUMBER: string;
    GST_NUMBER: string;
    OTHER_LICENSE_NAME: string;
    TYPE: string
    OWNER_NAME: string
    IS_RENT_AGREEMENT_DONE: boolean
    RENT_AGREEMENT_END_DATE: string
    IS_MSME_REGISTERED: boolean
    MSME_REGISTRATION_NUMBER: string
    MSME_REGISTRATION_DATE: string
    IS_INVOLVE_IN_MANUFACTURING_PROCESS: boolean
    PRIME_COSTOMERS_DETAILS: string
    DETAILS_OF_WORK_ORDERS: string
    MANUFACTURING_INFORMATION = []
    FACTORY_UNIT_INFORMATION = []
    DETAILS_OF_EMPLOYEE = []
    MANAGEMENT_OF_SALES = []
    CAPITAL: number
    BUSINESS_NAME:string;
    TURNOVER_YEARLY: number
    INCOME_YEARLY: number
    YEARLY_EXPENDITURE:number
    ARCHIVE_FLAG:string;

    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }
}

import { DataSourceModel } from "src/app/shared/models/data-source.model";

export class UserProfileSearchCriteriaDTO extends DataSourceModel {
    firstName: string ;
    lastName: string ;
    email: string ;
    mobile: string ;
    userName: string ;
    jobTitle:string;
    userTypeId:number;
}
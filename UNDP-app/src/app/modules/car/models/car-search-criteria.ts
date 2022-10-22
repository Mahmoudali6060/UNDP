import { DataSourceModel } from "src/app/shared/models/data-source.model";

export class CarSearchCriteria extends DataSourceModel{
    carBrand :string
    carNumber :string
    carModel :string
}
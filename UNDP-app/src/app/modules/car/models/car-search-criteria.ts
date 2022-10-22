import { DataSourceModel } from "src/app/shared/models/data-source.model";

export class CarSearchCriteria extends DataSourceModel{
    cardBrand :string
    cardNumber :string
    carModel :string
}
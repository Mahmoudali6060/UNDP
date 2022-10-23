import { DataSourceModel } from "src/app/shared/models/data-source.model";

export class TripSerachCriteria extends DataSourceModel{
      tripStatusId : number
      previousKiloMeterCounter :number
      currentKiloMeterCounter :number
      actualStartTime :string
      actualEndTime :string
      tripClosingReasonId :number
      sequenceNumber :string
      driverId : number
      email: string;
      carId: number
      carBrand: string
}
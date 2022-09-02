import { TripClosingReasonEnum } from "src/app/shared/enums/trip-closing-reason-enum";
import { TripStatusEnum } from "src/app/shared/enums/trip-status-enum";

export class TripDTO{
      id : number;
      tripStatusId : TripStatusEnum
      previousKiloMeterCounter : number;
      currentKiloMeterCounter : number;
      actualStartTime : string
      actualEndTime : string
      tripClosingReasonId : TripClosingReasonEnum
      sequenceNumber :  number;
      driverId :  number;
      driverName : string
}
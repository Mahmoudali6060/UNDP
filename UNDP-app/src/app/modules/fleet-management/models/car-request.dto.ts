import { CarRequestStatusEnum } from "../../../shared/enums/car-request-status.enum";

export class CarRequestDTO {
    id: number ;
    requesterName: string ;
    requesterEmail: string ;
    dateFrom: string ;
    dateTo: string ;
    pickUp: string ;
    destination: string ;
    comments: string = '';
    purpose: string ;
    carRequestStatusId: CarRequestStatusEnum ;
    userProfileId: number | null;
}
import { CarRequestStatusEnum } from "../../../shared/enums/car-request-status.enum";

export class CarRequestDTO {
    id: number;
    requesterName: string;
    requesterEmail: string;
    dateFrom: string;
    dateTo: string;
    pickUp: string;
    destination: string;
    comments: string = '';
    purpose: string;
    carRequestStatusId: CarRequestStatusEnum;
    supervisorId: number | null;
    driverId: number | null;
    sequenceNumber: string;
    closingReasonId :number | undefined;
    closingReasonComment:string;
    totalApproved:number;
    totalInProgress :number;
    totalClosed :number;
}
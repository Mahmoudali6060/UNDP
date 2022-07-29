import { CarRequestStatusEnum } from "../../../shared/enums/car-request-status.enum";

export class CarRequestDTO {
    id: number | undefined;
    requesterName: string | undefined;
    requesterEmail: string | undefined;
    dateFrom: string | undefined;
    dateTo: string | undefined;
    pickUp: string | undefined;
    destination: string | undefined;
    comments: string = '';
    purpose: string | undefined;
    carRequestStatusId: CarRequestStatusEnum | undefined;
    userProfileId: number | undefined;
}
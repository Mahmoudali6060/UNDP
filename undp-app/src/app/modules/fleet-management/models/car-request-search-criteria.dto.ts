import { CarRequestStatusEnum } from "../../../shared/enums/car-request-status.enum";
import { DataSourceModel } from "../../../shared/models/data-source.model";

export class CarRequestSearchCriteriaDTO extends DataSourceModel {
    requesterName: string | undefined;
    requesterEmail: string | undefined;
    dateFrom: string | undefined;
    dateTo: string | undefined;
    pickUp: string | undefined;
    destination: string | undefined;
    comments: string = '';
    purpose: string | undefined;
    carRequestStatusId: CarRequestStatusEnum | undefined;
    userProfileId: number | null;
}
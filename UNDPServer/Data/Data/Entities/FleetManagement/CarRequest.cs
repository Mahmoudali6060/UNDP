using Data.Entities.Shared;
using Data.Entities.UserManagement;
using Shared.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities.FleetManagement
{
    public class CarRequest : BaseEntity
    {
        public string RequesterName { get; set; }
        public string RequesterEmail { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public string PickUp { get; set; }
        public string Destination { get; set; }
        public string Comments { get; set; }
        public string Purpose { get; set; }
        public CarRequestStatusEnum CarRequestStatusId { get; set; }
        public string SequenceNumber { get; set; }

        public long? SupervisorId { get; set; }
        public virtual UserProfile Supervisor { get; set; }

        public long? DriverId { get; set; }
        public virtual UserProfile Driver { get; set; }

        public ClosingReasonEnum ClosingReasonId { get; set; }
        public string ClosingReasonComment { get; set; }

        public virtual Trip Trip { get; set; }

    }
}

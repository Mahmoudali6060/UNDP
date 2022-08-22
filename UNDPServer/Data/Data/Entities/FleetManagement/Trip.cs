using Data.Entities.Shared;
using Data.Entities.UserManagement;
using Shared.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities.FleetManagement
{
    public class Trip : BaseEntity
    {
        public TripStatusEnum TripStatusId { get; set; }
        public int PreviousKiloMeterCounter { get; set; }
        public int CurrentKiloMeterCounter { get; set; }
        public DateTime ActualStartTime { get; set; }
        public DateTime ActualEndTime { get; set; }
        public TripClosingReasonEnum TripClosingReasonId { get; set; }
        public string PictureUrl { get; set; }

        public long CarRequestId { get; set; }
        public CarRequest CarRequest { get; set; }

    }
}

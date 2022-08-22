using Shared.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace FleetManagement.Entities
{
    public class TripDTO
    {
        public long Id { get; set; }
        public TripStatusEnum TripStatusId { get; set; }
        public int PreviousKiloMeterCounter { get; set; }
        public int CurrentKiloMeterCounter { get; set; }
        public DateTime ActualStartTime { get; set; }
        public DateTime ActualEndTime { get; set; }
        public TripClosingReasonEnum TripClosingReasonId { get; set; }
        public string PictureUrl { get; set; }
        public string ImageBase64 { get; set; }

        public long CarRequestId { get; set; }
    }
}

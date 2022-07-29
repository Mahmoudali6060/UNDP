﻿using Data.Entities.Shared;
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

        public long? UserProfileId { get; set; }
        public virtual UserProfile UserProfile { get; set; }

    }
}
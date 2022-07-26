﻿using Data.Entities.FleetManagement;
using Data.Entities.Shared;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities.UserManagement
{
    public class UserProfile : BaseEntity
    {
        public int Age { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Mobile { get; set; }
        public string JobTitle { get; set; }
        public string ImageUrl { get; set; }
        public UserTypeEnum UserTypeId { get; set; }
        public string Role { get; set; }
        public string DefaultLanguage { get; set; }
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public virtual IEnumerable<CarRequest> SupervisorCarRequests { get; set; }
        public virtual IEnumerable<CarRequest> DriverCarRequests { get; set; }
        public UserDevice UserDevice { get; set; }

    }
}

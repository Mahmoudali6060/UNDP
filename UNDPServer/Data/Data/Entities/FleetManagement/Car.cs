using Data.Entities.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities.FleetManagement
{
    public class Car :  BaseEntity
    {
        public string CarBrand { get; set; }
        public string CarNumber { get; set; }
        public string CarModel { get; set; }
        public virtual Trip Trip { get; set; }

    }
}

using Data.Entities.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities.FleetManagement
{
    public class Car :  BaseEntity
    {
        public string CardBrand { get; set; }
        public string CardNumber { get; set; }
        public string CarModel { get; set; }
        public virtual Trip Trip { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace FleetManagement.Entities
{
    public class CarDTO
    {
        public long Id { get; set; }
        public string CarBrand { get; set; }
        public string CarNumber { get; set; }
        public string CarModel { get; set; }
    }
}

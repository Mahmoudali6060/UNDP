using Shared.Entities.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace FleetManagement.Entities
{
    public class CarSearchCriteriaDTO : DataSource
    {
        public string CarBrand { get; set; }
        public string CarNumber { get; set; }
        public string CarModel { get; set; }
    }
}

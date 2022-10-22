using FleetManagement.Entities;
using Shared.DataServiceLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace FleetManagement.DataServiceLayer.Contracts
{
    public interface ICarDSL : ICRUDOperationsDSL<CarDTO, CarSearchCriteriaDTO>
    {
    }
}

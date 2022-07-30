﻿using FleetManagement.Entities;
using Shared.DataServiceLayer;
using Shared.Entities.Shared;
using System.Threading.Tasks;

namespace FleetManagement.DataServiceLayer
{
    public interface ICarRequestDSL : ICRUDOperationsDSL<CarRequestDTO>
    {
        Task<ResponseEntityList<CarRequestDTO>> GetAll(CarRequestSearchCriteriaDTO dataSource)
    }
}

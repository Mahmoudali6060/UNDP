using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shared.Entities.Shared;
using Shared.Classes;
using FleetManagement.DataAccessLayer;
using FleetManagement.Entities;
using Data.Entities.UserManagement;
using Infrastructure.Contracts;
using Data.Entities.FleetManagement;

namespace FleetManagement.DataServiceLayer
{
    public class CarRequestDSL : ICarRequestDSL
    {
        private readonly ICarRequestDAL _carRequestDAL;
        private readonly IFileManager _fileManager;
        private readonly IMapper _mapper;
        public CarRequestDSL(ICarRequestDAL carRequestDAL, IFileManager fileManager, IMapper mapper)
        {
            _carRequestDAL = carRequestDAL;
            _fileManager = fileManager;
            _mapper = mapper;
        }

        public async Task<ResponseEntityList<CarRequestDTO>> GetAll(DataSource dataSource)
        {
            var carRequest = await _carRequestDAL.GetAll(dataSource);
            var list = _mapper.Map<IEnumerable<CarRequestDTO>>(carRequest.List).AsQueryable();

            //Filter by UserProfileId
            //list = list.Where(x => x.UserProfileId == UserProfileId);
            return new ResponseEntityList<CarRequestDTO>
            {
                List = list.Skip((dataSource.Page - 1) * dataSource.PageSize).Take(dataSource.PageSize),
                Total = list.Count()
            };
            //return Helper.ToResult(list, carRequest.Total, dataSource);
        }

        public async Task<ResponseEntityList<CarRequestDTO>> GetAll(CarRequestSearchCriteriaDTO searchCriteriaDTO)
        {
            var carRequest = await _carRequestDAL.GetAll(searchCriteriaDTO);
            var list = _mapper.Map<IEnumerable<CarRequestDTO>>(carRequest.List).AsQueryable();

            //Filter by UserProfileId
            if (searchCriteriaDTO.UserProfileId > 0)
            {
                list = list.Where(x => x.UserProfileId == searchCriteriaDTO.UserProfileId);
            }

            return new ResponseEntityList<CarRequestDTO>
            {
                List = list.Skip((searchCriteriaDTO.Page - 1) * searchCriteriaDTO.PageSize).Take(searchCriteriaDTO.PageSize),
                Total = list.Count()
            };
        }

        public async Task<CarRequestDTO> GetById(long id)
        {
            return _mapper.Map<CarRequestDTO>(await _carRequestDAL.GetById(id));
        }

        public async Task<ResponseEntityList<CarRequestDTO>> GetAllLite()
        {
            return new ResponseEntityList<CarRequestDTO>()
            {
                List = _mapper.Map<IQueryable<CarRequestDTO>>(_carRequestDAL.GetAllLite().Result.List),
                Total = _carRequestDAL.GetAllLite().Result.Total
            };
        }

        public async Task<long> Add(CarRequestDTO entity)
        {
            return await _carRequestDAL.Add(_mapper.Map<CarRequest>(entity));
        }

        public async Task<long> Update(CarRequestDTO entity)
        {
            return await _carRequestDAL.Update(_mapper.Map<CarRequest>(entity));
        }

        public async Task<bool> Delete(long id)
        {
            CarRequest userProfile = await _carRequestDAL.GetById(id);
            return await _carRequestDAL.Delete(userProfile);
        }

        #region Helper Methods

        #endregion
    }
}

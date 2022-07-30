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

        public async Task<ResponseEntityList<CarRequestDTO>> GetAll(CarRequestSearchCriteriaDTO searchCriteriaDTO)
        {
            var carRequestList = await _carRequestDAL.GetAll();
            int total = carRequestList.Count();

            #region Apply Filters
            //Filter by UserProfileId
            if (searchCriteriaDTO.UserProfileId > 0)
            {
                carRequestList = carRequestList.Where(x => x.UserProfileId == searchCriteriaDTO.UserProfileId);
            }
            #endregion

            #region Apply Pagination
            carRequestList = carRequestList.Skip((searchCriteriaDTO.Page - 1) * searchCriteriaDTO.PageSize).Take(searchCriteriaDTO.PageSize);
            #endregion


            #region Mapping and Return List
            var carRequestDTOList = _mapper.Map<IEnumerable<CarRequestDTO>>(carRequestList);
            return new ResponseEntityList<CarRequestDTO>
            {
                List = carRequestDTOList,
                Total = total
            };
            #endregion

        }

        public async Task<CarRequestDTO> GetById(long id)
        {
            return _mapper.Map<CarRequestDTO>(await _carRequestDAL.GetById(id));
        }

        public async Task<ResponseEntityList<CarRequestDTO>> GetAllLite()
        {
            return new ResponseEntityList<CarRequestDTO>()
            {
                List = _mapper.Map<IQueryable<CarRequestDTO>>(_carRequestDAL.GetAllLite().Result),
                Total = _carRequestDAL.GetAllLite().Result.Count()
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

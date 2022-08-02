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
            carRequestList = ApplyFilert(carRequestList, searchCriteriaDTO);
            #endregion

            //carRequestList = carRequestList.Where(a => !(a.DateFrom.Date >= DateTime.Parse(searchCriteriaDTO.DateFrom).Date && a.DateTo.Date <= DateTime.Parse(searchCriteriaDTO.DateTo)));

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

        private IQueryable<CarRequest> ApplyFilert(IQueryable<CarRequest> carRequestList, CarRequestSearchCriteriaDTO searchCriteriaDTO)
        {
            //Filter by UserProfileId
            if (searchCriteriaDTO.UserProfileId > 0)
            {
                carRequestList = carRequestList.Where(x => x.SupervisorId == searchCriteriaDTO.UserProfileId);
            }

            if (!string.IsNullOrWhiteSpace(searchCriteriaDTO.DateFrom))
            {
                carRequestList = carRequestList.Where(x => x.DateFrom >= DateTime.Parse(searchCriteriaDTO.DateFrom));
            }

            if (!string.IsNullOrWhiteSpace(searchCriteriaDTO.DateTo))
            {
                carRequestList = carRequestList.Where(x => x.DateTo <= DateTime.Parse(searchCriteriaDTO.DateTo));
            }

            if (!string.IsNullOrWhiteSpace(searchCriteriaDTO.RequesterName))
            {
                carRequestList = carRequestList.Where(x => x.RequesterName.Contains(searchCriteriaDTO.RequesterName));
            }

            if (!string.IsNullOrWhiteSpace(searchCriteriaDTO.RequesterEmail))
            {
                carRequestList = carRequestList.Where(x => x.RequesterEmail.Contains(searchCriteriaDTO.RequesterName));
            }

            if (!string.IsNullOrWhiteSpace(searchCriteriaDTO.PickUp))
            {
                carRequestList = carRequestList.Where(x => x.PickUp.Contains(searchCriteriaDTO.PickUp));
            }

            if (!string.IsNullOrWhiteSpace(searchCriteriaDTO.Destination))
            {
                carRequestList = carRequestList.Where(x => x.Destination.Contains(searchCriteriaDTO.Destination));
            }

            if (!string.IsNullOrWhiteSpace(searchCriteriaDTO.Comments))
            {
                carRequestList = carRequestList.Where(x => x.Comments.Contains(searchCriteriaDTO.Comments));
            }

            if (!string.IsNullOrWhiteSpace(searchCriteriaDTO.Purpose))
            {
                carRequestList = carRequestList.Where(x => x.Purpose.Contains(searchCriteriaDTO.Purpose));
            }


            return carRequestList;
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

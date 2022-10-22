using AutoMapper;
using Data.Entities.FleetManagement;
using FleetManagement.DataAccessLayer.Contracts;
using FleetManagement.DataServiceLayer.Contracts;
using FleetManagement.Entities;
using Shared.Entities.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetManagement.DataServiceLayer.Handlers
{
    public class CarDSL : ICarDSL
    {
        private readonly IMapper _mapper;
        private readonly ICarDAL _carDAL;

        public CarDSL(IMapper mapper, ICarDAL carDAL)
        {
            _mapper = mapper;
            _carDAL = carDAL;

        }
        public async Task<long> Add(CarDTO entity)
        {
            var car = await _carDAL.Add(_mapper.Map<Car>(entity));
            return car;
        }

        public async Task<bool> Delete(long id)
        {
            Car car = await _carDAL.GetById(id);
            return await _carDAL.Delete(car);
        }

        public async Task<ResponseEntityList<CarDTO>> GetAll(CarSearchCriteriaDTO searchCrieria)
        {
            CarDTO carDTO = new CarDTO();
            var carList = await _carDAL.GetAll();

            #region Apply Filters
            carList = ApplyFilert(carList, searchCrieria);
            #endregion

            int total = carList.Count();

            #region Order
            carList = carList.OrderByDescending(x => x.Id);
            #endregion

            #region Apply Pagination
            carList = carList.Skip((searchCrieria.Page - 1) * searchCrieria.PageSize).Take(searchCrieria.PageSize);
            #endregion


            #region Mapping and Return List
            List<CarDTO> carDTOList = _mapper.Map<List<CarDTO>>(carList);
            return new ResponseEntityList<CarDTO>
            {
                List = carDTOList,
                Total = total
            };
            #endregion

        }

        public Task<ResponseEntityList<CarDTO>> GetAllLite()
        {
            throw new NotImplementedException();
        }

        public async Task<CarDTO> GetById(long id)
        {
            return _mapper.Map<CarDTO>(await _carDAL.GetById(id));
        }

        public async Task<long> Update(CarDTO entity)
        {
            return await _carDAL.Update(_mapper.Map<Car>(entity));
        }
        private IQueryable<Car> ApplyFilert(IQueryable<Car> carList, CarSearchCriteriaDTO searchCrieria)
        {
            //Filter by UserProfileId

            if (!string.IsNullOrWhiteSpace(searchCrieria.CardBrand))
            {
                carList = carList.Where(x => x.CardBrand.Contains(searchCrieria.CardBrand));
            }

            if (!string.IsNullOrWhiteSpace(searchCrieria.CarModel))
            {
                carList = carList.Where(x => x.CarModel.Contains(searchCrieria.CarModel));
            }
            if (!string.IsNullOrWhiteSpace(searchCrieria.CardNumber))
            {
                carList = carList.Where(x => x.CardNumber.Contains(searchCrieria.CardNumber));
            }

            return carList;
        }

    }
}
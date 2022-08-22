using AutoMapper;
using FleetManagement.DataAccessLayer.Contracts;
using FleetManagement.DataServiceLayer.Contracts;
using FleetManagement.Entities;
using Infrastructure.Contracts;
using Shared.Entities.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Data.Entities.FleetManagement;

namespace FleetManagement.DataServiceLayer.Handlers
{
    public class TripDSL : ITripDSL
    {
        private readonly ITripDAL _tripDAL;
        private readonly IFileManager _fileManager;
        private readonly IMapper _mapper;
        public TripDSL(ITripDAL tripDAL, IFileManager fileManager, IMapper mapper)
        {
            _tripDAL = tripDAL;
            _fileManager = fileManager;
            _mapper = mapper;
        }

        public async Task<long> Add(TripDTO entity)
        {
            if (entity.TripClosingReasonId == 0)
            {
                if(entity.ActualStartTime == null || entity.ActualEndTime == null || entity.PreviousKiloMeterCounter == 0
                   || entity.CurrentKiloMeterCounter == 0 || entity.TripStatusId == 0)
                throw new Exception("Errors.InvalidData");
            }
            var Trip =  await _tripDAL.Add(_mapper.Map<Trip>(entity));
            if (Trip != 0)
            {
                UploadImage(entity);
            }
            return Trip;
        }

        public Task<bool> Delete(long id)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseEntityList<TripDTO>> GetAll(TripSearchCriteriaDTO searchCrieria)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseEntityList<TripDTO>> GetAllLite()
        {
            throw new NotImplementedException();
        }

        public Task<TripDTO> GetById(long id)
        {
            throw new NotImplementedException();
        }

        public Task<long> Update(TripDTO entity)
        {
            throw new NotImplementedException();
        }
        #region Helper Methods
        private bool UploadImage(TripDTO entity)
        {
            if (entity.ImageBase64 != null)
            {
                entity.PictureUrl = string.IsNullOrWhiteSpace(entity.ImageBase64) ? null : entity.CarRequestId + "_" + DateTime.Now.ToString("yyyy_MM_dd_HH_ss") + ".jpg";
                return _fileManager.UploadImageBase64("wwwroot/Images/Trips/" + entity.PictureUrl, entity.ImageBase64);
            }
            return true;
        }
        #endregion
    }
}

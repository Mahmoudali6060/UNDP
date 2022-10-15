using Account.DataServiceLayer.Contracts;
using Account.Entities;
using Data.Contexts;
using Data.Entities.FleetManagement;
using Microsoft.EntityFrameworkCore;
using Shared.Entities.Shared;
using Shared.Enums;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FleetManagement.DataAccessLayer
{
    public class CarRequestDAL : ICarRequestDAL
    {
        private readonly UNDbContext _appDbContext;
        private readonly IEmailSender _emailSender;

        public CarRequestDAL(UNDbContext appDbContext, IEmailSender emailSender)
        {
            _appDbContext = appDbContext;
            _emailSender = emailSender;
        }


        public async Task<IQueryable<CarRequest>> GetAll()
        {
            return _appDbContext.CarRequests.Include(c=>c.Driver).AsQueryable();
        }

        public async Task<IQueryable<CarRequest>> GetAllLite()
        {
            return _appDbContext.CarRequests.OrderByDescending(x=>x.DateFrom).AsQueryable();
        }

        public async Task<CarRequest> GetById(long id)
        {
            return await _appDbContext.CarRequests.SingleOrDefaultAsync(x => x.Id == id);
        }


        public async Task<long> Add(CarRequest entity)
        {
            _appDbContext.Entry(entity).State = EntityState.Added;
            await _appDbContext.SaveChangesAsync();
            return entity.Id;
        }

        public async Task<long> Update(CarRequest entity)
        {
            _appDbContext.Entry(entity).State = EntityState.Modified;
            await _appDbContext.SaveChangesAsync();
            if(entity.CarRequestStatusId == CarRequestStatusEnum.Approved || entity.CarRequestStatusId == CarRequestStatusEnum.Closed)
            {
            var message = new MessageDTO(new string[] { entity.RequesterEmail }, "UNDP.", $"Dear {entity.RequesterName}\r\n Your request number {entity.SequenceNumber} has been {Enum.GetName(typeof(CarRequestStatusEnum), entity.CarRequestStatusId)}");
            _emailSender.SendEmail(message);
            }
            return entity.Id;
        }

        public async Task<bool> Delete(CarRequest userProfile)
        {
            _appDbContext.CarRequests.Remove(userProfile);
            await _appDbContext.SaveChangesAsync();
            return true;
        }



    }
}

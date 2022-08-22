using Data.Contexts;
using Data.Entities.FleetManagement;
using FleetManagement.DataAccessLayer.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetManagement.DataAccessLayer.Handlers
{
    public class TripDAL : ITripDAL
    {
        private readonly UNDbContext _appDbContext;
        public TripDAL(UNDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<long> Add(Trip entity)
        {
            _appDbContext.Entry(entity).State = EntityState.Added;
            await _appDbContext.SaveChangesAsync();
            return entity.Id;
        }

        public Task<bool> Delete(Trip entity)
        {
            throw new NotImplementedException();
        }

        public Task<IQueryable<Trip>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<IQueryable<Trip>> GetAllLite()
        {
            throw new NotImplementedException();
        }

        public Task<Trip> GetById(long id)
        {
            throw new NotImplementedException();
        }

        public Task<long> Update(Trip entity)
        {
            throw new NotImplementedException();
        }
    }
}

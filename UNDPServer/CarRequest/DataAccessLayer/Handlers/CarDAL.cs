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
    public class CarDAL : ICarDAL
    {
        private readonly UNDbContext _appDbContext;

        public CarDAL(UNDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<long> Add(Car entity)
        {
            _appDbContext.Entry(entity).State = EntityState.Added;
            await _appDbContext.SaveChangesAsync();
            return entity.Id;
        }

        public async Task<bool> Delete(Car entity)
        {
            _appDbContext.Cars.Remove(entity);
            await _appDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<IQueryable<Car>> GetAll()
        {
            return _appDbContext.Cars.AsQueryable();
        }

        public async Task<IQueryable<Car>> GetAllLite()
        {
            return _appDbContext.Cars.AsQueryable();
        }

        public async Task<Car> GetById(long id)
        {
            var car = _appDbContext.Cars.SingleOrDefaultAsync(x => x.Id == id);
            return await car;
        }

        public async Task<long> Update(Car entity)
        {
            _appDbContext.Entry(entity).State = EntityState.Modified;
            await _appDbContext.SaveChangesAsync();
            return entity.Id;
        }
    }
}

using Data.Contexts;
using Data.Entities.FleetManagement;
using Microsoft.EntityFrameworkCore;
using Shared.Entities.Shared;
using System.Linq;
using System.Threading.Tasks;

namespace FleetManagement.DataAccessLayer
{
    public class CarRequestDAL : ICarRequestDAL
    {
        private readonly UNDbContext _appDbContext;
        public CarRequestDAL(UNDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }


        public async Task<ResponseEntityList<CarRequest>> GetAll(DataSource dataSource)
        {
            return new ResponseEntityList<CarRequest>()
            {
                List =  _appDbContext.CarRequests.AsQueryable(),
                Total = _appDbContext.CarRequests.Count()
            };
        }

        public async Task<ResponseEntityList<CarRequest>> GetAllLite()
        {

            return new ResponseEntityList<CarRequest>()
            {
                List = _appDbContext.CarRequests.AsQueryable(),
                Total = _appDbContext.CarRequests.Count()
            };
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

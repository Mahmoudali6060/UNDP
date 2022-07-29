﻿using Data.Contexts;
using Data.Entities.UserManagement;
using Microsoft.EntityFrameworkCore;
using Shared.Entities.Shared;
using System.Linq;
using System.Threading.Tasks;

namespace Account.DataAccessLayer
{
    public class UserProfileDAL : IUserProfileDAL
    {
        private readonly UNDbContext _appDbContext;
        public UserProfileDAL(UNDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }


        public async Task<ResponseEntityList<UserProfile>> GetAll(DataSource dataSource)
        {
            return new ResponseEntityList<UserProfile>()
            {
                List = _appDbContext.UserProfiles.Include(x => x.AppUser).AsQueryable(),
                Total = _appDbContext.UserProfiles.Count()
            };
        }

        public async Task<ResponseEntityList<UserProfile>> GetAllLite()
        {

            return new ResponseEntityList<UserProfile>()
            {
                List = _appDbContext.UserProfiles.AsQueryable(),
                Total = _appDbContext.UserProfiles.Count()
            };
        }

        public async Task<UserProfile> GetById(long id)
        {
            var UserProfile = _appDbContext.UserProfiles.Include(x => x.AppUser).SingleOrDefaultAsync(x => x.Id == id);
            return await UserProfile;
        }


        public async Task<long> Add(UserProfile entity)
        {
            _appDbContext.Entry(entity).State = EntityState.Added;
            await _appDbContext.SaveChangesAsync();
            return entity.Id;
        }

        public async Task<long> Update(UserProfile entity)
        {
            _appDbContext.Entry(entity).State = EntityState.Modified;
            await _appDbContext.SaveChangesAsync();
            return entity.Id;
        }

        public async Task<bool> Delete(UserProfile userProfile)
        {
            _appDbContext.UserProfiles.Remove(userProfile);
            await _appDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<UserProfile> GetUserProfileByAppUserId(string appUserId)
        {
            return await _appDbContext.UserProfiles.SingleOrDefaultAsync(x => x.AppUserId == appUserId);
        }


    }
}
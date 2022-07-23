using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shared.Entities.Shared;
using Shared.Classes;
using Account.DataAccessLayer;
using Account.Entities;
using Data.Entities.UserManagement;
using Account.RepositoryLayer;
using Infrastructure.Contracts;

namespace Accout.DataServiceLayer
{
    public class UserProfileDSL : IUserProfileDSL
    {
        private readonly IUserProfileDAL _userProfileDAL;
        private readonly IAccountDAL _accountDAL;
        private readonly IFileManager _fileManager;
        private readonly IMapper _mapper;
        public UserProfileDSL(IUserProfileDAL userProfileDAL, IAccountDAL accountDAL, IFileManager fileManager, IMapper mapper)
        {
            _userProfileDAL = userProfileDAL;
            _accountDAL = accountDAL;
            _fileManager = fileManager;
            _mapper = mapper;
        }

        public async Task<ResponseEntityList<UserProfileDTO>> GetAll(DataSource dataSource)
        {
            var UserProfile = await _userProfileDAL.GetAll(dataSource);
            var list = _mapper.Map<IEnumerable<UserProfileDTO>>(UserProfile.List).AsQueryable();
            return Helper.ToResult(list, UserProfile.Total, dataSource);
        }
        public async Task<UserProfileDTO> GetById(long id)
        {
            return _mapper.Map<UserProfileDTO>(await _userProfileDAL.GetById(id));
        }

        public async Task<ResponseEntityList<UserProfileDTO>> GetAllLite()
        {
            return new ResponseEntityList<UserProfileDTO>()
            {
                List = _mapper.Map<IQueryable<UserProfileDTO>>(_userProfileDAL.GetAllLite().Result.List),
                Total = _userProfileDAL.GetAllLite().Result.Total
            };
        }

        public async Task<long> Add(UserProfileDTO entity)
        {
            AppUser appUser = UserMapper.MapAppUser(entity);
            var createUserResult = await _accountDAL.CreateUserAsync(appUser, entity.Password, entity.Role);
            if (createUserResult.Succeeded)
            {
                entity.AppUserId = appUser.Id;
                UploadImage(entity);
                return await _userProfileDAL.Add(_mapper.Map<UserProfile>(entity));
            }
            throw new Exception(createUserResult.Errors.ToList()[0].Description);
        }

        public async Task<long> Update(UserProfileDTO entity)
        {
            UploadImage(entity);
            return await _userProfileDAL.Update(_mapper.Map<UserProfile>(entity));
        }

        public async Task<bool> Delete(long id)
        {
            UserProfile userProfile = await _userProfileDAL.GetById(id);
            //>>To-Do >> Check this again
            //if (userProfile.AppUserId != null)
            //    await _accountDAL.DeleteUser(userProfile.AppUserId);
            return await _userProfileDAL.Delete(userProfile);
        }

        public async Task<UserProfile> GetUserProfileByAppUserId(string appUserId)
        {
            return await _userProfileDAL.GetUserProfileByAppUserId(appUserId);
        }

        #region Helper Methods
        private bool UploadImage(UserProfileDTO entity)
        {
            entity.ImageUrl = string.IsNullOrWhiteSpace(entity.ImageBase64) ? null : entity.UserName + "_" + DateTime.Now.ToString("yyyy_MM_dd_HH_ss") + ".jpg";
            return _fileManager.UploadImageBase64("wwwroot/Images/Users/" + entity.ImageUrl, entity.ImageBase64);
        }
        #endregion
    }
}

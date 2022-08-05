using Account.Entities;
using Data.Constants;
using Data.Entities.UserManagement;
using System;

namespace Account.RepositoryLayer
{
    public class UserMapper
    {

        public static AppUser MapAppUser(RegisterRequestViewModel model)
        {
            return new AppUser
            {
                UserName = model.Username,
                Email = model.Email
            };
        }

        public static AppUser MapAppUser(UserProfileDTO model)
        {
            return new AppUser
            {
                UserName = model.UserName,
                Email = model.Email
            };
        }

        public static UserProfileDTO MapAppUser(AppUser appUser, UserProfile userProfile)
        {
            return new UserProfileDTO
            {
                Id = userProfile.Id,
                FirstName = userProfile.FirstName,
                LastName = userProfile.LastName,
                Mobile = userProfile.Mobile,
                JobTitle = userProfile.JobTitle,
                Email = appUser.Email,
                UserName = appUser.UserName,
                DefaultLanguage = userProfile.DefaultLanguage,
                Role = userProfile.Role,
                UserTypeId = (int)userProfile.UserTypeId,
                UserType = Enum.GetName(typeof(UserTypeEnum), userProfile.UserTypeId),
                AppUserId = appUser.Id,
                ImageUrl = userProfile.ImageUrl

            };
        }

        public static UserProfileDTO MapRegisterRequestViewModel(RegisterRequestViewModel registerRequestViewModel)
        {
            return new UserProfileDTO
            {
                FirstName = registerRequestViewModel.FirstName,
                LastName = registerRequestViewModel.LastName,
                Mobile = registerRequestViewModel.Mobile,
                JobTitle = registerRequestViewModel.JobTitle,
                UserName = registerRequestViewModel.Username,
                Email = registerRequestViewModel.Email,
                Password = registerRequestViewModel.Password,
                DefaultLanguage = registerRequestViewModel.DefaultLanguage,
                Role = Roles.Driver,
                UserTypeId = (int)UserTypeEnum.Driver //Default role is Driver not admin when user register his account
            };
        }

    }
}

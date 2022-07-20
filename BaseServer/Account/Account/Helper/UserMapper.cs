using Account.DataAccessLayer;
using Account.Entities;
using Account.Helper;
using Data.Constants;
using Data.Entities.Shared;
using Data.Entities.UserManagement;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

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
                Email = appUser.Email,
                UserName = appUser.UserName,
                DefaultLanguage = userProfile.DefaultLanguage,
                Role = userProfile.Role,
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
                UserName = registerRequestViewModel.Username,
                Email = registerRequestViewModel.Email,
                Password = registerRequestViewModel.Password,
                DefaultLanguage = registerRequestViewModel.DefaultLanguage,
                Role = Roles.Consumer//Default role is Consumer not admin when user register his account
            };
        }

    }
}

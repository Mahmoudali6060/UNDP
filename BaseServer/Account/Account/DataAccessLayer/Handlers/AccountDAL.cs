using Account.DataServiceLayer.Contracts;
using Account.Entities;
using Data.Constants;
using Data.Contexts;
using Data.Entities.Shared;
using Data.Entities.UserManagement;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Account.DataAccessLayer
{
    public class AccountDAL : IAccountDAL
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly AppDbContext _appDbContext;

        public AccountDAL(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, AppDbContext appDbContext)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _appDbContext = appDbContext;
        }


        public async Task<IdentityResult> CreateUserAsync(AppUser user, string password, string role)
        {
            var result = await _userManager.CreateAsync(user, password);
            await AddToRoleAsync(user, role);
            return result;
        }

        public async Task<SignInResult> IsValidUser(LoginModel loginModel)
        {
            return await _signInManager.PasswordSignInAsync(
             loginModel.UserName, loginModel.Password,
             isPersistent: false, lockoutOnFailure: false);
        }

        public async Task<AppUser> GetUserByUsername(LoginModel loginModel)
        {
            return await _userManager.FindByNameAsync(loginModel.UserName);
        }

        public async Task<IdentityResult> AddToRoleAsync(AppUser user, string role)
        {
            return await _userManager.AddToRoleAsync(user, role);
        }

        public async Task<IList<string>> GetRolesAsync(AppUser user)
        {
            return await _userManager.GetRolesAsync(user);
        }

        public async Task<UserProfile> GetLastUserAsync()
        {
            return await _appDbContext.UserProfiles.SingleOrDefaultAsync();
        }

        public async Task<bool> DeleteUser(string userId)
        {
            AppUser appUser = await _userManager.FindByIdAsync(userId);
            await _userManager.DeleteAsync(appUser);
            return true;
        }
    }
}


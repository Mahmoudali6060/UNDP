using Account.Entities;
using Data.Contexts;
using Data.Entities.UserManagement;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Account.DataAccessLayer
{
    public class AccountDAL : IAccountDAL
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly UNDbContext _appDbContext;

        public AccountDAL(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, UNDbContext appDbContext)
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

        public async Task<AppUser> FindByEmailAsync(string email)
        {
           var user = await _userManager.FindByEmailAsync(email);
            return user;
        }

        public async Task<string> GeneratePasswordResetTokenAsync(AppUser appUser)
        {
            var user = await _userManager.FindByEmailAsync(appUser.Email);
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            return token;
        }

        public async Task<IdentityResult> ResetPasswordAsync(AppUser appUser,string token , string password)
        {
            var resetPassResult = await _userManager.ResetPasswordAsync(appUser, token, password);
            return resetPassResult;
        }
    }
}


using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using IdentityServer4.Services;
using System.Linq;
using System;
using IdentityServer4.Stores;
using IdentityServer4.Models;
using IdentityServer4.Events;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Shared.Entities;
using Account.DataServiceLayer;
using Account.Entities;
using Shared.Entities.Shared;
using Setting.DataServiceLayer;

namespace App.Controllers.Account
{

    [Route("Api/Account")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        IAccountDSL _accountDSL;
        public AccountController(IAccountDSL accountDSL)
        {
            _accountDSL = accountDSL;

        }

        [HttpPost, Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel user) => Ok(await _accountDSL.Login(user));

        [HttpPost]
        [HttpPost, Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestViewModel model) => Ok(await _accountDSL.Register(model));
    }
}

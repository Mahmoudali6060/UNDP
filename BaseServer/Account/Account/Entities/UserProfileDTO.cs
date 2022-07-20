using System;
using System.Collections.Generic;
using System.Text;

namespace Account.Entities
{
    public class UserProfileDTO
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string DefaultLanguage { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
        public string AppUserId { get; set; }
        public string ImageBase64 { get; set; }
        public string ImageUrl { get; set; }


    }
}

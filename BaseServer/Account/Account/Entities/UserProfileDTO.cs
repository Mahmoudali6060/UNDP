using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Account.Entities
{
    public class UserProfileDTO
    {
        public long Id { get; set; }
        [Required]
        [StringLength(50, ErrorMessage = "Error.InvalidFirstName", MinimumLength = 2)]
        public string FirstName { get; set; }

     //   [StringLength(50, ErrorMessage = "Errors.InvalidLastName", MinimumLength = 2)]
        public string LastName { get; set; }

       // [Required]
       // [EmailAddress]
       // [RegularExpression("^[a-z0-9_\\+-]+(\\.[a-z0-9_\\+-]+)*@[a-z0-9-]+(\\.[a-z0-9]+)*\\.([a-z]{2,4})$", ErrorMessage = "Errors.InvalidEmail")]
        public string Email { get; set; }

      //  [Required]
        //[StringLength(50, ErrorMessage = "Errors.InvalidUserName", MinimumLength = 2)]
        public string UserName { get; set; }

      //  [Required]
      //  [DataType(DataType.Password)]
      //  [RegularExpression(@"^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)).+$")]
      //  [StringLength(100, ErrorMessage = "Errors.InvalidPassword", MinimumLength = 8)]
        public string Password { get; set; }
        public string DefaultLanguage { get; set; }

       // [Required]
      //  [StringLength(50, ErrorMessage = "Errors.InvalidRole", MinimumLength = 2)]
        public string Role { get; set; }
        public string Token { get; set; }
        public string AppUserId { get; set; }
        public string ImageBase64 { get; set; }
        public string ImageUrl { get; set; }


    }
}

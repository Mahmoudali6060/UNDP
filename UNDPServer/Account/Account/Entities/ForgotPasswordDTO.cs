using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Account.Entities
{
    public class ForgotPasswordDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string ClientURI { get; set; }
    }
}

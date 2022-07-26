using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FleetManagement.Entities
{
    public class CarRequestDTO
    {
        [Required(ErrorMessage = "Errors.RegistrarNameIsRequired")]
        public string RegistrarName { get; set; }

        [Required(ErrorMessage = "Errors.RegistrarEmailIsRequired")]
        [EmailAddress(ErrorMessage = "Errors.InvlidEmailAddress")]
        public string RegistrarEmail { get; set; }

        [Required(ErrorMessage = "Errors.DateFromIsRequired")]
        public string DateFrom { get; set; }

        [Required(ErrorMessage = "Errors.DateToIsRequired")]
        public string DateTo { get; set; }
        public string PickUp { get; set; }
        public string Destination { get; set; }
        public string Comments { get; set; }
        public string Purpose { get; set; }


    }
}

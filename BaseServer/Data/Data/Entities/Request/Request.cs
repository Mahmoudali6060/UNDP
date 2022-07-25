using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities.Request
{
    public class Request
    {
        public string RegistrarName { get; set; }
        public string RegistrarEmail { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public string PickUp { get; set; }
        public string Destination { get; set; }
        public string Comments { get; set; }
        public string Purpose { get; set; }

    }
}

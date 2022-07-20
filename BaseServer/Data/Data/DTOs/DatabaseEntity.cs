using System;
using System.Collections.Generic;
using System.Text;

namespace Database.Backup.DTOs
{
   public class DatabaseEntity
    {
        public string DatabaseName { get; set; }
        public string FilePath { get; set; }
        public string ConnectionString { get; set; }
    }
}

using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Shared.Entities.Shared;
using Data.Backup;
using Database.Backup.DTOs;

namespace App.Controllers.Authentication
{

    [Route("Api/Database")]
    [ApiController]
    public class DatabaseController : ControllerBase
    {

        IDatabaseBackupDSL _databaseDSL;

        public DatabaseController(IDatabaseBackupDSL databaseDSL)
        {
            _databaseDSL = databaseDSL;
        }

        [HttpPost, Route("BackupDatabase")]
        public IActionResult BackupDatabase(DatabaseEntity model) => Ok(_databaseDSL.BackupDatabase(model));
    }
}

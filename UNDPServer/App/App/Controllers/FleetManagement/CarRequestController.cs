using System.Threading.Tasks;
using FleetManagement.DataServiceLayer;
using FleetManagement.Entities;
using Microsoft.AspNetCore.Mvc;
using Shared.Entities.Shared;


namespace App.Controllers.FleetManagement
{
    [Route("Api/CarRequest")]
    [ApiController]
    //[Authorize(Roles = Roles.Admin)]
    public class CarRequestController : Controller
    {
        ICarRequestDSL _carRequestDSL;
        public CarRequestController(ICarRequestDSL carRequestDSL)
        {
            this._carRequestDSL = carRequestDSL;
        }

        [HttpPost, Route("GetAll")]
        //[Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> GetAll([FromBody] CarRequestSearchCriteriaDTO searchCriteriaDTO) => Ok(await _carRequestDSL.GetAll(searchCriteriaDTO));


        [HttpGet, Route("GetAllCarRequestTotalDetails")]
        //[Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> GetAllCarRequestTotalDetails() => Ok(await _carRequestDSL.GetAllCarRequestTotalDetails());

        [HttpGet, Route("GetById/{id}")]
        //[Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> GetById(long id) => Ok(await _carRequestDSL.GetById(id));

        [HttpGet, Route("GetAllLite")]
        //[Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> GetAllLite() => Ok(await _carRequestDSL.GetAllLite());

        [HttpPost, Route("Add")]
        //[Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> Add([FromBody] CarRequestDTO model) => Ok(await _carRequestDSL.Add(model));

        //[Authorize(Roles = Roles.Admin + "," + Roles.Consumer)]
        [HttpPost, Route("Update")]
        public async Task<IActionResult> Update(CarRequestDTO model) => Ok(await _carRequestDSL.Update(model));

        [HttpDelete, Route("Delete/{id}")]
        //[Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> Delete(int id) => Ok(await _carRequestDSL.Delete(id));


    }
}
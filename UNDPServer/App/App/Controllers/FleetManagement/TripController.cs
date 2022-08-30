using System.Threading.Tasks;
using FleetManagement.DataServiceLayer;
using FleetManagement.DataServiceLayer.Contracts;
using FleetManagement.Entities;
using Microsoft.AspNetCore.Mvc;
using Shared.Entities.Shared;


namespace App.Controllers.FleetManagement
{
    [Route("Api/Trip")]
    [ApiController]
    //[Authorize(Roles = Roles.Admin)]
    public class TripController : Controller
    {
        ITripDSL _tripDSL;
        public TripController(ITripDSL tripDSL)
        {
            this._tripDSL = tripDSL;
        }


        [HttpPost, Route("Add")]
        public async Task<IActionResult> Add([FromBody] TripDTO model) => Ok(await _tripDSL.Add(model));

        [HttpPost, Route("GetAll")]
        //[Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> GetAll([FromBody] TripSearchCriteriaDTO searchCriteriaDTO) => Ok(await _tripDSL.GetAll(searchCriteriaDTO));


        //[HttpGet, Route("GetAllTripTotalDetails")]
        ////[Authorize(Roles = Roles.Admin)]
        //public async Task<IActionResult> GetAllTripTotalDetails() => Ok(await _tripDSL.GetAllTripTotalDetails());

        //[HttpGet, Route("GetById/{id}")]
        ////[Authorize(Roles = Roles.Admin)]
        //public async Task<IActionResult> GetById(long id) => Ok(await _tripDSL.GetById(id));

        //[HttpGet, Route("GetAllLite")]
        ////[Authorize(Roles = Roles.Admin)]
        //public async Task<IActionResult> GetAllLite() => Ok(await _tripDSL.GetAllLite());

        ////[Authorize(Roles = Roles.Admin + "," + Roles.Consumer)]
        //[HttpPost, Route("Update")]
        //public async Task<IActionResult> Update(TripDTO model) => Ok(await _tripDSL.Update(model));

        //[HttpDelete, Route("Delete/{id}")]
        ////[Authorize(Roles = Roles.Admin)]
        //public async Task<IActionResult> Delete(int id) => Ok(await _tripDSL.Delete(id));


    }
}
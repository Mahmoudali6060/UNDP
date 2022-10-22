using FleetManagement.DataServiceLayer.Contracts;
using FleetManagement.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Controllers.FleetManagement
{
    [Route("Api/Car")]
    [ApiController]
    public class CarController : Controller
    {
            ICarDSL _carDSL;
            public CarController(ICarDSL carDSL)
            {
                this._carDSL = carDSL;
            }


            [HttpPost, Route("Add")]
            public async Task<IActionResult> Add([FromBody] CarDTO model) => Ok(await _carDSL.Add(model));

            [HttpPost, Route("GetAll")]
            //[Authorize(Roles = Roles.Admin)]
            public async Task<IActionResult> GetAll([FromBody] CarSearchCriteriaDTO searchCriteriaDTO) => Ok(await _carDSL.GetAll(searchCriteriaDTO));

            [HttpGet, Route("GetById/{id}")]
            //[Authorize(Roles = Roles.Admin)]
            public async Task<IActionResult> GetById(long id) => Ok(await _carDSL.GetById(id));

            [HttpGet, Route("GetAllLite")]
            //[Authorize(Roles = Roles.Admin)]
            public async Task<IActionResult> GetAllLite() => Ok(await _carDSL.GetAllLite());

            //[Authorize(Roles = Roles.Admin + "," + Roles.Consumer)]
            [HttpPost, Route("Update")]
            public async Task<IActionResult> Update(CarDTO model) => Ok(await _carDSL.Update(model));

            [HttpDelete, Route("Delete/{id}")]
            //[Authorize(Roles = Roles.Admin)]
            public async Task<IActionResult> Delete(int id) => Ok(await _carDSL.Delete(id));

        }
    }

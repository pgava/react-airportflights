using System;
using System.Collections.Generic;
using System.Linq;
using AirportFlights.Core.Data;
using AirportFlights.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace AirportFlights.Web.Controllers
{
    [Route("api/[controller]")]
    public class GateController : BaseApiController
    {
        public GateController(IFlightDataService flightService) : base(flightService)
        {
        }

        [HttpGet("[action]")]
        public IEnumerable<GateViewModel> GetAllFlights()
        {
            var gates = FlightService.GetAllFlights();
            return gates.Select(g => TheModelFactory.Create(g));
        }

        [HttpGet("{gid}", Name = "GetFlightsByGateId")]
        public IActionResult GetFlightsByGateId(int gid)
        {
            try
            {
                var gate = FlightService.GetFlightsByGateId(gid);
                if (gate == null)
                {
                    return NotFound();
                }

                return new ObjectResult(gate);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}

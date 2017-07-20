using System;
using System.Collections.Generic;
using System.Linq;
using AirportFlights.Core.Data;
using AirportFlights.Models;
using Microsoft.AspNetCore.Mvc;

namespace AirportFlights.Controllers
{
    [Route("api/[controller]")]
    public class GateController : BaseApiController
    {
        public GateController(IFlightDataService flightService) : base(flightService)
        {
        }

        //[HttpGet("[action]")]
        //public IEnumerable<GateViewModel> GetAllFlights()
        //{
        //    var gates = FlightService.GetAllFlights();
        //    return gates.Select(g => TheModelFactory.Create(g));
        //}

        [HttpGet("[action]")]
        public IEnumerable<FlightViewModel> GetAllFlights()
        {
            var gates = FlightService.GetAllFlights();
            return gates.First().Flights.Select(f => TheModelFactory.Create(f));
        }

        [HttpGet("[action]")]
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

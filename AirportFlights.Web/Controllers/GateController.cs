using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task<IEnumerable<GateViewModel>> GetAllFlights()
        {
            var gates = await FlightService.GetAllFlightsAsync();
            return gates.Select(g => TheModelFactory.Create(g));
        }

        [HttpGet("{gid}", Name = "GetFlightsByGateId")]
        public async Task<IActionResult> GetFlightsByGateId(int gid)
        {
            try
            {
                var gate = await FlightService.GetFlightsByGateIdAsync(gid);
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

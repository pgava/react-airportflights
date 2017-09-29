using System;
using System.Threading.Tasks;
using AirportFlights.Core.Data;
using AirportFlights.Core.Models;
using AirportFlights.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace AirportFlights.Web.Controllers
{
    [Route("api/[controller]")]
    public class FlightController : BaseApiController
    {
        public FlightController(IFlightDataService flightService) : base(flightService)
        {
        }

        [HttpGet]
        public FlightViewModel GetFlightById([FromQuery]int id)
        {
            var flight = FlightService.GetFlightById(id);
            return TheModelFactory.Create(flight);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]FlightViewModel flight)
        {
            try
            {
                var theGate = await FlightService.GetFlightsByGateIdAsync(flight.GateId);
                var theFlight = TheModelFactory.Create(flight);
                var flightId = FlightService.AddFlightToGate(theFlight, theGate);

                if (flightId == 0)
                {
                    return StatusCode(500, "Couldn't create flight.");
                }

                var created = FlightService.GetFlightById(flightId);
                return CreatedAtRoute("", created);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("{fid}")]
        public async Task<IActionResult> UpdateFlight(int fid, [FromBody]FlightViewModel flight)
        {
            try
            {
                var flightToUpdate = await FlightService.GetFlightByIdAsync(fid);
                if (flightToUpdate == null) return NotFound();

                if (flightToUpdate.GateId != flight.GateId)
                {
                    var gate = await FlightService.GetFlightsByGateIdAsync(flight.GateId);
                    if (!FlightService.MoveFlightToGate(flightToUpdate, gate))
                    {
                        return StatusCode(500, "cannot move flight.");
                    }
                }
                if (flightToUpdate.IsCancel != flight.IsCancel)
                {
                    FlightService.CancelFlight(flightToUpdate, flight.IsCancel);
                }
                else
                {
                    var flightClone = new Flight
                    {
                        Arrival = DateTime.Parse(flight.Arrival),
                        Departure = DateTime.Parse(flight.Departure),
                        Id = flightToUpdate.Id,
                        GateId = flightToUpdate.GateId,
                        Description = flight.Description,
                        FlightNumber = flight.FlightNumber,
                        IsCancel = flight.IsCancel
                    };
                    if (!FlightService.UpdateFlightTime(flightClone))
                    {
                        return StatusCode(500, "cannot save flight, check parameters are set correctly.");
                    }
                }
                return new NoContentResult();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}

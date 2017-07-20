using System;
using AirportFlights.Core.Models;
using AirportFlights.Models;
using Microsoft.AspNetCore.Mvc;

namespace AirportFlights.Controllers
{
    [Route("api/[controller]")]
    public class FlightController : BaseApiController
    {
        [HttpPost("[action]")]
        public IActionResult Create([FromBody]FlightViewModel flight)
        {
            try
            {
                var theGate = FlightService.GetFlightsByGateId(flight.GateId);
                var theFlight = TheModelFactory.Create(flight);
                var flightId = FlightService.AddFlightToGate(theFlight, theGate);

                if (flightId == 0)
                {
                    return BadRequest();
                }

                var created = FlightService.GetFlightById(flightId);
                return CreatedAtRoute("", created);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("[action]")]
        public IActionResult Update(int fid, [FromBody]FlightViewModel flight)
        {

            try
            {
                var flightToUpdate = FlightService.GetFlightById(fid);
                if (flightToUpdate == null) return NotFound();

                if (flightToUpdate.GateId != flight.GateId)
                {
                    var gate = FlightService.GetFlightsByGateId(flight.GateId);
                    if (!FlightService.MoveFlightToGate(flightToUpdate, gate))
                    {
                        return BadRequest();
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
                        Arrival = flight.Arrival.ToLocalTime(),
                        Departure = flight.Departure.ToLocalTime(),
                        Id = flightToUpdate.Id,
                        Description = flightToUpdate.Description,
                        FlightNumber = flightToUpdate.FlightNumber,
                        IsCancel = flightToUpdate.IsCancel,
                        GateId = flightToUpdate.GateId
                    };
                    if (!FlightService.UpdateFlightTime(flightClone))
                    {
                        return BadRequest();
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
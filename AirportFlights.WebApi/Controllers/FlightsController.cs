using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AirportFlights.Core.Data;
using AirportFlights.Core.Models;
using AirportFlights.Models;

namespace AirportFlights.Controllers
{
    public class FlightsController : BaseApiController
    {
        public FlightsController()
        {            
        }

        public FlightsController(IFlightDataService flightService) : base(flightService)
        {
        }

        public FlightsController(IFlightDataService flightService, IApiModelFactory modelFactory) 
            : base(flightService, modelFactory)
        {
        }

        [HttpPost]
        public HttpResponseMessage Create([FromBody]FlightViewModel flight)
        {
            try
            {
                var gate = FlightService.GetFlightsByGateId(flight.GateId);
                var flightId = FlightService.AddFlightToGate(TheModelFactory.Create(flight), gate);

                if (flightId == 0)
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, new Exception("Cannot update flight. Check time doesn't overlap"));
                }

                var created = FlightService.GetFlightById(flightId);
                return Request.CreateResponse(HttpStatusCode.Created, TheModelFactory.Create(created));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPut]
        public HttpResponseMessage Update(int fid, [FromBody]FlightViewModel flight)
        {
            try
            {
                var flightToUpdate = FlightService.GetFlightById(fid);
                if (flightToUpdate == null) return Request.CreateResponse(HttpStatusCode.NotFound);

                if (flightToUpdate.Gate.Id != flight.GateId)
                {
                    var gate = FlightService.GetFlightsByGateId(flight.GateId);
                    if (!FlightService.MoveFlightToGate(flightToUpdate, gate))
                    {
                        return Request.CreateResponse(HttpStatusCode.InternalServerError, new Exception("Cannot update flight. Check time doesn't overlap"));                        
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
                        Gate = flightToUpdate.Gate
                    };
                    if (!FlightService.UpdateFlightTime(flightClone))
                    {
                        return Request.CreateResponse(HttpStatusCode.InternalServerError, new Exception("Cannot update flight. Check time doesn't overlap"));
                    }
                }

                return Request.CreateResponse(HttpStatusCode.OK);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using AirportFlights.Core.Data;
using AirportFlights.Models;

namespace AirportFlights.Controllers
{
    public class GatesController : BaseApiController
    {
        public GatesController()
        {            
        }
        public GatesController(IFlightDataService flightService) : base(flightService)
        {
        }

        public GatesController(IFlightDataService flightService, IApiModelFactory modelFactory) 
            : base(flightService, modelFactory)
        {
        }

        [HttpGet]
        public IEnumerable<GateViewModel> GetAllFlights()
        {
            try
            {
                var gates = FlightService.GetAllFlights();
                return gates.Select(g => TheModelFactory.Create(g));
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetFlightsByGateId(int gid)
        {
            try
            {
                var gate = FlightService.GetFlightsByGateId(gid);
                if (gate == null)
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK, TheModelFactory.Create(gate));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }

        }
    }
}
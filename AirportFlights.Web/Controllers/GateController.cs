using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirportFlights.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace WebApplicationBasic.Controllers
{
    [Route("api/[controller]")]
    public class GateController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Flight> GetAllFlights()
        {
            return new List<Flight>
            {
                new Flight
                {
                    Id = 1,
                    FlightNumber = "QA-12354",
                    Arrival = DateTime.Now,
                    Departure = DateTime.Now,
                    Description = "Fly asd"
                },
                new Flight
                {
                    Id = 2,
                    FlightNumber = "AL-h773b",
                    Arrival = DateTime.Now,
                    Departure = DateTime.Now,
                    Description = "Aly htc"
                }
            };        
        }

        [HttpGet("[action]")]
        public Gate GetFlightsByGateId(int startDateIndex)
        {
            return new Gate
            {
                Id = 1,
                Name = "Gate1",
                Flights = new List<Flight>
                {
                    new Flight
                    {
                        Id = 1,
                        FlightNumber = "asd",
                        Arrival = DateTime.Now,
                        Departure = DateTime.Now,
                        Description = "addd"
                    }
                }
            };
        }
    }
}

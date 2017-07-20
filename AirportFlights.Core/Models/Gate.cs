using System.Collections;
using System.Collections.Generic;
using System.Dynamic;
using AirportFlights.Core.Data;

namespace AirportFlights.Core.Models
{
    public class Gate : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<Flight> Flights { get; set; }
    }
}

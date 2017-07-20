using System;
using AirportFlights.Core.Data;

namespace AirportFlights.Core.Models
{
    public class Flight : IEntity
    {
        public int Id { get; set; }

        public string FlightNumber { get; set; }
        public string Description { get; set; }

        public Gate Gate { get; set; }

        public DateTime Arrival { get; set; }
        public DateTime Departure { get; set; }

        public bool IsCancel { get; set; }
    }
}

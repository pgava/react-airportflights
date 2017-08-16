using System.Collections.Generic;

namespace AirportFlights.Web.Models
{
    public class GateViewModel
    {
        public string Url { get; set; }
        public int GateId { get; set; }
        public string GateName { get; set; }
        public IEnumerable<FlightViewModel> Flights { get; set; }
    }
}
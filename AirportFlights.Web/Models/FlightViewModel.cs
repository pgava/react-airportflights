namespace AirportFlights.Web.Models
{
    public class FlightViewModel
    {
        public string Url { get; set; }
        public int GateId { get; set; }
        public int FlightId { get; set; }
        public string FlightNumber { get; set; }
        public string Description { get; set; }
        public string Arrival { get; set; }
        public string Departure { get; set; }
        public bool IsCancel { get; set; }
    }
}
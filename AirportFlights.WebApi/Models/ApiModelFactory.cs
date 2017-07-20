using System;
using System.Linq;
using System.Net.Http;
using System.Web.Http.Routing;
using AirportFlights.Core.Models;
using Microsoft.AspNetCore.Mvc.Routing;

namespace AirportFlights.Models
{
    public interface IApiModelFactory
    {
        GateViewModel Create(Gate flight);
        FlightViewModel Create(Flight flight);
        Flight Create(FlightViewModel flight);
    }

    public class ApiModelFactory : IApiModelFactory
    {
        private UrlHelper _urlHelper;

        public ApiModelFactory(HttpRequestMessage request)
        {
            _urlHelper = new UrlHelper(request);

        }

        public GateViewModel Create(Gate gate)
        {
            return new GateViewModel
            {
                Url = _urlHelper.Link("Gates", new {gid = gate.Id}),
                GateId = gate.Id,
                GateName = gate.Name,
                Flights = gate.Flights
                    .ToList()
                    .Select(f => Create(f))
            };
        }

        public FlightViewModel Create(Flight flight)
        {
            return new FlightViewModel
            {
                Url = _urlHelper.Link("Flights", new { fid = flight.Id }),
                GateId = flight.Gate.Id,
                FlightId = flight.Id,
                FlightNumber = flight.FlightNumber,
                IsCancel = flight.IsCancel,
                Arrival = flight.Arrival,
                Departure = flight.Departure
            };
        }

        public Flight Create(FlightViewModel flight)
        {
            return new Flight
            {
                Id = flight.FlightId,
                FlightNumber = flight.FlightNumber,
                IsCancel = flight.IsCancel,
                Arrival = new DateTime(2010, 1, 1, flight.Arrival.ToLocalTime().Hour, flight.Arrival.ToLocalTime().Minute, 0, DateTimeKind.Local),
                Departure = new DateTime(2010, 1, 1, flight.Departure.ToLocalTime().Hour, flight.Departure.ToLocalTime().Minute, 0, DateTimeKind.Local)
            };
        }
    }
}
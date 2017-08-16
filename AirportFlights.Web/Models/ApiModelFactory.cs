using System;
using System.Linq;
using AirportFlights.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;

namespace AirportFlights.Web.Models
{
    public interface IApiModelFactory
    {
        GateViewModel Create(Gate flight);
        FlightViewModel Create(Flight flight);
        Flight Create(FlightViewModel flight);
    }

    public class ApiModelFactory : IApiModelFactory
    {
        private readonly UrlHelper _urlHelper;

        public ApiModelFactory()
        {
            _urlHelper = new UrlHelper(new ActionContext());

        }

        public GateViewModel Create(Gate gate)
        {
            return new GateViewModel
            {
                //Url = _urlHelper.Link("Gates", new {gid = gate.Id}),
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
                //Url = _urlHelper.Link("Flights", new { fid = flight.Id }),
                GateId = flight.GateId,
                FlightId = flight.Id,
                FlightNumber = flight.FlightNumber,
                Description = string.IsNullOrWhiteSpace(flight.Description) ? "" : flight.Description,
                IsCancel = flight.IsCancel,
                Arrival = flight.Arrival.ToString("MM/dd/yyyy HH:mm"),
                Departure = flight.Departure.ToString("MM/dd/yyyy HH:mm")
            };
        }

        public Flight Create(FlightViewModel flight)
        {
            return new Flight
            {
                Id = flight.FlightId,
                FlightNumber = flight.FlightNumber,
                IsCancel = flight.IsCancel,
                Description = string.IsNullOrWhiteSpace(flight.Description) ? "" : flight.Description,
                Arrival = DateTime.Parse(flight.Arrival),
                Departure = DateTime.Parse(flight.Departure)
            };
        }
    }
}
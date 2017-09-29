using System;
using System.Collections.Generic;
using System.Linq;
using AirportFlights.Core.Data;
using AirportFlights.Core.Models;

namespace AirportFlights.Infra.Fake
{
    public class InMemoryUnitOfWork : IUnitOfWork
    {

        public bool Committed { get; set; }

        public InMemoryUnitOfWork()
        {
            Committed = false;

            var gates = new InMemoryRepository<Gate>(GateRepository());
            var flights = new InMemoryRepository<Flight>(FlightRepository());

            Gates = gates;
            Flights = flights;
            Commit();
        }

        public IRepository<Gate> Gates
        {
            get;
            set;
        }

        public IRepository<Flight> Flights
        {
            get;
            set;
        }

        public void Commit()
        {
            foreach (var gate in Gates.GetAll())
            {
                gate.Flights = Flights.GetAll().Where(f => f.GateId == gate.Id).OrderBy(f => f.Arrival);
            }

            Committed = true;
        }

        private List<Gate> GateRepository()
        {
            return new List<Gate>
            {
                new Gate
                {
                    Id = 1,
                    Name = "Gate 1",
                    Flights = new List<Flight>()
                },
                new Gate
                {
                    Id = 2,
                    Name = "Gate 2",
                    Flights = new List<Flight>()
                }
            };
        }

        private List<Flight> FlightRepository()
        {
            var flights = new List<Flight>
            {
                new Flight
                {
                    Id = 1,
                    GateId = GateRepository()[0].Id,
                    Description = string.Empty,
                    FlightNumber = "abc123",
                    IsCancel = false,
                    Arrival = new DateTime(2010, 1, 1, 11, 0, 0, DateTimeKind.Local),
                    Departure = new DateTime(2010, 1, 1, 11, 29, 0, DateTimeKind.Local)
                },
                new Flight
                {
                    Id = 2,
                    GateId = GateRepository()[0].Id,
                    Description = string.Empty,
                    FlightNumber = "abc466",
                    IsCancel = false,
                    Arrival = new DateTime(2010, 1, 1, 12, 0, 0, DateTimeKind.Local),
                    Departure = new DateTime(2010, 1, 1, 12, 29, 0, DateTimeKind.Local)
                },
                new Flight
                {
                    Id = 3,
                    GateId = GateRepository()[0].Id,
                    Description = string.Empty,
                    FlightNumber = "sdfg345",
                    IsCancel = false,
                    Arrival = new DateTime(2010, 1, 1, 16, 0, 0, DateTimeKind.Local),
                    Departure = new DateTime(2010, 1, 1, 16, 29, 0, DateTimeKind.Local)
                },
                new Flight
                {
                    Id = 4,
                    GateId = GateRepository()[1].Id,
                    Description = string.Empty,
                    FlightNumber = "sdf567",
                    IsCancel = false,
                    Arrival = new DateTime(2010, 1, 1, 9, 0, 0),
                    Departure = new DateTime(2010, 1, 1, 9, 29, 0)
                },
                new Flight
                {
                    Id = 5,
                    GateId = GateRepository()[1].Id,
                    Description = string.Empty,
                    FlightNumber = "jki657",
                    IsCancel = false,
                    Arrival = new DateTime(2010, 1, 1, 17, 0, 0),
                    Departure = new DateTime(2010, 1, 1, 17, 29, 0)
                }
            };

            return flights;
        }
    }
}

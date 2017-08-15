using System;
using System.Collections.Generic;
using System.Linq;
using AirportFlights.Core.Data;
using AirportFlights.Core.Models;

namespace AirportFlights.Infra.Services
{
    public class FlightDataService : IFlightDataService
    {
        private IUnitOfWork UnitOfWork { get; set; }

        public FlightDataService(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }

        public IEnumerable<Gate> GetAllFlights()
        {
            return UnitOfWork.Gates.GetAll().ToList();
        }

        public Gate GetFlightsByGateId(int gateId)
        {
            return UnitOfWork.Gates.Find(g => g.Id == gateId).FirstOrDefault();
        }

        public Flight GetFlightById(int flightId)
        {
            return UnitOfWork.Flights.Find(f => f.Id == flightId).FirstOrDefault();
        }

        public void CancelFlight(Flight flight, bool cancelFlag)
        {
            CheckInputData(flight);

            var flightData = UnitOfWork.Flights.Find(f => f.Id == flight.Id).FirstOrDefault();
            if (flightData != null)
            {
                flightData.IsCancel = cancelFlag;
                UnitOfWork.Commit();
            }
        }

        public int AddFlightToGate(Flight flight, Gate gate)
        {
            CheckInputData(flight);
            CheckInputData(gate);

            if (CanAddFlightToGate(flight, gate.Id))
            {
                flight.GateId = gate.Id;
                UnitOfWork.Flights.Add(flight);
                UnitOfWork.Commit();

                return flight.Id;
            }

            return 0;
        }

        public bool MoveFlightToGate(Flight flight, Gate gate)
        {
            CheckInputData(flight);
            CheckInputData(gate);

            if (CanAddFlightToGate(flight, gate.Id))
            {
                flight.GateId = gate.Id;
                UnitOfWork.Commit();

                return true;
            }

            return false;
        }

        public bool UpdateFlightTime(Flight flight)
        {
            CheckInputData(flight);

            var flightData = UnitOfWork.Flights.Find(f => f.Id == flight.Id).First();
            if (flightData == null)
            {
                return false;
            }

            if (CanAddFlightToGate(flight, flightData.GateId))
            {
                flightData.Description = flight.Description;
                flightData.Arrival = flight.Arrival;
                flightData.Departure = flight.Departure;
                UnitOfWork.Commit();

                return true;
            }

            return false;
        }

        private bool CanAddFlightToGate(Flight flight, int gateId)
        {
            var flights = GetFlightsByGateId(gateId)
                .Flights
                .Where(f => f.Id != flight.Id)
                .ToList();

            if (!flights.Any() || flight.Departure < flights.First().Arrival)
            {
                return true;
            }

            if (flights.Last().Departure < flight.Arrival)
            {
                return true;
            }

            for (int i = 0; i < flights.Count - 1; i++)
            {
                if (flights.Skip(i).First().Departure < flight.Arrival &&
                    flight.Departure < flights.Skip(i + 1).First().Arrival)
                {
                    return true;
                }
            }

            return false;
        }

        private void CheckInputData(Flight flight)
        {
            if (flight == null)
            {
                throw new ArgumentNullException();
            }
        }

        private void CheckInputData(Gate gate)
        {
            if (gate == null)
            {
                throw new ArgumentNullException();
            }
        }
    }
}

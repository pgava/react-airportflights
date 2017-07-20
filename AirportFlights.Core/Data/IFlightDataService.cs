using System.Collections.Generic;
using AirportFlights.Core.Models;

namespace AirportFlights.Core.Data
{
    public interface IFlightDataService
    {
        IEnumerable<Gate> GetAllFlights();
        Gate GetFlightsByGateId(int gateId);
        Flight GetFlightById(int flightId);
        void CancelFlight(Flight flight, bool cancelFlag);
        int AddFlightToGate(Flight flight, Gate gate);
        bool MoveFlightToGate(Flight flight, Gate gate);
        bool UpdateFlightTime(Flight flight);
    }
}

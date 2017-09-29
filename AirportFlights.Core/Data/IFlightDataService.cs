using System.Collections.Generic;
using System.Threading.Tasks;
using AirportFlights.Core.Models;

namespace AirportFlights.Core.Data
{
    public interface IFlightDataService
    {
        IEnumerable<Gate> GetAllFlights();
        Task<IEnumerable<Gate>> GetAllFlightsAsync();
        Gate GetFlightsByGateId(int gateId);
        Task<Gate> GetFlightsByGateIdAsync(int gateId);
        Flight GetFlightById(int flightId);
        Task<Flight> GetFlightByIdAsync(int flightId);
        void CancelFlight(Flight flight, bool cancelFlag);
        int AddFlightToGate(Flight flight, Gate gate);
        bool MoveFlightToGate(Flight flight, Gate gate);
        bool UpdateFlightTime(Flight flight);
    }
}

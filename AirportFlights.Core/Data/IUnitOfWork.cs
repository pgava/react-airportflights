using AirportFlights.Core.Models;

namespace AirportFlights.Core.Data
{
    public interface IUnitOfWork
    {
        IRepository<Gate> Gates { get; }
        IRepository<Flight> Flights { get; }
        void Commit();
    }
}

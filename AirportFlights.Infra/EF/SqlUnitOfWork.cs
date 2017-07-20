using System.Data.Entity.Core.Objects;
using AirportFlights.Core.Data;
using AirportFlights.Core.Models;

namespace AirportFlights.Infra.EF
{
    public class SqlUnitOfWork : IUnitOfWork
    {
        private ObjectContext _context;
        private IRepository<Gate> _gates;
        private IRepository<Flight> _flights;
        private DataEntities _contextEntities;

        public SqlUnitOfWork()
        {
            _contextEntities = new DataEntities();
            _context = _contextEntities.GetObjectContext();
            _context.ContextOptions.LazyLoadingEnabled = true;
        }

        public IRepository<Gate> Gates
        {
            get { return _gates ?? (_gates = new SqlRepository<Gate>(_context)); }
        }

        public IRepository<Flight> Flights
        {
            get { return _flights ?? (_flights = new SqlRepository<Flight>(_context)); }
        }

        public void Commit()
        {
            _context.SaveChanges();
        }
    }
}

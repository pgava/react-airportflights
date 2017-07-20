using System.Data.Entity;
using AirportFlights.Core.Models;

namespace AirportFlights.Infra.EF
{
    public class DataEntities : DbContext
    {
        public DbSet<Gate> Gates { get; set; }
        public DbSet<Flight> Flights { get; set; }

        public DataEntities() : base("TestEFDb")
        {
            //Database.SetInitializer<DataEntities>(new DropCreateDatabaseAlways<DataEntities>());
            Database.SetInitializer(new CreateDatabaseIfNotExists<DataEntities>());
        }
    }
}

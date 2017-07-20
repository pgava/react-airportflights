using System.Web.Http;
using AirportFlights.Core.Data;
using AirportFlights.Models;

namespace AirportFlights.Controllers
{
    public class BaseApiController : ApiController
    {
        protected IFlightDataService FlightService;

        private IApiModelFactory _apiModelFactory;

        protected IApiModelFactory TheModelFactory
        {
            get
            {
                if (_apiModelFactory == null)
                {
                    _apiModelFactory = new ApiModelFactory(Request);
                }

                return _apiModelFactory;
            }
            private set { _apiModelFactory = value; }
        }
        
        public BaseApiController()
        {
        }

        public BaseApiController(IFlightDataService flightService)
        {
            FlightService = flightService;
        }

        public BaseApiController(IFlightDataService flightService, IApiModelFactory modelFactory)
        {
            FlightService = flightService;
            TheModelFactory = modelFactory;
        }        
    }
}
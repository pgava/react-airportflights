using AirportFlights.Core.Data;
using AirportFlights.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace AirportFlights.Web.Controllers
{
    public class BaseApiController : Controller
    {
        protected IFlightDataService FlightService;

        private IApiModelFactory _apiModelFactory;

        protected IApiModelFactory TheModelFactory
        {
            get
            {
                if (_apiModelFactory == null)
                {
                    _apiModelFactory = new ApiModelFactory();
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
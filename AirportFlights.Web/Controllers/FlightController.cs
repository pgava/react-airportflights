using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebApplicationBasic.Controllers
{
    [Route("api/[controller]")]
    public class FlightController : Controller
    {
        [HttpPost("[action]")]
        public IEnumerable<int> Create(int startDateIndex)
        {

            return null;
        }

        [HttpPut("[action]")]
        public IEnumerable<int> Update(int startDateIndex)
        {

            return null;
        }


    }
}

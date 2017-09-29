using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AirportFlights.Core.Data
{
    public interface IRepository<T>
        where T : class, IEntity
    {
        void Add(T newElement);
        void Remove(T delElement);

        IEnumerable<T> Find(Expression<Func<T, bool>> pre);
        IEnumerable<T> GetAll();

        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> pre);
        Task<IEnumerable<T>> GetAllAsync();
        
        /*
         * T FindById(int id);
         */
    }
}

using System;
using System.Linq;
using System.Linq.Expressions;

namespace AirportFlights.Core.Data
{
    public interface IRepository<T>
        where T : class, IEntity
    {
        void Add(T newElement);
        void Remove(T delElement);

        IQueryable<T> Find(Expression<Func<T, bool>> pre);
        IQueryable<T> GetAll();

        /*
         * T FindById(int id);
         */
    }
}

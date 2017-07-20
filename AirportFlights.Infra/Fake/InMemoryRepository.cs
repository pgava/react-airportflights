using System;
using System.Collections.Generic;
using System.Linq;
using AirportFlights.Core.Data;

namespace AirportFlights.Infra.Fake
{
    public class InMemoryRepository<T> : IRepository<T>
        where T : class, IEntity
    {
        private HashSet<T> _set;
        private IQueryable<T> _queryableSet;
        public InMemoryRepository() : this(Enumerable.Empty<T>())
        {            
        }

        public InMemoryRepository(IEnumerable<T> entities)
        {
            _set = new HashSet<T>();
            foreach (var entity in entities)
            {
                _set.Add(entity);
            }

            _queryableSet = _set.AsQueryable();
        }

        public void Add(T newEntity)
        {
            newEntity.Id = _queryableSet.Count() + 1;
            _set.Add(newEntity);
        }

        public void Remove(T entity)
        {
            _set.Remove(entity);
        }

        public IQueryable<T> Find(System.Linq.Expressions.Expression<Func<T, bool>> pre)
        {
            return _queryableSet.Where(pre);
        }

        public IQueryable<T> GetAll()
        {
            return _queryableSet;
        }
    }
}

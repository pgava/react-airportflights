using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
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

        public IEnumerable<T> Find(Expression<Func<T, bool>> pre)
        {
            return _queryableSet.Where(pre);
        }

        public IEnumerable<T> GetAll()
        {
            return _queryableSet;
        }

        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> pre)
        {
            return await _queryableSet.Where(pre).ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _queryableSet.ToListAsync();
        }
    }
}

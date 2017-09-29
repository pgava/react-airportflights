using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Threading.Tasks;
using AirportFlights.Core.Data;

namespace AirportFlights.Infra.EF
{
    public class SqlRepository<T> : IRepository<T>
        where T : class, IEntity
    {
        private ObjectSet<T> _objectSet;
        public SqlRepository(ObjectContext context)
        {
            _objectSet = context.CreateObjectSet<T>();
        }

        public void Add(T newEntity)
        {
            _objectSet.AddObject(newEntity);
        }

        public void Remove(T entity)
        {
            _objectSet.DeleteObject(entity);
        }

        public IEnumerable<T> Find(System.Linq.Expressions.Expression<Func<T, bool>> pre)
        {
            return _objectSet.AsNoTracking().Where(pre);
        }

        public IEnumerable<T> GetAll()
        {
            return _objectSet;
        }

        public async Task<IEnumerable<T>> FindAsync(System.Linq.Expressions.Expression<Func<T, bool>> pre)
        {
            return await _objectSet.AsNoTracking().Where(pre).ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _objectSet.ToListAsync();
        }
    }
}

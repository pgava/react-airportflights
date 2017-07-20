using System;
using System.Data.Entity.Core.Objects;
using System.Linq;
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

        public IQueryable<T> Find(System.Linq.Expressions.Expression<Func<T, bool>> pre)
        {
            return _objectSet.Where(pre);
        }

        public IQueryable<T> GetAll()
        {
            return _objectSet;
        }
    }
}

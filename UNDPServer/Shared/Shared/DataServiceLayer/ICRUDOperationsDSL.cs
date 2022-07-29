using Shared.Entities;
using Shared.Entities.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataServiceLayer
{
    public interface ICRUDOperationsDSL<T>
    {
        Task<ResponseEntityList<T>> GetAll(DataSource dataSource);
        Task<ResponseEntityList<T>> GetAllLite();
        Task<T> GetById(long id);
        Task<long> Add(T entity);
        Task<long> Update(T entity);
        Task<bool> Delete(long id);
    }
}

using Account.Entities;
using Data.Entities.UserManagement;
using Shared.DataServiceLayer;
using Shared.Entities.Shared;
using System.Threading.Tasks;

namespace Accout.DataServiceLayer
{
    public interface IUserProfileDSL : ICRUDOperationsDSL<UserProfileDTO, UserProfileSearchCriteriaDTO>
    {
        Task<UserProfile> GetUserProfileByAppUserId(string appUserId);
    }
}

using Account.DataAccessLayer;
using Account.DataServiceLayer;
using Account.DataServiceLayer.Contracts;
using Account.DataServiceLayer.Handlers;
using Accout.DataServiceLayer;
//using Data.Backup;
using Infrastructure.Contracts;
using Infrastructure.Handlers;
using Microsoft.Extensions.DependencyInjection;
using Setting.DataAccessLayer;
using Setting.DataServiceLayer;
namespace App.Helper
{
    public class DependencyInjection
    {
        public static void AddTransient(IServiceCollection services)
        {
            services.AddTransient<IAccountDSL, AccountDSL>();
            services.AddTransient<IAccountDAL, AccountDAL>();

            services.AddTransient<ISettingDSL, SettingDSL>();
            services.AddTransient<ISettingDAL, SettingDAL>();


            //services.AddTransient<IDatabaseBackupDSL, DatabaseBackupDSL>();

            services.AddTransient<ILoggerManager, LoggerManager>();

            services.AddTransient<IFileManager, FileManager>();

            services.AddTransient<IUserProfileDAL, UserProfileDAL>();
            services.AddTransient<IUserProfileDSL, UserProfileDSL>();

        }
    }
}

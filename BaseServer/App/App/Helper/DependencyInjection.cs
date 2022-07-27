using Account.DataAccessLayer;
using Account.DataServiceLayer;
using Account.DataServiceLayer.Contracts;
using Account.DataServiceLayer.Handlers;
using Accout.DataServiceLayer;
using FleetManagement.DataAccessLayer;
using FleetManagement.DataServiceLayer;
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
            #region Settings
            services.AddTransient<ISettingDSL, SettingDSL>();
            services.AddTransient<ISettingDAL, SettingDAL>();
            //services.AddTransient<IDatabaseBackupDSL, DatabaseBackupDSL>();
            #endregion

            #region Infrastructure
            services.AddTransient<ILoggerManager, LoggerManager>();
            services.AddTransient<IFileManager, FileManager>();
            #endregion

            #region User Management
            services.AddTransient<IAccountDSL, AccountDSL>();
            services.AddTransient<IAccountDAL, AccountDAL>();

            services.AddTransient<IUserProfileDAL, UserProfileDAL>();
            services.AddTransient<IUserProfileDSL, UserProfileDSL>();

            services.AddTransient<IEmailSender, EmailSender>();

            #endregion

            #region Fleet Management
            services.AddTransient<ICarRequestDAL, CarRequestDAL>();
            services.AddTransient<ICarRequestDSL, CarRequestDSL>();
            #endregion



        }
    }
}

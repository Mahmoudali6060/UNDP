using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Shared.Interfaces;
using Shared.Entities.Shared;
using System.Linq.Expressions;
using System.Reflection;
using System.Globalization;

namespace Shared.Classes
{
    public static class Helper
    {
        public static string SerializeObject(object obj)
        {
            return JsonConvert.SerializeObject(obj, Formatting.None,
                         new JsonSerializerSettings()
                         {
                             ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                         });
        }
        public static void DetachLocal<T>(this DbContext context, T entity) where T : class, IIDInterface
        {
            var local = context.Set<T>()
                .Local
                .FirstOrDefault(entry => entry.Id.Equals(entity.Id));
            if (local != null)
            {
                context.Entry(local).State = EntityState.Detached;
            }
        }
        public static void WriteLog(string strLog)
        {
            StreamWriter log;
            FileStream fileStream = null;
            DirectoryInfo logDirInfo = null;
            FileInfo logFileInfo;

            string logFilePath = "E:\\Logs\\";
            logFilePath = logFilePath + "Log-" + System.DateTime.Today.ToString("MM-dd-yyyy") + "." + "txt";
            logFileInfo = new FileInfo(logFilePath);
            logDirInfo = new DirectoryInfo(logFileInfo.DirectoryName);
            if (!logDirInfo.Exists) logDirInfo.Create();
            if (!logFileInfo.Exists)
            {
                fileStream = logFileInfo.Create();
            }
            else
            {
                fileStream = new FileStream(logFilePath, FileMode.Append);
            }
            log = new StreamWriter(fileStream);
            log.WriteLine(strLog);
            log.Close();
        }

        public static ResponseEntityList<TType> ToResult<TType>(IQueryable<TType> data, int total, DataSource dataSource)
        {

            if (dataSource.Filter != null && dataSource.Filter.Count > 0)
            {

                Expression FinalExpression = null;
                ParameterExpression parameter = Expression.Parameter(typeof(TType));
                // we will loop through the filters
                foreach (var filter in dataSource.Filter)
                {
                    // find the property of a given name
                    var property = typeof(TType).GetProperty(filter.Key, BindingFlags.Instance | BindingFlags.Public);
                    if (property == null) continue;

                    // create the ParameterExpression
                    //parameter = Expression.Parameter(typeof(TType));
                    // and use that expression to get the expression of a property
                    // like: x.SampleProperty1
                    var memberExpression = Expression.Property(parameter, property);

                    // Convert object type to the actual type of the property
                    var value = Convert.ChangeType(filter.Value, property.PropertyType, CultureInfo.InvariantCulture);

                    // Construct equal expression that compares MemberExpression for the property with converted value
                    var eq = Expression.Call(memberExpression, typeof(string).GetMethod("Contains", new[] { typeof(string) }), Expression.Constant(value));

                    // Build lambda expresssion (x => x.SampleProperty == some-value)
                    // var lambdaExpression = Expression.Lambda<Func<TType, bool>>(eq, parameter);
                    if (FinalExpression == null)
                        FinalExpression = eq;
                    else
                        FinalExpression = Expression.And(FinalExpression, eq);
                    // And finally use the expression to filter the collection

                }
                var lambdaExpression = Expression.Lambda<Func<TType, bool>>(FinalExpression, parameter);
                data = data.Where(lambdaExpression);
            }
            try
            {
                return new ResponseEntityList<TType>
                {

                    List = data.Skip((dataSource.Page - 1) * dataSource.PageSize),
                    Total = total
                };
            }
            catch (Exception ex)
            {
                return null;
            }

        }




    }
}



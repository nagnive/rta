using System;
using System.Collections.Generic;
using System.Linq;
using api.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace api.Data
{
    public class TestData
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<UserInfoContext>();
                context.Database.EnsureCreated();
                //context.Database.Migrate();

                // Look for any ailments
                if (context.UserInfos != null && context.UserInfos.Any())
                    return;   // DB has already been seeded

                var userInfos = TestData.GetUserInfos().ToArray();
                context.UserInfos.AddRange(userInfos);
                context.SaveChanges();
            }
        }

        public static List<UserInfo> GetUserInfos()
        {
            List<UserInfo> lstUserInfo = new List<UserInfo>() {
                    new UserInfo{ Address1 = "Test Address", Address2 = "Test Address2", Email = "naguaddi@gmail.com", FirstName = "Admin",
                    LastName = "Admin", Mobile = "989821140", UserRole = "SuperUser", Status = 3}
            };
            return lstUserInfo;
        }
    }
}
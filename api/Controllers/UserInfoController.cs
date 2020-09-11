using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using api.Models;
using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserInfoController : ControllerBase
    {
        private readonly ILogger<UserInfoController> _logger;
        private readonly UserInfoContext _context;
         public UserInfoController(UserInfoContext context, ILogger<UserInfoController> logger)
        {
            _context = context;
             _logger = logger;
        }

        [HttpGet("approvalusers/{userrole}")]
        public string GetApprovalUsers(string userRole)
        {
            var user = new List<UserInfo>();
            userRole = userRole.ToLower();
            if(userRole == Constants.SUPERUSER)
            {
                user = _context.UserInfos.Where(user => user.Status == Constants.APPROVEUSER ).ToList();
            }
            else if(userRole == Constants.ADMINUSER)
            {
                user = _context.UserInfos.Where(user => user.Status == Constants.NEWUSER ).ToList();
            }

            if (user == null)
                return string.Empty;
            return Newtonsoft.Json.JsonConvert.SerializeObject(user).ToString();
        }

        [HttpGet("getuser/{id}")]
        public string GetUser(int id)
        {
            var user = _context.UserInfos.Where(user => user.UserId == id).FirstOrDefault();

            if (user == null)
                return string.Empty;

            return Newtonsoft.Json.JsonConvert.SerializeObject(user).ToString();
        }

        [HttpGet("getallusers")]
        public string GetAllUsers()
        {
            var user = _context.UserInfos.ToList();
            if (user == null)
                return string.Empty;
            return Newtonsoft.Json.JsonConvert.SerializeObject(user).ToString();
        }

        [HttpPost("auth")]
        public bool AuthUser(AuthReq authreq)
        {
            var user = _context.UserInfos.Where(user => user.UserRole == authreq.UserRole.ToLower() 
            // && user.LastName == authreq.UserName.ToLower() 
            && user.Status == Constants.ACTIVE).FirstOrDefault();
            if(user != null)
                return true;
            else
                return false;
        }

        [HttpPost]
        public string AddUser(UserInfo objUserInfo)
        {
            objUserInfo.Status = Constants.NEWUSER;
            _context.UserInfos.AddRange(objUserInfo);
            _context.SaveChanges();
            return "Success";
        }

        [HttpPut("approvedeny/{userrole}/{id}")]
        public string ApproveUser(string userrole, int id, UserInfo objUserInfo)
        {
            userrole = userrole.ToLower();
            if(userrole == Constants.NORMALUSER)
            {
                return "Failed";
            }

            if (id != objUserInfo.UserId)
            {
                return "Failed";
            }

             _context.Entry(objUserInfo).State = EntityState.Modified;
            var saved = false;
            while (!saved)
            {
                try
                {
                    _context.SaveChanges();
                    saved = true;
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    foreach (var entry in ex.Entries)
                    {
                        if (entry.Entity is UserInfo)
                        {
                            var proposedValues = entry.CurrentValues;
                            var databaseValues = entry.GetDatabaseValues();

                            foreach (var property in proposedValues.Properties)
                            {
                                var proposedValue = proposedValues[property];
                                var databaseValue = databaseValues[property];
                            }
                            entry.OriginalValues.SetValues(databaseValues);
                        }
                    }
                }
            }       
            return "Success";
        }
    }
}

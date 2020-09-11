using System;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
public class UserInfo{
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string UserRole { get; set; }
        public int Status { get; set; }
        [Key]
        public int UserId { get; set; }
    }
}
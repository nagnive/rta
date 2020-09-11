using System;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public static class Constants
    {
        public const string NORMALUSER = "normaluser";
        public const string ADMINUSER = "adminuser";
        public const string SUPERUSER = "superuser";
        public const int INACTIVE = 0;
        public const int ACTIVE = 1;
        public const int APPROVEUSER = 3;
        public const int NEWUSER = 4;

    }
}
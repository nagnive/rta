using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class UserInfoContext : DbContext {
        public UserInfoContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder) {
            builder.Entity<UserInfo>().Property(p => p.UserId).HasMaxLength(40);

            builder.Entity<UserInfo>().ToTable("UserInfo");
        }

        public DbSet<UserInfo> UserInfos { get; set; }
    }

}
# RTA - User Module
## UI
Frontend UI is build on `React JS`, Backend connects to a web API which is built on `.net core 3.1`<br/>
App is deployed on `Vercel` a open source cloud platform for front end applications with `HTTPS` enabled.<br/>
- App is designed to support desktop and mobile, all responsive design is implemented.

## API
Backend web API is built on `.net core 3.1` and deployed on a `AWS EC2 linux` instance as a `Docker Container` with `HTTPS` enabled<br/>
Web API uses `MS SQL` for CRUD operation which is also a `Docker Image` and deployed as a `Docker Container`
### Support
- To run locally follow the below steps:<br/>
`docker pull mcr.microsoft.com/mssql/server:2019-latest`<br/>
`docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=SqlExpress1" -p 1433:1433 --network rtanet --name sql -d mcr.microsoft.com/mssql/server:2019-latest`<br/> <br/>
`create database rtadb;`<br/>
`create UserInfo Table;`<br/> <br/>
`CREATE TABLE [dbo].[UserInfo]([UserId] [int] IDENTITY(1,1) NOT NULL,[FirstName] [nvarchar](max) NULL,[LastName] [nvarchar](max) NULL,[Email] [nvarchar](max) NULL,[Mobile] [nvarchar](max) NULL,[Address1] [nvarchar](max) NULL,[Address2] [nvarchar](max) NULL,[UserRole] [nvarchar](max) NULL,[status] [int] NOT NULL) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[UserInfo] ADD  CONSTRAINT [PK_UserInfo] PRIMARY KEY CLUSTERED ([UserId] ASC)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO` <br/>

- Once DB is up and running, now follow the below steps for running API in local.<br/>
`dotnet build` <br/>
`dotnet run` <br/>

# GUI - Screens (Desktop)
## Login
![Login](https://github.com/naguaddi/rta/blob/master/ui/screens/login.png)

## Add User
![Add User](https://github.com/naguaddi/rta/blob/master/ui/screens/adduser.png)

## Admin User
![Admin User](https://github.com/naguaddi/rta/blob/master/ui/screens/adminuser.png)

## Super User
![Super User](https://github.com/naguaddi/rta/blob/master/ui/screens/superuser.png)

# GUI - Screens (Mobile)
## Login
![Login](https://github.com/naguaddi/rta/blob/master/ui/screens/mob-login.png)

## Add User
![Add User](https://github.com/naguaddi/rta/blob/master/ui/screens/mob-adduser.png)

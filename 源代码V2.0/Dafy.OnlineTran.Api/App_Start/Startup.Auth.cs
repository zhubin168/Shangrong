using Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using System;
using Microsoft.Owin.Security;
using GiveU.Authentication.OAuthApp;
using System.Configuration;

namespace Dafy.OnlineTran.Api
{
    public partial class Startup
    {
        public void ConfigureAuth(IAppBuilder app)
        {
            var expireTimeSpanOfDay = 1;

            #region SysUserList用户的认证
            //use Cookie for authentication
            var cookieOptionOfUser = new CookieAuthenticationOptions
            {
                AuthenticationMode = AuthenticationMode.Active,
                AuthenticationType = OAuthDefaults.AuthenticationType,
                ExpireTimeSpan = TimeSpan.FromDays(expireTimeSpanOfDay)
            };
            app.UseCookieAuthentication(cookieOptionOfUser);

            //use OAuthBearer for authentication
            var bearerOptionOfUser = new OAuthBearerAuthenticationOptions
            {
                AuthenticationMode = AuthenticationMode.Active,
                Provider = new OAuthAppBearerAuthenticationProvider("DafyBearer", false)
            };
            app.UseOAuthBearerAuthentication(bearerOptionOfUser);

            //use oauthapp authentication
            var oauthAppOption = new OAuthAppAuthenticationOptions
            {
                SystemName = ConfigurationManager.AppSettings["SystemName"],
                OAuthAppUrl = ConfigurationManager.AppSettings["OAuthAppUrl"],
                ClientId = ConfigurationManager.AppSettings["ClientId"],
                ClientSecret = ConfigurationManager.AppSettings["ClientSecret"]
            };
            app.UseOAuthAppAuthentication(oauthAppOption);
            #endregion
        }
    }
}
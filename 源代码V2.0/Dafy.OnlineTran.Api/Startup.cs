using Autofac;
using Autofac.Integration.WebApi;
using Dafy.OnlineTran.Api.Owin;
using Dafy.OnlineTran.Common;
using Dafy.OnlineTran.Container;
using Dafy.OnlineTran.IService;
using GiveU.Infrastructure.Configuration;
using GiveU.Infrastructure.Configuration.OAuthApp;
using GiveU.Infrastructure.Logging;
using GiveU.Infrastructure.Logging.MongoDB;
using Microsoft.Owin;
using Owin;
using System.Configuration;
using System.Reflection;
using System.Web.Http;
using GiveU.Authorization.OAuthApp;
using GiveU.Infrastructure.Redis;

[assembly: OwinStartup(typeof(Dafy.OnlineTran.Api.Startup))]
namespace Dafy.OnlineTran.Api
{
    /// <summary>
    /// OWIN启动类
    /// </summary>
    public partial class Startup
    {
        /// <summary>
        /// 构建IoC容器
        /// </summary>
        private void ConfigureDependency()
        {
            var builder = ContainerManager.Builder;
            builder.AddConfiguration();
            builder.AddLogging();

            //autofac for webapi
            var config = GlobalConfiguration.Configuration;
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterWebApiFilterProvider(config);

            //autofac for current web
            

            //autofac for DependencyResolver
            config.DependencyResolver = new AutofacWebApiDependencyResolver(ContainerManager.Container);
        }
        /// <summary>
        /// 配置需要初始化的service
        /// </summary>
        private void ConfigureService()
        {
            //var facConf = ContainerManager.Container.Resolve<IConfigurationFactory>();
            //facConf.AddMemory();
            //facConf.AddJson();
            //facConf.AddOAuthApp(new OAuthAppConfigurationOption
            //{
            //    OAuthAppUrl = ConfigurationManager.AppSettings["OAuthAppUrl"],
            //    ClientId = ConfigurationManager.AppSettings["ClientId"],
            //    ClientSecret = ConfigurationManager.AppSettings["ClientSecret"]
            //});
            //var confOauthApp = facConf.CreateConfiguration("oauth_app") as OAuthAppConfiguration;

            //var facLog = ContainerManager.Container.Resolve<ILoggerFactory>()
            //    .WithFilter(new FilterLoggerSettings
            //    {
            //        { "test", LogLevel.Information }
            //    });
            //facLog.AddDebug(LogLevel.Debug);
            //facLog.AddEventLog(LogLevel.Error);
            //facLog.AddLog4Net();
            //facLog.AddMongoDB(new MongoDBLoggerOption
            //{
            //    MongoDBUrl = confOauthApp.GetMongoDBConfig().Trim(),
            //    SystemName = ConfigurationManager.AppSettings["SystemName"]
            //}, LogLevel.Information);
            //LoggerWrapper.InitLogger(facLog.CreateLogger(ConfigurationManager.AppSettings["SystemName"]));

            //AuthorizationConfig.SystemName = ConfigurationManager.AppSettings["SystemName"];
            //AuthorizationConfig.GetCache = key => (string)RedisClient.Database.StringGet(key);
            //AuthorizationConfig.SetCache = (key, val, ts) => RedisClient.Database.StringSet(key, val, ts);
            //AuthorizationConfig.DelCache = key => RedisClient.Database.KeyDelete(key);
            //AuthorizationConfig.CacheKeyExists = key => RedisClient.Database.KeyExists(key);
            //AuthorizationConfig.ErrorHandler = ex =>
            //{
            //    var logger = facLog.CreateLogger("GiveU.Wallet");
            //    logger.LogError(null, ex, ex.Message);
            //};

            var initService = ContainerManager.Container.Resolve<IInitService>();
            initService.Init();
        }
        /// <summary>
        /// 配置中间件
        /// </summary>
        public void Configuration(IAppBuilder app)
        {
            Microsoft.Owin.Logging.AppBuilderLoggerExtensions.SetLoggerFactory(app, new OwinLogFactory());

            ConfigureDependency();
            ConfigureService();

            ConfigureAuth(app);
            ConfigureSignalR(app);
        }
    }
}

using Dafy.OnlineTran.Entity;
//using Dafy.DataBase.Context;
using Dafy.OnlineTran.IService;
using GiveU.Infrastructure.Configuration;
using GiveU.Infrastructure.Configuration.OAuthApp;
using GiveU.Infrastructure.Redis;
using System;
using System.Configuration;

namespace Dafy.OnlineTran.ServiceImpl
{
    public class InitService : IInitService
    {
        OAuthAppConfiguration _conf = null;
        public InitService(IConfigurationFactory facConf)
        {
            _conf = facConf.CreateConfiguration("oauth_app") as OAuthAppConfiguration;
        }

        public bool Init()
        {
            //InitConnectStr();
            //InitRedis();
            return true;
        }

        /// <summary>
        /// 初始化数据库连接字符串
        /// </summary>
        private void InitConnectStr()
        {
            //var conStr = ConfigurationManager.ConnectionStrings["lomark"];
            //#if DEBUG
            //            var conStr = _conf.GetDbConStrContextDev();
            //#else
            //            var conStr = _conf.GetDbConStrContextProd();
            //#endif
            //if (string.IsNullOrWhiteSpace(conStr))
            //{
            //    throw new Exception("数据库连接字符串为空");
            //}
            //DafyDbContext.InitConnectionString(conStr);
        }
        /// <summary>
        /// 初始化Redis组件
        /// </summary>
        private void InitRedis()
        {
            var redisConf = _conf.GetRedisConfig();
            if (string.IsNullOrWhiteSpace(redisConf)) throw new System.Exception("获取到的Redis配置为空");
            RedisClient.SetConfig(redisConf);
        }
    }
}

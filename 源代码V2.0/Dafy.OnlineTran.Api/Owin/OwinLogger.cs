using GiveU.Infrastructure.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Threading;
using Dafy.OnlineTran.Container;
using Autofac;

namespace Dafy.OnlineTran.Api.Owin
{
    /// <summary>
    /// 给owin中间件写日志用的日志记录器
    /// </summary>
    public class OwinLogger : Microsoft.Owin.Logging.ILogger
    {
        static ILogger _logger = null;
        string _name = null;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        public OwinLogger(string name)
        {
            _name = name;
        }
        /// <summary>
        /// 
        /// </summary>
        public bool WriteCore(TraceEventType eventType, int eventId, object state, Exception exception, Func<object, Exception, string> formatter)
        {
            if (_logger == null)
            {
                LazyInitializer.EnsureInitialized(ref _logger, () =>
                {
                    return ContainerManager.Container.Resolve<ILoggerFactory>().CreateLogger(_name);
                });
            }

            var message = state.ToString();
            if(formatter != null)
            {
                message = formatter(state, exception);
            }

            switch (eventType)
            {
                case TraceEventType.Critical:
                    _logger.LogCritical(exception);
                    break;
                case TraceEventType.Error:
                    _logger.LogError(exception);
                    break;
                case TraceEventType.Warning:
                    _logger.LogWarning(eventId, message, exception);
                    break;
                case TraceEventType.Information:
                    _logger.LogInformation(eventId, message, exception);
                    break;
                case TraceEventType.Verbose:
                case TraceEventType.Start:
                case TraceEventType.Stop:
                case TraceEventType.Suspend:
                case TraceEventType.Resume:
                case TraceEventType.Transfer:
                    _logger.LogDebug(eventId, message, exception);
                    break;
                default:
                    break;
            }
            return true;
        }
    }
}
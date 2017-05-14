using System;
using System.Data;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;
using GiveU.Authorization.OAuthApp;
using GiveU.Infrastructure.Logging;
using Dafy.OnlineTran.Common.Response;
using Dafy.OnlineTran.IService.Pc;
using Dafy.OnlineTran.Common.Request;

namespace GiveU.CollectionVisit.Web.Controllers
{
    /// <summary>
    /// 获客助手管理
    /// 创建人：朱斌
    /// 创建时间：2017-05-01
    /// </summary>
    [AllowAnonymous]
    public class ToolController : AuthApiController
    {
        private readonly ICustomerToolService _service;
        /// <summary>
        /// 注入service
        /// </summary>
        public ToolController(ICustomerToolService service)
        {
            _service = service;
        }

        /// <summary>
        /// 获客助手管理列表
        /// </summary>
        [HttpPost]
        public CustomerToolsRS GetTools(CustomerToolsRQ rq)
        {
            if (rq == null || rq.pageIndex <= 0 || rq.pageSize <= 0)
                return new CustomerToolsRS { total = 0, list = null };
            return _service.GetTools(rq);
        }

        /// <summary>
        /// 删除获客助手
        /// </summary>
        [HttpPost]
        public ResultModel<string> DelTools(SaveCustomerToolsRQ rq)
        {
            return _service.DelTools(rq);
        }

        /// <summary>
        /// 保存获客助手
        /// </summary>
        [HttpPost]
        public ResultModel<string> SaveTools(SaveCustomerToolsRQ rq)
        {
            rq.CreatedByName = this.User.Identity.Name;
            return _service.SaveTools(rq);
        }
    }
}

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
    /// 理财师管理
    /// 创建人：朱斌
    /// 创建时间：2017-04-30
    /// </summary>
    [AllowAnonymous]
    public class FinancialController : AuthApiController
    {
        private readonly IUserService _service;
        /// <summary>
        /// 注入service
        /// </summary>
        public FinancialController(IUserService service)
        {
            _service = service;
        }

        /// <summary>
        /// 理财师管理列表
        /// </summary>
        [HttpPost]
        public WeixinUserRS GetUsers(WeixinUserRQ rq)
        {
            if (rq == null || rq.pageIndex <= 0 || rq.pageSize <= 0)
                return new WeixinUserRS { total = 0, list = null };
            return _service.GetUsers(rq);
        }

        /// <summary>
        /// 删除理财师信息
        /// </summary>
        [HttpPost]
        public ResultModel<string> DelUsers(UpdateWeixinUserRQ rq)
        {
            return _service.DelUsers(rq);
        }

        /// <summary>
        /// 修改理财师信息
        /// </summary>
        [HttpPost]
        public ResultModel<string> SaveUsers(UpdateWeixinUserRQ rq)
        {
            return _service.SaveUsers(rq);
        }
    }
}

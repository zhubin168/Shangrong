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
    /// 产品管理
    /// 创建人：朱斌
    /// 创建时间：2017-05-01
    /// </summary>
    [AllowAnonymous]
    public class ProductController : AuthApiController
    {
        private readonly IProductService _service;
        /// <summary>
        /// 注入service
        /// </summary>
        public ProductController(IProductService service)
        {
            _service = service;
        }

        /// <summary>
        /// 产品管理列表
        /// </summary>
        [HttpPost]
        public ProductListRS GetProducts(ProductListRQ rq)
        {
            if (rq == null || rq.pageIndex <= 0 || rq.pageSize <= 0)
                return new ProductListRS { total = 0, list = null };
            return _service.GetProducts(rq);
        }

        /// <summary>
        /// 删除产品信息
        /// </summary>
        [HttpPost]
        public ResultModel<string> DelProducts(SaveProductRQ rq)
        {
            return _service.DelProducts(rq);
        }

        /// <summary>
        /// 保存产品信息
        /// </summary>
        [HttpPost]
        public ResultModel<string> SaveProducts(SaveProductRQ rq)
        {
            rq.CreatedByName = this.User.Identity.Name;
            return _service.SaveProducts(rq);
        }
    }
}

using Dafy.OnlineTran.Common.Request;
using Dafy.OnlineTran.Common.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dafy.OnlineTran.IService.Pc
{
    /// <summary>
    /// 理财师管理接口定义
    /// 创建人：朱斌
    /// 创建时间：2017-04-30
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// 理财师管理列表
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        WeixinUserRS GetUsers(WeixinUserRQ rq);

        ResultModel<string> DelUsers(UpdateWeixinUserRQ rq);

        /// <summary>
        /// 修改理财师信息
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        ResultModel<string> SaveUsers(UpdateWeixinUserRQ rq);
    }
}

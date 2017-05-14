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
    /// 获客助手管理实现类 
    /// 创建人：朱斌
    /// 创建时间：2017-05-01
    /// </summary>
    public interface ICustomerToolService
    {
        /// <summary>
        /// 获客助手管理列表
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        CustomerToolsRS GetTools(CustomerToolsRQ rq);

        ResultModel<string> DelTools(SaveCustomerToolsRQ rq);

        /// <summary>
        /// 保存获客助手
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        ResultModel<string> SaveTools(SaveCustomerToolsRQ rq);
    }
}

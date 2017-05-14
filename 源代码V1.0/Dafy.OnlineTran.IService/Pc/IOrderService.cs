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
    /// 订单管理接口定义
    /// 创建人：朱斌
    /// 创建时间：2017-05-01
    /// </summary>
    public interface IOrderService
    {
        /// <summary>
        /// 订单管理列表
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        OrderListRS GetOrders(OrderListRQ rq);

        /// <summary>
        /// 删除订单
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        ResultModel<string> DelOrders(DelParameterRQ rq);
    }
}

using Dafy.OnlineTran.Common.Request;
using Dafy.OnlineTran.Common.Response;
using Dafy.OnlineTran.Entity.Models;
using Dafy.OnlineTran.IService.Pc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using XCode;

namespace Dafy.OnlineTran.ServiceImpl.Pc
{
    /// <summary>
    /// 订单管理实现类 
    /// 创建人：朱斌
    /// 创建时间：2017-05-01
    /// </summary>
    public class OrderService : IOrderService
    {
        /// <summary>
        /// 订单管理列表
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public OrderListRS GetOrders(OrderListRQ rq)
        {
            var result = new OrderListRS { total = 0, list = null };
            var sql = string.Empty; //"select * from [Order] where 1=1 ";
            if (!string.IsNullOrWhiteSpace(rq.paraName))
            {
                sql += string.Format(" (ProName like '%{0}%' or ProductName like '%{0}%') ", rq.paraName);
            }
            var user = Order.FindAll(sql, "Id desc", null, (rq.pageIndex - 1) * rq.pageSize, rq.pageSize);
            //var query = (from a in user.ToList()
            //             select new
            //             {
            //                 a.Id,
            //                 a.FinishedOn,
            //                 a.InvId,
            //                 a.InvName,
            //                 a.InvTelePhone,
            //                 a.Number,
            //                 a.OrderPrice,
            //                 a.ProductId,
            //                 a.ProductName,
            //                 a.ProId,
            //                 a.ProName,
            //                 a.SaleId,
            //                 a.SaleName,
            //                 a.Status,
            //                 a.CreatedByName,
            //                 a.CreatedOn,
            //                 a.ModifiedByName,
            //                 a.ModifiedOn,
            //             });
            //query = query.OrderByDescending(q => q.ModifiedOn).ThenByDescending(q => q.Id);
            //result.total = Order.FindAll(sql, null, null, 0, 0).Count; //query.Count();
            //if (result.total == 0) return result;
            //result.list = query.Select(a => new OrderListItemRS
            //{
            //    Id = a.Id,
            //    FinishedOn=a.FinishedOn,
            //    InvId=a.InvId,
            //    InvName=a.InvName,
            //    InvTelePhone=a.InvTelePhone,
            //    Number=a.Number,
            //    OrderPrice=a.OrderPrice,
            //    ProductId=a.ProductId,
            //    ProductName=a.ProductName,
            //    ProId=a.ProId,
            //    ProName=a.ProName,
            //    SaleId=a.SaleId,
            //    SaleName=a.SaleName,
            //    Status = a.Status,
            //    CreatedOn = a.CreatedOn,
            //    CreatedByName = a.CreatedByName,
            //    ModifiedByName=a.ModifiedByName,
            //    ModifiedOn=a.ModifiedOn
            //}).ToList();
            return result;
        }

        /// <summary>
        /// 删除订单
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public ResultModel<string> DelOrders(DelParameterRQ rq)
        {
            //var obj = Order.FindById(rq.id);
            //int nCount = obj.Delete();
            int nCount = 1;
            return new ResultModel<string>
            {
                state = nCount,
                message = nCount > 0 ? "删除成功！" : "操作失败！",
                data = nCount.ToString()
            };
        }
    }
}

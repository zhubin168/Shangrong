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
    /// 获客助手管理实现类 
    /// 创建人：朱斌
    /// 创建时间：2017-05-01
    /// </summary>
    public class CustomerToolService : ICustomerToolService
    {
        /// <summary>
        /// 获客助手管理列表
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public CustomerToolsRS GetTools(CustomerToolsRQ rq)
        {
            var result = new CustomerToolsRS { total = 0, list = null };
            var sql = string.Empty;//"select * from CustomerTools where 1=1 ";
            if (!string.IsNullOrWhiteSpace(rq.paraName))
            {
                sql += string.Format(" Title like '%{0}%'", rq.paraName);
            }
            var user = CustomerTools.FindAll(sql, "Id desc", null, (rq.pageIndex - 1) * rq.pageSize, rq.pageSize);
            var query = (from a in user.ToList()
                         select new
                         {
                             a.Id,
                             a.ImgType,
                             a.OrderNum,
                             a.PublishTime,
                             a.Status,
                             a.ImageUrl,
                             a.Title,
                             a.CreatedByName,
                             a.CreatedOn,
                             a.ModifiedByName,
                             a.ModifiedOn,
                         });
            query = query.OrderByDescending(q => q.ModifiedOn).ThenByDescending(q => q.Id);
            result.total = CustomerTools.FindAll(sql, null, null, 0, 0).Count;//query.Count();
            if (result.total == 0) return result;
            result.list = query.Select(a => new CustomerToolsItemRS
            {
                Id = a.Id,
                ImgType=a.ImgType,
                OrderNum=a.OrderNum,
                PublishTime=a.PublishTime,
                Status=a.Status,
                ImageUrl = a.ImageUrl,
                Title = a.Title,
                ModifiedByName = a.ModifiedByName,
                ModifiedOn = a.ModifiedOn,
                CreatedOn = a.CreatedOn,
                CreatedByName = a.CreatedByName
            }).ToList();
            return result;
        }

        public ResultModel<string> DelTools(SaveCustomerToolsRQ rq)
        {
            var obj = CustomerTools.FindById(rq.Id);
            int nCount = obj.Delete();
            return new ResultModel<string>
            {
                state = nCount,
                message = nCount > 0 ? "删除成功！" : "操作失败！",
                data = nCount.ToString()
            };
        }

        /// <summary>
        /// 保存获客助手
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public ResultModel<string> SaveTools(SaveCustomerToolsRQ rq)
        {
            EntityList<CustomerTools> users = new EntityList<CustomerTools>();
            var user = CustomerTools.FindById(rq.Id);
            if (null == user)
            {
                user = new CustomerTools();
                user.CreatedByName = rq.CreatedByName;
                user.CreatedOn = DateTime.Now;
            }
            user.Status = rq.Status;
            user.ImgType = rq.ImgType;
            user.OrderNum = rq.OrderNum;
            user.PublishTime = DateTime.Now;
            user.ImageUrl = rq.ImageUrl;
            user.Title = rq.Title;
            user.ModifiedByName = rq.CreatedByName;
            user.ModifiedOn = DateTime.Now;
            users.Add(user);
            int nCount = users.Save();
            return new ResultModel<string>
            {
                state = nCount,
                message = nCount > 0 ? "保存成功！" : "操作失败！",
                data = nCount.ToString()
            };
        }
    }
}

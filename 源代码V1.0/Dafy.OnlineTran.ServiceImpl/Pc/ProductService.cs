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
    /// 产品管理实现类 
    /// 创建人：朱斌
    /// 创建时间：2017-05-01
    /// </summary>
    public class ProductService : IProductService
    {
        /// <summary>
        /// 产品管理列表
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public ProductListRS GetProducts(ProductListRQ rq)
        {
          
            var result = new ProductListRS { total = 0, list = null };
            var sql = string.Empty;//"select * from Product where 1=1 ";
            if (!string.IsNullOrWhiteSpace(rq.paraName))
            {
                sql += string.Format(" (ProName like '%{0}%' or ProPlan like '%{0}%') ", rq.paraName);
            }
            var user = Product.FindAll(sql, "Id desc", null, (rq.pageIndex - 1) * rq.pageSize, rq.pageSize);
            var query = (from a in user.ToList()
                         select new
                         {
                             a.Id,
                             a.Banner,
                             a.IsHot,
                             a.Logo,
                             a.Price,
                             a.ProAge,
                             a.ProCase,
                             a.ProDoc,
                             a.ProName,
                             a.ProPlan,
                             a.ProType,
                             a.ProUse,
                             a.WhyChoose,
                             a.CreatedByName,
                             a.CreatedOn,
                             a.ModifiedByName,
                             a.ModifiedOn,
                             a.Status,
                         });
            query = query.OrderByDescending(q => q.ModifiedOn).ThenByDescending(q => q.Id);
            result.total = Product.FindAll(sql, null, null, 0, 0).Count;  //query.Count();
            if (result.total == 0) return result;
            result.list = query.Select(a => new ProductListItemRS
            {
                Id=a.Id,
                Banner=a.Banner,
                IsHot=a.IsHot,
                Logo=a.Logo,
                Price=a.Price,
                ProAge=a.ProAge,
                ProCase=a.ProCase,
                ProDoc=a.ProDoc,
                ProName=a.ProName,
                ProPlan=a.ProPlan,
                ProType=a.ProType,
                ProUse=a.ProUse,
                WhyChoose=a.WhyChoose,
                ModifiedOn=a.ModifiedOn,
                ModifiedByName=a.ModifiedByName,
                Status=a.Status,
                CreatedOn=a.CreatedOn,
                CreatedByName=a.CreatedByName
            }).ToList();
            return result;
        }

        public ResultModel<string> DelProducts(SaveProductRQ rq)
        {
            var obj = Product.FindById(rq.Id);
            int nCount = obj.Delete();
            return new ResultModel<string>
            {
                state = nCount,
                message = nCount > 0 ? "删除成功！" : "操作失败！",
                data = nCount.ToString()
            };
        }

        /// <summary>
        /// 保存产品信息
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public ResultModel<string> SaveProducts(SaveProductRQ rq)
        {
            EntityList<Product> users = new EntityList<Product>();
            var user = Product.FindById(rq.Id);
            if (null == user)
            {
                user = new Product();
                user.CreatedByName = rq.CreatedByName;
                user.CreatedOn = DateTime.Now;
            }
            user.Banner = rq.Banner;
            user.IsHot = rq.IsHot;
            user.Logo = rq.Logo;
            user.Price = rq.Price;
            user.ProAge = rq.ProAge;
            user.ProCase = rq.ProCase;
            user.ProDoc = rq.ProDoc;
            user.ProName = rq.ProName;
            user.ProPlan = rq.ProPlan;
            user.ProType = rq.ProType;
            user.ProUse = rq.ProUse;
            user.WhyChoose = rq.WhyChoose;
            user.Status = rq.Status;
            user.ModifiedByName = rq.CreatedByName;
            user.ModifiedOn = DateTime.Now;
            user.Status = rq.Status;
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

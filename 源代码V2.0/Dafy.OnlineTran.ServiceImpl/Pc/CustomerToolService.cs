﻿using Dafy.OnlineTran.Common.Request;
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
        /// 获客助手：图片管理
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public CustomerToolsRS GetTools(CustomerToolsRQ rq)
        {
            var result = new CustomerToolsRS { total = 0, list = null };
            var sql = string.Empty;
            if (!string.IsNullOrWhiteSpace(rq.paraName))
            {
                sql += string.Format(" title like '%{0}%'", rq.paraName);
            }
            var user = Picture.FindAll(sql, "id desc", null, (rq.pageIndex - 1) * rq.pageSize, rq.pageSize);
            var query = (from a in user.ToList()
                         select new
                         {
                             a.createTime,
                             a.createUid,
                             a.id,
                             a.imageUrl,
                             a.modifyUid,
                             a.publishTime,
                             a.sequence,
                             a.status,
                             a.title,
                             a.type,
                             a.updateTime,
                         });
            result.total = CustomerTools.FindAll(sql, null, null, 0, 0).Count;
            if (result.total == 0) return result;
            result.list = query.Select(a => new CustomerToolsItemRS
            {
                createTime=a.createTime,
                createUid=a.createUid,
                id=a.id,
                imageUrl=a.imageUrl,
                publishTime=a.publishTime,
                sequence=a.sequence,
                status=a.status,
                title=a.title,
                type=a.type,
                updateTime=a.updateTime
            }).ToList();
            return result;
        }

        /// <summary>
        /// 获客助手：图片保存
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public ResultModel<string> SaveTools(SaveCustomerToolsRQ rq)
        {
            EntityList<Picture> users = new EntityList<Picture>();
            var user = Picture.FindByid(rq.id);
            if (null == user)
            {
                user = new Picture();
                user.createUid = Convert.ToInt32(rq.CreatedByName);
                user.createTime = DateTime.Now;
            }
            user.imageUrl = rq.imageUrl;
            user.publishTime = rq.publishTime;
            user.sequence = rq.sequence;
            user.status = rq.status;
            user.title = rq.title;
            user.type = rq.type;
            user.updateTime = DateTime.Now;
            users.Add(user);
            int nCount = users.Save();
            return new ResultModel<string>
            {
                state = nCount,
                message = nCount > 0 ? "保存成功！" : "操作失败！",
                data = nCount.ToString()
            };
        }

        /// <summary>
        /// 获客助手：图片详情
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public CustomerToolsItemRS GetDetailTool(CustomerToolsRQ rq)
        {
            var condition = new CustomerToolsRQ()
            {
                pageIndex = 1,
                pageSize = Int32.MaxValue,
                id = rq.id
            };
            var list = GetTools(condition).list;
            var result = list == null ? new CustomerToolsItemRS() : list.Where(q => q.id == rq.id).FirstOrDefault();
            return result;
        }

        /// <summary>
        /// 获客助手：发文章列表
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public CustomerToolsRS GetArticles(CustomerToolsRQ rq)
        {
            throw new NotImplementedException();
        }
    }
}

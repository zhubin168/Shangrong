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
    /// 课程管理实现类 
    /// 创建人：朱斌
    /// 创建时间：2017-05-01
    /// </summary>
    public class CourseService : ICourseService
    {
        /// <summary>
        /// 课程管理列表
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public CourseListRS GetCourses(CourseListRQ rq)
        {
            var result = new CourseListRS { total = 0, list = null };
            var sql = string.Empty; //"select * from Course where 1=1 ";
            if (!string.IsNullOrWhiteSpace(rq.paraName))
            {
                sql += string.Format(" (Name like '%{0}%' or Title like '%{0}%') ", rq.paraName);
            }
            var user = Course.FindAll(sql, "Id desc", null, (rq.pageIndex - 1) * rq.pageSize, rq.pageSize);
            var query = (from a in user.ToList()
                         select new
                         {
                             a.Id,
                             a.Conent,
                             a.ImageUrl,
                             a.IsRecomand,
                             a.Name,
                             a.Title,
                             a.CreatedByName,
                             a.CreatedOn,
                             a.ModifiedByName,
                             a.ModifiedOn,
                             a.Status,
                         });
            query = query.OrderByDescending(q => q.ModifiedOn).ThenByDescending(q => q.Id);
            result.total = Course.FindAll(sql, null, null, 0, 0).Count; //query.Count();
            if (result.total == 0) return result;
            result.list = query.Select(a => new CourseListItemRS
            {
                Id = a.Id,
                Conent=a.Conent,
                ImageUrl=a.ImageUrl,
                IsRecomand=a.IsRecomand,
                Name=a.Name,
                Title=a.Title,
                ModifiedOn = a.ModifiedOn,
                ModifiedByName = a.ModifiedByName,
                Status = a.Status,
                CreatedOn = a.CreatedOn,
                CreatedByName = a.CreatedByName
            }).ToList();
            return result;
        }

        public ResultModel<string> DelCourses(SaveCourseRQ rq)
        {
            var obj = Course.FindById(rq.Id);
            int nCount = obj.Delete();
            return new ResultModel<string>
            {
                state = nCount,
                message = nCount > 0 ? "删除成功！" : "操作失败！",
                data = nCount.ToString()
            };
        }

        /// <summary>
        /// 保存课程信息
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public ResultModel<string> SaveCourses(SaveCourseRQ rq)
        {
            EntityList<Course> users = new EntityList<Course>();
            var user = Course.FindById(rq.Id);
            if (null == user)
            {
                user = new Course();
                user.CreatedByName = rq.CreatedByName;
                user.CreatedOn = DateTime.Now;
            }
            user.Conent = rq.Conent;
            user.ImageUrl = rq.ImageUrl;
            user.IsRecomand = rq.IsRecomand;
            user.Name = rq.Name;
            user.Title = rq.Title;
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

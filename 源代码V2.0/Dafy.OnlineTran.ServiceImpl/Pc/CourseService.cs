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
        /// 资讯分类管理
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public InfoCategorysRS GetInfoCategorys(InfoCategorysRQ rq)
        {
            var result = new InfoCategorysRS { total = 0, list = null };
            var sql = string.Empty;
            if (!string.IsNullOrWhiteSpace(rq.paraName))
            {
                sql += string.Format(" (name like '%{0}%') ", rq.paraName);
            }
            var user = InfoCategory.FindAll(sql, "id desc", null, (rq.pageIndex - 1) * rq.pageSize, rq.pageSize);
            var query = (from a in user.ToList()
                         select new
                         {
                             a.id,
                             a.createTime,
                             a.createUid,
                             a.modifyUid,
                             a.name,
                             a.orderNum,
                             a.updateTime,
                         });
            result.total = Course.FindAll(sql, null, null, 0, 0).Count;
            if (result.total == 0) return result;
            result.list = query.Select(a => new InfoCategorysItemRS
            {
                id=a.id,
                createTime=a.createTime,
                createUid=a.createUid,
                modifyUid=a.modifyUid,
                name=a.name,
                orderNum=a.orderNum,
                updateTime=a.updateTime
            }).ToList();
            return result;
        }

        /// <summary>
        /// 保存资讯分类
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public ResultModel<string> SaveInfoCategory(InfoCategorysItemRS rq)
        {
            EntityList<InfoCategory> users = new EntityList<InfoCategory>();
            var user = InfoCategory.FindByid(rq.id);
            if (null == user)
            {
                user = new InfoCategory();
                user.createUid = rq.createUid;
                user.createTime = DateTime.Now;
            }
            user.modifyUid = rq.createUid;
            user.name = rq.name;
            user.orderNum = rq.orderNum;
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
        /// 资讯管理
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public InformationRS GetInformations(InformationRQ rq)
        {
            var result = new InformationRS { total = 0, list = null };
            var sql = " 1=1 ";
            if (!string.IsNullOrWhiteSpace(rq.paraName))
            {
                sql += string.Format(" and (title like '%{0}%') ", rq.paraName);
            }
            if (!string.IsNullOrEmpty(rq.status))
            {
                sql += string.Format(" and status='{0}' ", rq.status);
            }
            if (!string.IsNullOrEmpty(rq.type))
            {
                sql += string.Format(" and cid='{0}' ", rq.type);
            }
            var user = Information.FindAll(sql, "id desc", null, (rq.pageIndex - 1) * rq.pageSize, rq.pageSize);
            var query = (from a in user.ToList()
                         select new
                         {
                             a.id,
                             a.createTime,
                             a.createUid,
                             a.modifyUid,
                             a.updateTime,
                             a.cid,
                             a.content,
                             a.contentUrl,
                             a.listUrl,
                             a.publishTime,
                             a.shareTitle,
                             a.shareUrl,
                             a.status,
                             a.title,
                         });
            result.total = Information.FindAll(sql, null, null, 0, 0).Count;
            if (result.total == 0) return result;
            result.list = query.Select(a => new InformationItemRS
            {
                id = a.id,
                createTime = a.createTime,
                createUid = a.createUid,
                modifyUid = a.modifyUid,
                updateTime = a.updateTime,
                cid=a.cid,
                content=a.content,
                contentUrl=a.contentUrl,
                listUrl=a.listUrl,
                publishTime=a.publishTime,
                shareTitle=a.shareTitle,
                shareUrl=a.shareUrl,
                status=a.status,
                title=a.title,
            }).ToList();
            return result;
        }

        /// <summary>
        /// 保存资讯
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public ResultModel<string> SaveInformation(InformationItemRS rq)
        {
            EntityList<Information> users = new EntityList<Information>();
            var user = Information.FindByid(rq.id);
            if (null == user)
            {
                user = new Information();
                user.createUid = rq.createUid;
                user.createTime = DateTime.Now;
            }
            user.modifyUid = rq.createUid;
            user.updateTime = DateTime.Now;
            user.cid = rq.cid;
            user.content=rq.content;
            user.contentUrl = rq.contentUrl;
            user.listUrl = rq.listUrl;
            user.publishTime = rq.publishTime;
            user.shareTitle = rq.shareTitle;
            user.shareUrl = rq.shareUrl;
            user.status = rq.status;
            user.title = rq.title;
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
        /// 资讯详情
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public InformationItemRS GetDetailInformation(InformationRQ rq)
        {
            var condition = new InformationRQ()
            {
                pageIndex = 1,
                pageSize = Int32.MaxValue,
                id = rq.id
            };
            var list = GetInformations(condition).list;
            var result = list == null ? new InformationItemRS() : list.Where(q => q.id == rq.id).FirstOrDefault();
            return result;
        }

        /// <summary>
        /// 小知识管理
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public KnowledgeRS GetKnowledges(KnowledgeRQ rq)
        {
            var result = new KnowledgeRS { total = 0, list = null };
            var sql = " 1=1 ";
            if (!string.IsNullOrWhiteSpace(rq.paraName))
            {
                sql += string.Format(" and (title like '%{0}%') ", rq.paraName);
            }
            if (!string.IsNullOrEmpty(rq.status))
            {
                sql += string.Format(" and status='{0}' ", rq.status);
            }
            var user = Knowledge.FindAll(sql, "id desc", null, (rq.pageIndex - 1) * rq.pageSize, rq.pageSize);
            var query = (from a in user.ToList()
                         select new
                         {
                             a.id,
                             a.createTime,
                             a.createUid,
                             a.modifyUid,
                             a.updateTime,
                             a.content,
                             a.contentUrl,
                             a.listUrl,
                             a.publishTime,
                             a.shareTitle,
                             a.shareUrl,
                             a.status,
                             a.title,
                         });
            result.total = Information.FindAll(sql, null, null, 0, 0).Count;
            if (result.total == 0) return result;
            result.list = query.Select(a => new KnowledgeItemRS
            {
                id = a.id,
                createTime = a.createTime,
                createUid = a.createUid,
                modifyUid = a.modifyUid,
                updateTime = a.updateTime,
                content = a.content,
                contentUrl = a.contentUrl,
                listUrl = a.listUrl,
                publishTime = a.publishTime,
                shareTitle = a.shareTitle,
                shareUrl = a.shareUrl,
                status = a.status,
                title = a.title,
            }).ToList();
            return result;
        }

        /// <summary>
        /// 保存小知识
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public ResultModel<string> SaveKnowledge(KnowledgeItemRS rq)
        {
            EntityList<Knowledge> users = new EntityList<Knowledge>();
            var user = Knowledge.FindByid(rq.id);
            if (null == user)
            {
                user = new Knowledge();
                user.createUid = rq.createUid;
                user.createTime = DateTime.Now;
            }
            user.modifyUid = rq.createUid;
            user.updateTime = DateTime.Now;
            user.content = rq.content;
            user.contentUrl = rq.contentUrl;
            user.listUrl = rq.listUrl;
            user.publishTime = rq.publishTime;
            user.shareTitle = rq.shareTitle;
            user.shareUrl = rq.shareUrl;
            user.status = rq.status;
            user.title = rq.title;
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
        /// 小知识详情
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public KnowledgeItemRS GetDetailKnowledge(KnowledgeRQ rq)
        {
            var condition = new KnowledgeRQ()
            {
                pageIndex = 1,
                pageSize = Int32.MaxValue,
                id = rq.id
            };
            var list = GetKnowledges(condition).list;
            var result = list == null ? new KnowledgeItemRS() : list.Where(q => q.id == rq.id).FirstOrDefault();
            return result;
        }

        /// <summary>
        /// 理财师充电站
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public CourseRS GetCourses(CourseRQ rq)
        {
            var result = new CourseRS { total = 0, list = null };
            var sql = " 1=1 ";
            if (!string.IsNullOrWhiteSpace(rq.paraName))
            {
                sql += string.Format(" and (title like '%{0}%') ", rq.paraName);
            }
            if (!string.IsNullOrEmpty(rq.status))
            {
                sql += string.Format(" and status='{0}' ", rq.status);
            }
            var user = Course.FindAll(sql, "id desc", null, (rq.pageIndex - 1) * rq.pageSize, rq.pageSize);
            var query = (from a in user.ToList()
                         select new
                         {
                             a.id,
                             a.createTime,
                             a.createUid,
                             a.modifyUid,
                             a.updateTime,
                             a.content,
                             a.contentUrl,
                             a.listUrl,
                             a.publishTime,
                             a.shareTitle,
                             a.shareUrl,
                             a.status,
                             a.title,
                             a.position,
                             a.subTitle,
                         });
            result.total = Course.FindAll(sql, null, null, 0, 0).Count;
            if (result.total == 0) return result;
            result.list = query.Select(a => new CourseItemRS
            {
                id = a.id,
                createTime = a.createTime,
                createUid = a.createUid,
                modifyUid = a.modifyUid,
                updateTime = a.updateTime,
                content = a.content,
                contentUrl = a.contentUrl,
                listUrl = a.listUrl,
                publishTime = a.publishTime,
                shareTitle = a.shareTitle,
                shareUrl = a.shareUrl,
                status = a.status,
                title = a.title,
                position=a.position,
                subTitle=a.subTitle
            }).ToList();
            return result;
        }

        /// <summary>
        /// 保存充电站
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public ResultModel<string> SaveCourse(CourseItemRS rq)
        {
            EntityList<Course> users = new EntityList<Course>();
            var user = Course.FindByid(rq.id);
            if (null == user)
            {
                user = new Course();
                user.createUid = rq.createUid;
                user.createTime = DateTime.Now;
            }
            user.modifyUid = rq.createUid;
            user.updateTime = DateTime.Now;
            user.content = rq.content;
            user.contentUrl = rq.contentUrl;
            user.listUrl = rq.listUrl;
            user.publishTime = rq.publishTime;
            user.shareTitle = rq.shareTitle;
            user.shareUrl = rq.shareUrl;
            user.status = rq.status;
            user.title = rq.title;
            user.position = rq.position;
            user.subTitle = rq.subTitle;
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
        /// 充电站详情
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public CourseItemRS GetDetailCourse(CourseRQ rq)
        {
            var condition = new CourseRQ()
            {
                pageIndex = 1,
                pageSize = Int32.MaxValue,
                id = rq.id
            };
            var list = GetCourses(condition).list;
            var result = list == null ? new CourseItemRS() : list.Where(q => q.id == rq.id).FirstOrDefault();
            return result;
        }
    }
}

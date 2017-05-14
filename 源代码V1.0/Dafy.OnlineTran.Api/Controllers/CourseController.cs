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
    /// 课程管理
    /// 创建人：朱斌
    /// 创建时间：2017-04-30
    /// </summary>
    [AllowAnonymous]
    public class CourseController : AuthApiController
    {
        private readonly ICourseService _service;
        /// <summary>
        /// 注入service
        /// </summary>
        public CourseController(ICourseService service)
        {
            _service = service;
        }

        /// <summary>
        /// 课程管理列表
        /// </summary>
        [HttpPost]
        public CourseListRS GetCourses(CourseListRQ rq)
        {
            if (rq == null || rq.pageIndex <= 0 || rq.pageSize <= 0)
                return new CourseListRS { total = 0, list = null };
            return _service.GetCourses(rq);
        }

        /// <summary>
        /// 删除课程信息
        /// </summary>
        [HttpPost]
        public ResultModel<string> DelCourses(SaveCourseRQ rq)
        {
            return _service.DelCourses(rq);
        }

        /// <summary>
        /// 保存课程信息
        /// </summary>
        [HttpPost]
        public ResultModel<string> SaveCourses(SaveCourseRQ rq)
        {
            rq.CreatedByName = this.User.Identity.Name;
            return _service.SaveCourses(rq);
        }
    }
}

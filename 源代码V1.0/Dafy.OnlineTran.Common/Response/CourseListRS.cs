using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dafy.OnlineTran.Common.Response
{
    public class CourseListRS
    {
        public List<CourseListItemRS> list { get; set; }
        public int total { get; set; }
    }
    public class CourseListItemRS 
    {
        /// <summary>主键ID(自增列)</summary>
        public long Id { get; set; }

        /// <summary>创建者名称</summary>
        public string Name { get; set; }

        /// <summary>创建者名称</summary>
        public string Title { get; set; }

        /// <summary>创建者名称</summary>
        public string Conent { get; set; }

        /// <summary>创建者名称</summary>
        public string IsRecomand { get; set; }

        /// <summary>创建者名称</summary>
        public string ImageUrl { get; set; }

        /// <summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
        public int Status { get; set; }

        /// <summary>创建时间</summary>
        public DateTime CreatedOn { get; set; }

        /// <summary>创建者名称</summary>
        public string CreatedByName { get; set; }

        /// <summary>修改时间</summary>
        public DateTime ModifiedOn { get; set; }

        /// <summary>修改者名称</summary>
        public string ModifiedByName { get; set; }
    }
}

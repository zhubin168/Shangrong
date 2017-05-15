using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dafy.OnlineTran.Common.Request
{
    public class ArticleListRQ
    {
        public int pageIndex { get; set; }
        public int pageSize { get; set; }
        /// <summary>
        /// 参数名
        /// </summary>
        public string paraName { get; set; }
        public int id { get;set;}
        public string type { get; set; }
        public string status { get; set; }
    }
    public class SaveArticleRQ
    {
        /// <summary>主键ID(自增列)</summary>
        public long Id { get; set; }

        /// <summary>创建者名称</summary>
        public string ArticleTitle { get; set; }

        public int ArticleType { get; set; }

        public string ArticleImg { get; set; }

        public string ArticleContent { get; set; }

        /// <summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
        public int IsRecommand { get; set; }

        /// <summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
        public int IsPublish { get; set; }

        /// <summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
        public int Status { get; set; }

        ///// <summary>创建时间</summary>
        //public DateTime CreatedOn { get; set; }

        /// <summary>创建者名称</summary>
        public string CreatedByName { get; set; }

        ///// <summary>修改时间</summary>
        //public DateTime ModifiedOn { get; set; }

        ///// <summary>修改者名称</summary>
        //public string ModifiedByName { get; set; }
    }
}

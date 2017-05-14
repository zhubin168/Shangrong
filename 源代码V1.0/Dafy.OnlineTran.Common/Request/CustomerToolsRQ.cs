using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dafy.OnlineTran.Common.Request
{
    public class CustomerToolsRQ
    {
        public int pageIndex { get; set; }
        public int pageSize { get; set; }
        /// <summary>
        /// 参数名
        /// </summary>
        public string paraName { get; set; }
    }
    public class SaveCustomerToolsRQ
    {
        /// <summary>主键ID(自增列)</summary>
        public long Id { get; set; }

        /// <summary>标题</summary>
        public string Title { get; set; }

        /// <summary>图片类型</summary>
        public string ImgType { get; set; }

        /// <summary>排序字段</summary>
        public string OrderNum { get; set; }

        /// <summary>发布时间</summary>
        public DateTime PublishTime { get; set; }

        /// <summary>图片地址</summary>
        public string ImageUrl { get; set; }

        /// <summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
        public int Status { get; set; }

        /// <summary>创建者名称</summary>
        public string CreatedByName { get; set; }
    }
}

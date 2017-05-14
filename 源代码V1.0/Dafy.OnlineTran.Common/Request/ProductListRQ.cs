﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dafy.OnlineTran.Common.Request
{
    public class ProductListRQ
    {
        public int pageIndex { get; set; }
        public int pageSize { get; set; }
        /// <summary>
        /// 参数名
        /// </summary>
        public string paraName { get; set; }
    }
    public class SaveProductRQ
    {
        /// <summary>主键ID(自增列)</summary>
        public long Id { get; set; }

        public string ProName { get; set; }

        public string ProType { get; set; }

        public string Banner { get; set; }

        public decimal Price { get; set; }

        public int ProAge { get; set; }

        public string Logo { get; set; }

        public string ProPlan { get; set; }

        public string ProUse { get; set; }

        public string ProDoc { get; set; }

        public string ProCase { get; set; }

        public string WhyChoose { get; set; }

        public int IsHot { get; set; }

        /// <summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
        public int Status { get; set; }
        public string CreatedByName { get; set; }
    }
}

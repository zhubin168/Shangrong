using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dafy.OnlineTran.Common.Response
{
    public class OrderListRS
    {
        public List<OrderListItemRS> list { get; set; }
        public int total { get; set; }
    }
    public class OrderListItemRS
    {
        /// <summary>主键ID(自增列)</summary>
        public long Id { get; set; }

        public long InvId { get; set; }

        public string InvName { get; set; }

        public string InvTelePhone { get; set; }

        public string ProId { get; set; }

        public string ProName { get; set; }

        public string OrderPrice { get; set; }

        public string Status { get; set; }

        public string SaleId { get; set; }

        public string SaleName { get; set; }

        public string ProductId { get; set; }

        public string ProductName { get; set; }

        public string Number { get; set; }

        /// <summary>创建时间</summary>
        public DateTime CreatedOn { get; set; }

        /// <summary>创建者名称</summary>
        public string CreatedByName { get; set; }

        /// <summary>审核时间</summary>
        public DateTime ModifiedOn { get; set; }

        /// <summary>修改者名称</summary>
        public string ModifiedByName { get; set; }

        /// <summary>完成时间</summary>
        public DateTime FinishedOn { get; set; }
    }
}

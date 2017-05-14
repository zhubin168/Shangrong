using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dafy.OnlineTran.Common.Response
{
    public class WeixinUserRS
    {
        public List<WeixinUserItemRS> list { get; set; }
        public int total { get; set; }
    }
    public class WeixinUserItemRS
    {
        /// <summary></summary>
        public long Id { get; set; }

        /// <summary></summary>
        public string OpenId { get; set; }

        /// <summary></summary>
        public string Nickname { get; set; }

        /// <summary></summary>
        public int Sex { get; set; }

        /// <summary></summary>
        public string City { get; set; }

        /// <summary></summary>
        public string Country { get; set; }

        /// <summary></summary>
        public String Province { get; set; }

        /// <summary></summary>
        public string Headimgurl { get; set; }

        /// <summary></summary>
        public string Username { get; set; }

        /// <summary>密码（初始密码为随机生成的6位数字），后台也可修改</summary>
        public string Password { get; set; }
  
        /// <summary>(0:客户；1：理财师)</summary>
        public int RoleId { get; set; }

        /// <summary>电话</summary>
        public string TelePhone { get; set; }

        /// <summary></summary>
        public string Remark { get; set; }

        /// <summary></summary>
        public int IsPrice { get; set; }

        /// <summary></summary>
        public string Ident { get; set; }

        /// <summary></summary>
        public string CardNo { get; set; }

        /// <summary></summary>
        public string BankName { get; set; }

        /// <summary></summary>
        public string Company { get; set; }

        /// <summary></summary>
        public string CompCity { get; set; }

        /// <summary></summary>
        public string Department { get; set; }

        /// <summary></summary>
        public string Position { get; set; }
    }
}

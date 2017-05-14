﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Xml.Serialization;
using XCode;
using XCode.Configuration;
using XCode.DataAccessLayer;

namespace Dafy.OnlineTran.Entity.Models
{
    /// <summary>预约管理</summary>
    [Serializable]
    [DataObject]
    [Description("预约管理")]
    [BindIndex("PK_ORDER", true, "Id")]
    [BindTable("Order", Description = "预约管理", ConnName = "Lomark", DbType = DatabaseType.SqlServer)]
    public partial class Order : IOrder
    {
        #region 属性
        private Int64 _Id;
        /// <summary>主键ID(自增列)</summary>
        [DisplayName("主键ID自增列")]
        [Description("主键ID(自增列)")]
        [DataObjectField(true, true, false, 19)]
        [BindColumn(1, "Id", "主键ID(自增列)", null, "bigint", 19, 0, false)]
        public virtual Int64 Id
        {
            get { return _Id; }
            set { if (OnPropertyChanging(__.Id, value)) { _Id = value; OnPropertyChanged(__.Id); } }
        }

        private Int64 _InvId;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 19)]
        [BindColumn(2, "InvId", "创建者名称", null, "bigint", 19, 0, false)]
        public virtual Int64 InvId
        {
            get { return _InvId; }
            set { if (OnPropertyChanging(__.InvId, value)) { _InvId = value; OnPropertyChanged(__.InvId); } }
        }

        private String _InvName;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(3, "InvName", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String InvName
        {
            get { return _InvName; }
            set { if (OnPropertyChanging(__.InvName, value)) { _InvName = value; OnPropertyChanged(__.InvName); } }
        }

        private String _InvTelePhone;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(4, "InvTelePhone", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String InvTelePhone
        {
            get { return _InvTelePhone; }
            set { if (OnPropertyChanging(__.InvTelePhone, value)) { _InvTelePhone = value; OnPropertyChanged(__.InvTelePhone); } }
        }

        private String _ProId;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(5, "ProId", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String ProId
        {
            get { return _ProId; }
            set { if (OnPropertyChanging(__.ProId, value)) { _ProId = value; OnPropertyChanged(__.ProId); } }
        }

        private String _ProName;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(6, "ProName", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String ProName
        {
            get { return _ProName; }
            set { if (OnPropertyChanging(__.ProName, value)) { _ProName = value; OnPropertyChanged(__.ProName); } }
        }

        private String _OrderPrice;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(7, "OrderPrice", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String OrderPrice
        {
            get { return _OrderPrice; }
            set { if (OnPropertyChanging(__.OrderPrice, value)) { _OrderPrice = value; OnPropertyChanged(__.OrderPrice); } }
        }

        private String _Status;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(8, "Status", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String Status
        {
            get { return _Status; }
            set { if (OnPropertyChanging(__.Status, value)) { _Status = value; OnPropertyChanged(__.Status); } }
        }

        private String _SaleId;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(9, "SaleId", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String SaleId
        {
            get { return _SaleId; }
            set { if (OnPropertyChanging(__.SaleId, value)) { _SaleId = value; OnPropertyChanged(__.SaleId); } }
        }

        private String _SaleName;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(10, "SaleName", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String SaleName
        {
            get { return _SaleName; }
            set { if (OnPropertyChanging(__.SaleName, value)) { _SaleName = value; OnPropertyChanged(__.SaleName); } }
        }

        private String _ProductId;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(11, "ProductId", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String ProductId
        {
            get { return _ProductId; }
            set { if (OnPropertyChanging(__.ProductId, value)) { _ProductId = value; OnPropertyChanged(__.ProductId); } }
        }

        private String _ProductName;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(12, "ProductName", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String ProductName
        {
            get { return _ProductName; }
            set { if (OnPropertyChanging(__.ProductName, value)) { _ProductName = value; OnPropertyChanged(__.ProductName); } }
        }

        private String _Number;
        /// <summary>修改者名称</summary>
        [DisplayName("修改者名称")]
        [Description("修改者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(13, "Number", "修改者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String Number
        {
            get { return _Number; }
            set { if (OnPropertyChanging(__.Number, value)) { _Number = value; OnPropertyChanged(__.Number); } }
        }

        private DateTime _CreatedOn;
        /// <summary>创建时间</summary>
        [DisplayName("创建时间")]
        [Description("创建时间")]
        [DataObjectField(false, false, false, 3)]
        [BindColumn(14, "CreatedOn", "创建时间", null, "datetime", 3, 0, false)]
        public virtual DateTime CreatedOn
        {
            get { return _CreatedOn; }
            set { if (OnPropertyChanging(__.CreatedOn, value)) { _CreatedOn = value; OnPropertyChanged(__.CreatedOn); } }
        }

        private String _CreatedByName;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(15, "CreatedByName", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String CreatedByName
        {
            get { return _CreatedByName; }
            set { if (OnPropertyChanging(__.CreatedByName, value)) { _CreatedByName = value; OnPropertyChanged(__.CreatedByName); } }
        }

        private DateTime _ModifiedOn;
        /// <summary>审核时间</summary>
        [DisplayName("审核时间")]
        [Description("审核时间")]
        [DataObjectField(false, false, false, 3)]
        [BindColumn(16, "ModifiedOn", "审核时间", null, "datetime", 3, 0, false)]
        public virtual DateTime ModifiedOn
        {
            get { return _ModifiedOn; }
            set { if (OnPropertyChanging(__.ModifiedOn, value)) { _ModifiedOn = value; OnPropertyChanged(__.ModifiedOn); } }
        }

        private String _ModifiedByName;
        /// <summary>修改者名称</summary>
        [DisplayName("修改者名称")]
        [Description("修改者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(17, "ModifiedByName", "修改者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String ModifiedByName
        {
            get { return _ModifiedByName; }
            set { if (OnPropertyChanging(__.ModifiedByName, value)) { _ModifiedByName = value; OnPropertyChanged(__.ModifiedByName); } }
        }

        private DateTime _FinishedOn;
        /// <summary>完成时间</summary>
        [DisplayName("完成时间")]
        [Description("完成时间")]
        [DataObjectField(false, false, false, 3)]
        [BindColumn(18, "FinishedOn", "完成时间", null, "datetime", 3, 0, false)]
        public virtual DateTime FinishedOn
        {
            get { return _FinishedOn; }
            set { if (OnPropertyChanging(__.FinishedOn, value)) { _FinishedOn = value; OnPropertyChanged(__.FinishedOn); } }
        }
        #endregion

        #region 获取/设置 字段值
        /// <summary>
        /// 获取/设置 字段值。
        /// 一个索引，基类使用反射实现。
        /// 派生实体类可重写该索引，以避免反射带来的性能损耗
        /// </summary>
        /// <param name="name">字段名</param>
        /// <returns></returns>
        public override Object this[String name]
        {
            get
            {
                switch (name)
                {
                    case __.Id : return _Id;
                    case __.InvId : return _InvId;
                    case __.InvName : return _InvName;
                    case __.InvTelePhone : return _InvTelePhone;
                    case __.ProId : return _ProId;
                    case __.ProName : return _ProName;
                    case __.OrderPrice : return _OrderPrice;
                    case __.Status : return _Status;
                    case __.SaleId : return _SaleId;
                    case __.SaleName : return _SaleName;
                    case __.ProductId : return _ProductId;
                    case __.ProductName : return _ProductName;
                    case __.Number : return _Number;
                    case __.CreatedOn : return _CreatedOn;
                    case __.CreatedByName : return _CreatedByName;
                    case __.ModifiedOn : return _ModifiedOn;
                    case __.ModifiedByName : return _ModifiedByName;
                    case __.FinishedOn : return _FinishedOn;
                    default: return base[name];
                }
            }
            set
            {
                switch (name)
                {
                    case __.Id : _Id = Convert.ToInt64(value); break;
                    case __.InvId : _InvId = Convert.ToInt64(value); break;
                    case __.InvName : _InvName = Convert.ToString(value); break;
                    case __.InvTelePhone : _InvTelePhone = Convert.ToString(value); break;
                    case __.ProId : _ProId = Convert.ToString(value); break;
                    case __.ProName : _ProName = Convert.ToString(value); break;
                    case __.OrderPrice : _OrderPrice = Convert.ToString(value); break;
                    case __.Status : _Status = Convert.ToString(value); break;
                    case __.SaleId : _SaleId = Convert.ToString(value); break;
                    case __.SaleName : _SaleName = Convert.ToString(value); break;
                    case __.ProductId : _ProductId = Convert.ToString(value); break;
                    case __.ProductName : _ProductName = Convert.ToString(value); break;
                    case __.Number : _Number = Convert.ToString(value); break;
                    case __.CreatedOn : _CreatedOn = Convert.ToDateTime(value); break;
                    case __.CreatedByName : _CreatedByName = Convert.ToString(value); break;
                    case __.ModifiedOn : _ModifiedOn = Convert.ToDateTime(value); break;
                    case __.ModifiedByName : _ModifiedByName = Convert.ToString(value); break;
                    case __.FinishedOn : _FinishedOn = Convert.ToDateTime(value); break;
                    default: base[name] = value; break;
                }
            }
        }
        #endregion

        #region 字段名
        /// <summary>取得预约管理字段信息的快捷方式</summary>
        public partial class _
        {
            ///<summary>主键ID(自增列)</summary>
            public static readonly Field Id = FindByName(__.Id);

            ///<summary>创建者名称</summary>
            public static readonly Field InvId = FindByName(__.InvId);

            ///<summary>创建者名称</summary>
            public static readonly Field InvName = FindByName(__.InvName);

            ///<summary>创建者名称</summary>
            public static readonly Field InvTelePhone = FindByName(__.InvTelePhone);

            ///<summary>创建者名称</summary>
            public static readonly Field ProId = FindByName(__.ProId);

            ///<summary>创建者名称</summary>
            public static readonly Field ProName = FindByName(__.ProName);

            ///<summary>创建者名称</summary>
            public static readonly Field OrderPrice = FindByName(__.OrderPrice);

            ///<summary>创建者名称</summary>
            public static readonly Field Status = FindByName(__.Status);

            ///<summary>创建者名称</summary>
            public static readonly Field SaleId = FindByName(__.SaleId);

            ///<summary>创建者名称</summary>
            public static readonly Field SaleName = FindByName(__.SaleName);

            ///<summary>创建者名称</summary>
            public static readonly Field ProductId = FindByName(__.ProductId);

            ///<summary>创建者名称</summary>
            public static readonly Field ProductName = FindByName(__.ProductName);

            ///<summary>修改者名称</summary>
            public static readonly Field Number = FindByName(__.Number);

            ///<summary>创建时间</summary>
            public static readonly Field CreatedOn = FindByName(__.CreatedOn);

            ///<summary>创建者名称</summary>
            public static readonly Field CreatedByName = FindByName(__.CreatedByName);

            ///<summary>审核时间</summary>
            public static readonly Field ModifiedOn = FindByName(__.ModifiedOn);

            ///<summary>修改者名称</summary>
            public static readonly Field ModifiedByName = FindByName(__.ModifiedByName);

            ///<summary>完成时间</summary>
            public static readonly Field FinishedOn = FindByName(__.FinishedOn);

            static Field FindByName(String name) { return Meta.Table.FindByName(name); }
        }

        /// <summary>取得预约管理字段名称的快捷方式</summary>
        partial class __
        {
            ///<summary>主键ID(自增列)</summary>
            public const String Id = "Id";

            ///<summary>创建者名称</summary>
            public const String InvId = "InvId";

            ///<summary>创建者名称</summary>
            public const String InvName = "InvName";

            ///<summary>创建者名称</summary>
            public const String InvTelePhone = "InvTelePhone";

            ///<summary>创建者名称</summary>
            public const String ProId = "ProId";

            ///<summary>创建者名称</summary>
            public const String ProName = "ProName";

            ///<summary>创建者名称</summary>
            public const String OrderPrice = "OrderPrice";

            ///<summary>创建者名称</summary>
            public const String Status = "Status";

            ///<summary>创建者名称</summary>
            public const String SaleId = "SaleId";

            ///<summary>创建者名称</summary>
            public const String SaleName = "SaleName";

            ///<summary>创建者名称</summary>
            public const String ProductId = "ProductId";

            ///<summary>创建者名称</summary>
            public const String ProductName = "ProductName";

            ///<summary>修改者名称</summary>
            public const String Number = "Number";

            ///<summary>创建时间</summary>
            public const String CreatedOn = "CreatedOn";

            ///<summary>创建者名称</summary>
            public const String CreatedByName = "CreatedByName";

            ///<summary>审核时间</summary>
            public const String ModifiedOn = "ModifiedOn";

            ///<summary>修改者名称</summary>
            public const String ModifiedByName = "ModifiedByName";

            ///<summary>完成时间</summary>
            public const String FinishedOn = "FinishedOn";

        }
        #endregion
    }

    /// <summary>预约管理接口</summary>
    public partial interface IOrder
    {
        #region 属性
        /// <summary>主键ID(自增列)</summary>
        Int64 Id { get; set; }

        /// <summary>创建者名称</summary>
        Int64 InvId { get; set; }

        /// <summary>创建者名称</summary>
        String InvName { get; set; }

        /// <summary>创建者名称</summary>
        String InvTelePhone { get; set; }

        /// <summary>创建者名称</summary>
        String ProId { get; set; }

        /// <summary>创建者名称</summary>
        String ProName { get; set; }

        /// <summary>创建者名称</summary>
        String OrderPrice { get; set; }

        /// <summary>创建者名称</summary>
        String Status { get; set; }

        /// <summary>创建者名称</summary>
        String SaleId { get; set; }

        /// <summary>创建者名称</summary>
        String SaleName { get; set; }

        /// <summary>创建者名称</summary>
        String ProductId { get; set; }

        /// <summary>创建者名称</summary>
        String ProductName { get; set; }

        /// <summary>修改者名称</summary>
        String Number { get; set; }

        /// <summary>创建时间</summary>
        DateTime CreatedOn { get; set; }

        /// <summary>创建者名称</summary>
        String CreatedByName { get; set; }

        /// <summary>审核时间</summary>
        DateTime ModifiedOn { get; set; }

        /// <summary>修改者名称</summary>
        String ModifiedByName { get; set; }

        /// <summary>完成时间</summary>
        DateTime FinishedOn { get; set; }
        #endregion

        #region 获取/设置 字段值
        /// <summary>获取/设置 字段值。</summary>
        /// <param name="name">字段名</param>
        /// <returns></returns>
        Object this[String name] { get; set; }
        #endregion
    }
}
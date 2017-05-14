﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Xml.Serialization;
using XCode;
using XCode.Configuration;
using XCode.DataAccessLayer;

namespace Dafy.OnlineTran.Entity.Models
{
    /// <summary>产品管理</summary>
    [Serializable]
    [DataObject]
    [Description("产品管理")]
    [BindIndex("PK_PRODUCT", true, "Id")]
    [BindTable("Product", Description = "产品管理", ConnName = "Lomark", DbType = DatabaseType.SqlServer)]
    public partial class Product : IProduct
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

        private String _ProName;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(2, "ProName", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String ProName
        {
            get { return _ProName; }
            set { if (OnPropertyChanging(__.ProName, value)) { _ProName = value; OnPropertyChanged(__.ProName); } }
        }

        private String _ProType;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 50)]
        [BindColumn(3, "ProType", "创建者名称", null, "nvarchar(50)", 0, 0, true)]
        public virtual String ProType
        {
            get { return _ProType; }
            set { if (OnPropertyChanging(__.ProType, value)) { _ProType = value; OnPropertyChanged(__.ProType); } }
        }

        private String _Banner;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(4, "Banner", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String Banner
        {
            get { return _Banner; }
            set { if (OnPropertyChanging(__.Banner, value)) { _Banner = value; OnPropertyChanged(__.Banner); } }
        }

        private Decimal _Price;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 18)]
        [BindColumn(5, "Price", "创建者名称", null, "decimal", 18, 6, false)]
        public virtual Decimal Price
        {
            get { return _Price; }
            set { if (OnPropertyChanging(__.Price, value)) { _Price = value; OnPropertyChanged(__.Price); } }
        }

        private Int64 _ProAge;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 19)]
        [BindColumn(6, "ProAge", "创建者名称", null, "bigint", 19, 0, false)]
        public virtual Int64 ProAge
        {
            get { return _ProAge; }
            set { if (OnPropertyChanging(__.ProAge, value)) { _ProAge = value; OnPropertyChanged(__.ProAge); } }
        }

        private String _Logo;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(7, "Logo", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String Logo
        {
            get { return _Logo; }
            set { if (OnPropertyChanging(__.Logo, value)) { _Logo = value; OnPropertyChanged(__.Logo); } }
        }

        private String _ProPlan;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 2147483647)]
        [BindColumn(8, "ProPlan", "创建者名称", null, "text", 0, 0, false)]
        public virtual String ProPlan
        {
            get { return _ProPlan; }
            set { if (OnPropertyChanging(__.ProPlan, value)) { _ProPlan = value; OnPropertyChanged(__.ProPlan); } }
        }

        private String _ProUse;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 2147483647)]
        [BindColumn(9, "ProUse", "创建者名称", null, "text", 0, 0, false)]
        public virtual String ProUse
        {
            get { return _ProUse; }
            set { if (OnPropertyChanging(__.ProUse, value)) { _ProUse = value; OnPropertyChanged(__.ProUse); } }
        }

        private String _ProDoc;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(10, "ProDoc", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String ProDoc
        {
            get { return _ProDoc; }
            set { if (OnPropertyChanging(__.ProDoc, value)) { _ProDoc = value; OnPropertyChanged(__.ProDoc); } }
        }

        private String _ProCase;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(11, "ProCase", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String ProCase
        {
            get { return _ProCase; }
            set { if (OnPropertyChanging(__.ProCase, value)) { _ProCase = value; OnPropertyChanged(__.ProCase); } }
        }

        private String _WhyChoose;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(12, "WhyChoose", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String WhyChoose
        {
            get { return _WhyChoose; }
            set { if (OnPropertyChanging(__.WhyChoose, value)) { _WhyChoose = value; OnPropertyChanged(__.WhyChoose); } }
        }

        private Int32 _IsHot;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 10)]
        [BindColumn(13, "IsHot", "创建者名称", null, "int", 10, 0, false)]
        public virtual Int32 IsHot
        {
            get { return _IsHot; }
            set { if (OnPropertyChanging(__.IsHot, value)) { _IsHot = value; OnPropertyChanged(__.IsHot); } }
        }

        private Int32 _Status;
        /// <summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
        [DisplayName("状态0：未激活1：激活失败2：已启用3：已停用4：已删除")]
        [Description("状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)")]
        [DataObjectField(false, false, false, 10)]
        [BindColumn(14, "Status", "状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)", "0", "int", 10, 0, false)]
        public virtual Int32 Status
        {
            get { return _Status; }
            set { if (OnPropertyChanging(__.Status, value)) { _Status = value; OnPropertyChanged(__.Status); } }
        }

        private DateTime _CreatedOn;
        /// <summary>创建时间</summary>
        [DisplayName("创建时间")]
        [Description("创建时间")]
        [DataObjectField(false, false, false, 3)]
        [BindColumn(15, "CreatedOn", "创建时间", null, "datetime", 3, 0, false)]
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
        [BindColumn(16, "CreatedByName", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String CreatedByName
        {
            get { return _CreatedByName; }
            set { if (OnPropertyChanging(__.CreatedByName, value)) { _CreatedByName = value; OnPropertyChanged(__.CreatedByName); } }
        }

        private DateTime _ModifiedOn;
        /// <summary>修改时间</summary>
        [DisplayName("修改时间")]
        [Description("修改时间")]
        [DataObjectField(false, false, false, 3)]
        [BindColumn(17, "ModifiedOn", "修改时间", null, "datetime", 3, 0, false)]
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
        [BindColumn(18, "ModifiedByName", "修改者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String ModifiedByName
        {
            get { return _ModifiedByName; }
            set { if (OnPropertyChanging(__.ModifiedByName, value)) { _ModifiedByName = value; OnPropertyChanged(__.ModifiedByName); } }
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
                    case __.ProName : return _ProName;
                    case __.ProType : return _ProType;
                    case __.Banner : return _Banner;
                    case __.Price : return _Price;
                    case __.ProAge : return _ProAge;
                    case __.Logo : return _Logo;
                    case __.ProPlan : return _ProPlan;
                    case __.ProUse : return _ProUse;
                    case __.ProDoc : return _ProDoc;
                    case __.ProCase : return _ProCase;
                    case __.WhyChoose : return _WhyChoose;
                    case __.IsHot : return _IsHot;
                    case __.Status : return _Status;
                    case __.CreatedOn : return _CreatedOn;
                    case __.CreatedByName : return _CreatedByName;
                    case __.ModifiedOn : return _ModifiedOn;
                    case __.ModifiedByName : return _ModifiedByName;
                    default: return base[name];
                }
            }
            set
            {
                switch (name)
                {
                    case __.Id : _Id = Convert.ToInt64(value); break;
                    case __.ProName : _ProName = Convert.ToString(value); break;
                    case __.ProType : _ProType = Convert.ToString(value); break;
                    case __.Banner : _Banner = Convert.ToString(value); break;
                    case __.Price : _Price = Convert.ToDecimal(value); break;
                    case __.ProAge : _ProAge = Convert.ToInt64(value); break;
                    case __.Logo : _Logo = Convert.ToString(value); break;
                    case __.ProPlan : _ProPlan = Convert.ToString(value); break;
                    case __.ProUse : _ProUse = Convert.ToString(value); break;
                    case __.ProDoc : _ProDoc = Convert.ToString(value); break;
                    case __.ProCase : _ProCase = Convert.ToString(value); break;
                    case __.WhyChoose : _WhyChoose = Convert.ToString(value); break;
                    case __.IsHot : _IsHot = Convert.ToInt32(value); break;
                    case __.Status : _Status = Convert.ToInt32(value); break;
                    case __.CreatedOn : _CreatedOn = Convert.ToDateTime(value); break;
                    case __.CreatedByName : _CreatedByName = Convert.ToString(value); break;
                    case __.ModifiedOn : _ModifiedOn = Convert.ToDateTime(value); break;
                    case __.ModifiedByName : _ModifiedByName = Convert.ToString(value); break;
                    default: base[name] = value; break;
                }
            }
        }
        #endregion

        #region 字段名
        /// <summary>取得产品管理字段信息的快捷方式</summary>
        public partial class _
        {
            ///<summary>主键ID(自增列)</summary>
            public static readonly Field Id = FindByName(__.Id);

            ///<summary>创建者名称</summary>
            public static readonly Field ProName = FindByName(__.ProName);

            ///<summary>创建者名称</summary>
            public static readonly Field ProType = FindByName(__.ProType);

            ///<summary>创建者名称</summary>
            public static readonly Field Banner = FindByName(__.Banner);

            ///<summary>创建者名称</summary>
            public static readonly Field Price = FindByName(__.Price);

            ///<summary>创建者名称</summary>
            public static readonly Field ProAge = FindByName(__.ProAge);

            ///<summary>创建者名称</summary>
            public static readonly Field Logo = FindByName(__.Logo);

            ///<summary>创建者名称</summary>
            public static readonly Field ProPlan = FindByName(__.ProPlan);

            ///<summary>创建者名称</summary>
            public static readonly Field ProUse = FindByName(__.ProUse);

            ///<summary>创建者名称</summary>
            public static readonly Field ProDoc = FindByName(__.ProDoc);

            ///<summary>创建者名称</summary>
            public static readonly Field ProCase = FindByName(__.ProCase);

            ///<summary>创建者名称</summary>
            public static readonly Field WhyChoose = FindByName(__.WhyChoose);

            ///<summary>创建者名称</summary>
            public static readonly Field IsHot = FindByName(__.IsHot);

            ///<summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
            public static readonly Field Status = FindByName(__.Status);

            ///<summary>创建时间</summary>
            public static readonly Field CreatedOn = FindByName(__.CreatedOn);

            ///<summary>创建者名称</summary>
            public static readonly Field CreatedByName = FindByName(__.CreatedByName);

            ///<summary>修改时间</summary>
            public static readonly Field ModifiedOn = FindByName(__.ModifiedOn);

            ///<summary>修改者名称</summary>
            public static readonly Field ModifiedByName = FindByName(__.ModifiedByName);

            static Field FindByName(String name) { return Meta.Table.FindByName(name); }
        }

        /// <summary>取得产品管理字段名称的快捷方式</summary>
        partial class __
        {
            ///<summary>主键ID(自增列)</summary>
            public const String Id = "Id";

            ///<summary>创建者名称</summary>
            public const String ProName = "ProName";

            ///<summary>创建者名称</summary>
            public const String ProType = "ProType";

            ///<summary>创建者名称</summary>
            public const String Banner = "Banner";

            ///<summary>创建者名称</summary>
            public const String Price = "Price";

            ///<summary>创建者名称</summary>
            public const String ProAge = "ProAge";

            ///<summary>创建者名称</summary>
            public const String Logo = "Logo";

            ///<summary>创建者名称</summary>
            public const String ProPlan = "ProPlan";

            ///<summary>创建者名称</summary>
            public const String ProUse = "ProUse";

            ///<summary>创建者名称</summary>
            public const String ProDoc = "ProDoc";

            ///<summary>创建者名称</summary>
            public const String ProCase = "ProCase";

            ///<summary>创建者名称</summary>
            public const String WhyChoose = "WhyChoose";

            ///<summary>创建者名称</summary>
            public const String IsHot = "IsHot";

            ///<summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
            public const String Status = "Status";

            ///<summary>创建时间</summary>
            public const String CreatedOn = "CreatedOn";

            ///<summary>创建者名称</summary>
            public const String CreatedByName = "CreatedByName";

            ///<summary>修改时间</summary>
            public const String ModifiedOn = "ModifiedOn";

            ///<summary>修改者名称</summary>
            public const String ModifiedByName = "ModifiedByName";

        }
        #endregion
    }

    /// <summary>产品管理接口</summary>
    public partial interface IProduct
    {
        #region 属性
        /// <summary>主键ID(自增列)</summary>
        Int64 Id { get; set; }

        /// <summary>创建者名称</summary>
        String ProName { get; set; }

        /// <summary>创建者名称</summary>
        String ProType { get; set; }

        /// <summary>创建者名称</summary>
        String Banner { get; set; }

        /// <summary>创建者名称</summary>
        Decimal Price { get; set; }

        /// <summary>创建者名称</summary>
        Int64 ProAge { get; set; }

        /// <summary>创建者名称</summary>
        String Logo { get; set; }

        /// <summary>创建者名称</summary>
        String ProPlan { get; set; }

        /// <summary>创建者名称</summary>
        String ProUse { get; set; }

        /// <summary>创建者名称</summary>
        String ProDoc { get; set; }

        /// <summary>创建者名称</summary>
        String ProCase { get; set; }

        /// <summary>创建者名称</summary>
        String WhyChoose { get; set; }

        /// <summary>创建者名称</summary>
        Int32 IsHot { get; set; }

        /// <summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
        Int32 Status { get; set; }

        /// <summary>创建时间</summary>
        DateTime CreatedOn { get; set; }

        /// <summary>创建者名称</summary>
        String CreatedByName { get; set; }

        /// <summary>修改时间</summary>
        DateTime ModifiedOn { get; set; }

        /// <summary>修改者名称</summary>
        String ModifiedByName { get; set; }
        #endregion

        #region 获取/设置 字段值
        /// <summary>获取/设置 字段值。</summary>
        /// <param name="name">字段名</param>
        /// <returns></returns>
        Object this[String name] { get; set; }
        #endregion
    }
}
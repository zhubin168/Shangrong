﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Xml.Serialization;
using XCode;
using XCode.Configuration;
using XCode.DataAccessLayer;

namespace Dafy.OnlineTran.Entity.Models
{
    /// <summary></summary>
    [Serializable]
    [DataObject]
    [Description("")]
    [BindIndex("PK_S_Province", true, "ProvinceID")]
    [BindTable("BaseProvince", Description = "", ConnName = "Lomark", DbType = DatabaseType.SqlServer)]
    public partial class BaseProvince : IBaseProvince
    {
        #region 属性
        private Int64 _ProvinceID;
        /// <summary></summary>
        [DisplayName("ProvinceID")]
        [Description("")]
        [DataObjectField(true, true, false, 19)]
        [BindColumn(1, "ProvinceID", "", null, "bigint", 19, 0, false)]
        public virtual Int64 ProvinceID
        {
            get { return _ProvinceID; }
            set { if (OnPropertyChanging(__.ProvinceID, value)) { _ProvinceID = value; OnPropertyChanged(__.ProvinceID); } }
        }

        private String _ProvinceName;
        /// <summary></summary>
        [DisplayName("ProvinceName")]
        [Description("")]
        [DataObjectField(false, false, true, 50)]
        [BindColumn(2, "ProvinceName", "", null, "nvarchar(50)", 0, 0, true)]
        public virtual String ProvinceName
        {
            get { return _ProvinceName; }
            set { if (OnPropertyChanging(__.ProvinceName, value)) { _ProvinceName = value; OnPropertyChanged(__.ProvinceName); } }
        }

        private DateTime _DateCreated;
        /// <summary></summary>
        [DisplayName("DateCreated")]
        [Description("")]
        [DataObjectField(false, false, true, 3)]
        [BindColumn(3, "DateCreated", "", null, "datetime", 3, 0, false)]
        public virtual DateTime DateCreated
        {
            get { return _DateCreated; }
            set { if (OnPropertyChanging(__.DateCreated, value)) { _DateCreated = value; OnPropertyChanged(__.DateCreated); } }
        }

        private DateTime _DateUpdated;
        /// <summary></summary>
        [DisplayName("DateUpdated")]
        [Description("")]
        [DataObjectField(false, false, true, 3)]
        [BindColumn(4, "DateUpdated", "", null, "datetime", 3, 0, false)]
        public virtual DateTime DateUpdated
        {
            get { return _DateUpdated; }
            set { if (OnPropertyChanging(__.DateUpdated, value)) { _DateUpdated = value; OnPropertyChanged(__.DateUpdated); } }
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
                    case __.ProvinceID : return _ProvinceID;
                    case __.ProvinceName : return _ProvinceName;
                    case __.DateCreated : return _DateCreated;
                    case __.DateUpdated : return _DateUpdated;
                    default: return base[name];
                }
            }
            set
            {
                switch (name)
                {
                    case __.ProvinceID : _ProvinceID = Convert.ToInt64(value); break;
                    case __.ProvinceName : _ProvinceName = Convert.ToString(value); break;
                    case __.DateCreated : _DateCreated = Convert.ToDateTime(value); break;
                    case __.DateUpdated : _DateUpdated = Convert.ToDateTime(value); break;
                    default: base[name] = value; break;
                }
            }
        }
        #endregion

        #region 字段名
        /// <summary>取得字段信息的快捷方式</summary>
        public partial class _
        {
            ///<summary></summary>
            public static readonly Field ProvinceID = FindByName(__.ProvinceID);

            ///<summary></summary>
            public static readonly Field ProvinceName = FindByName(__.ProvinceName);

            ///<summary></summary>
            public static readonly Field DateCreated = FindByName(__.DateCreated);

            ///<summary></summary>
            public static readonly Field DateUpdated = FindByName(__.DateUpdated);

            static Field FindByName(String name) { return Meta.Table.FindByName(name); }
        }

        /// <summary>取得字段名称的快捷方式</summary>
        partial class __
        {
            ///<summary></summary>
            public const String ProvinceID = "ProvinceID";

            ///<summary></summary>
            public const String ProvinceName = "ProvinceName";

            ///<summary></summary>
            public const String DateCreated = "DateCreated";

            ///<summary></summary>
            public const String DateUpdated = "DateUpdated";

        }
        #endregion
    }

    /// <summary>接口</summary>
    public partial interface IBaseProvince
    {
        #region 属性
        /// <summary></summary>
        Int64 ProvinceID { get; set; }

        /// <summary></summary>
        String ProvinceName { get; set; }

        /// <summary></summary>
        DateTime DateCreated { get; set; }

        /// <summary></summary>
        DateTime DateUpdated { get; set; }
        #endregion

        #region 获取/设置 字段值
        /// <summary>获取/设置 字段值。</summary>
        /// <param name="name">字段名</param>
        /// <returns></returns>
        Object this[String name] { get; set; }
        #endregion
    }
}
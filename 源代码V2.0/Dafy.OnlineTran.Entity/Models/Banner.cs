﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Xml.Serialization;
using XCode;
using XCode.Configuration;
using XCode.DataAccessLayer;

namespace Dafy.OnlineTran.Entity.Models
{
    /// <summary>活动表</summary>
    [Serializable]
    [DataObject]
    [Description("活动表")]
    [BindIndex("PK_Banner", true, "id")]
    [BindTable("Banner", Description = "活动表", ConnName = "Lomark", DbType = DatabaseType.SqlServer)]
    public partial class Banner : IBanner
    {
        #region 属性
        private Int64 _id;
        /// <summary>活动页ID</summary>
        [DisplayName("活动页ID")]
        [Description("活动页ID")]
        [DataObjectField(true, true, false, 19)]
        [BindColumn(1, "id", "活动页ID", null, "bigint", 19, 0, false)]
        public virtual Int64 id
        {
            get { return _id; }
            set { if (OnPropertyChanging(__.id, value)) { _id = value; OnPropertyChanged(__.id); } }
        }

        private Byte[] _title;
        /// <summary>活动页标题</summary>
        [DisplayName("活动页标题")]
        [Description("活动页标题")]
        [DataObjectField(false, false, false, 50)]
        [BindColumn(2, "title", "活动页标题", null, "varbinary(50)", 0, 0, false)]
        public virtual Byte[] title
        {
            get { return _title; }
            set { if (OnPropertyChanging(__.title, value)) { _title = value; OnPropertyChanged(__.title); } }
        }

        private Byte[] _imageUrl;
        /// <summary>活动页图片地址</summary>
        [DisplayName("活动页图片地址")]
        [Description("活动页图片地址")]
        [DataObjectField(false, false, false, 50)]
        [BindColumn(3, "imageUrl", "活动页图片地址", null, "varbinary(50)", 0, 0, false)]
        public virtual Byte[] imageUrl
        {
            get { return _imageUrl; }
            set { if (OnPropertyChanging(__.imageUrl, value)) { _imageUrl = value; OnPropertyChanged(__.imageUrl); } }
        }

        private Byte[] _contentUrl;
        /// <summary>活动页内容地址</summary>
        [DisplayName("活动页内容地址")]
        [Description("活动页内容地址")]
        [DataObjectField(false, false, false, 50)]
        [BindColumn(4, "contentUrl", "活动页内容地址", null, "varbinary(50)", 0, 0, false)]
        public virtual Byte[] contentUrl
        {
            get { return _contentUrl; }
            set { if (OnPropertyChanging(__.contentUrl, value)) { _contentUrl = value; OnPropertyChanged(__.contentUrl); } }
        }

        private Byte[] _visiableUid;
        /// <summary>可见用户</summary>
        [DisplayName("可见用户")]
        [Description("可见用户")]
        [DataObjectField(false, false, false, 50)]
        [BindColumn(5, "visiableUid", "可见用户", null, "varbinary(50)", 0, 0, false)]
        public virtual Byte[] visiableUid
        {
            get { return _visiableUid; }
            set { if (OnPropertyChanging(__.visiableUid, value)) { _visiableUid = value; OnPropertyChanged(__.visiableUid); } }
        }

        private Int32 _status;
        /// <summary>活动状态</summary>
        [DisplayName("活动状态")]
        [Description("活动状态")]
        [DataObjectField(false, false, false, 10)]
        [BindColumn(6, "status", "活动状态", null, "int", 10, 0, false)]
        public virtual Int32 status
        {
            get { return _status; }
            set { if (OnPropertyChanging(__.status, value)) { _status = value; OnPropertyChanged(__.status); } }
        }

        private DateTime _publishTime;
        /// <summary>发布时间</summary>
        [DisplayName("发布时间")]
        [Description("发布时间")]
        [DataObjectField(false, false, false, 3)]
        [BindColumn(7, "publishTime", "发布时间", null, "datetime", 3, 0, false)]
        public virtual DateTime publishTime
        {
            get { return _publishTime; }
            set { if (OnPropertyChanging(__.publishTime, value)) { _publishTime = value; OnPropertyChanged(__.publishTime); } }
        }

        private DateTime _createTime;
        /// <summary>创建时间</summary>
        [DisplayName("创建时间")]
        [Description("创建时间")]
        [DataObjectField(false, false, false, 3)]
        [BindColumn(8, "createTime", "创建时间", null, "datetime", 3, 0, false)]
        public virtual DateTime createTime
        {
            get { return _createTime; }
            set { if (OnPropertyChanging(__.createTime, value)) { _createTime = value; OnPropertyChanged(__.createTime); } }
        }

        private DateTime _updateTime;
        /// <summary>更新时间</summary>
        [DisplayName("更新时间")]
        [Description("更新时间")]
        [DataObjectField(false, false, false, 3)]
        [BindColumn(9, "updateTime", "更新时间", null, "datetime", 3, 0, false)]
        public virtual DateTime updateTime
        {
            get { return _updateTime; }
            set { if (OnPropertyChanging(__.updateTime, value)) { _updateTime = value; OnPropertyChanged(__.updateTime); } }
        }

        private Int64 _createUid;
        /// <summary>创建者,用户表的uid</summary>
        [DisplayName("创建者,用户表的uid")]
        [Description("创建者,用户表的uid")]
        [DataObjectField(false, false, false, 19)]
        [BindColumn(10, "createUid", "创建者,用户表的uid", null, "bigint", 19, 0, false)]
        public virtual Int64 createUid
        {
            get { return _createUid; }
            set { if (OnPropertyChanging(__.createUid, value)) { _createUid = value; OnPropertyChanged(__.createUid); } }
        }

        private Int64 _modifyUid;
        /// <summary>修改者，用户表的uid</summary>
        [DisplayName("修改者，用户表的uid")]
        [Description("修改者，用户表的uid")]
        [DataObjectField(false, false, true, 19)]
        [BindColumn(11, "modifyUid", "修改者，用户表的uid", null, "bigint", 19, 0, false)]
        public virtual Int64 modifyUid
        {
            get { return _modifyUid; }
            set { if (OnPropertyChanging(__.modifyUid, value)) { _modifyUid = value; OnPropertyChanged(__.modifyUid); } }
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
                    case __.id : return _id;
                    case __.title : return _title;
                    case __.imageUrl : return _imageUrl;
                    case __.contentUrl : return _contentUrl;
                    case __.visiableUid : return _visiableUid;
                    case __.status : return _status;
                    case __.publishTime : return _publishTime;
                    case __.createTime : return _createTime;
                    case __.updateTime : return _updateTime;
                    case __.createUid : return _createUid;
                    case __.modifyUid : return _modifyUid;
                    default: return base[name];
                }
            }
            set
            {
                switch (name)
                {
                    case __.id : _id = Convert.ToInt64(value); break;
                    case __.title : _title = (Byte[])value; break;
                    case __.imageUrl : _imageUrl = (Byte[])value; break;
                    case __.contentUrl : _contentUrl = (Byte[])value; break;
                    case __.visiableUid : _visiableUid = (Byte[])value; break;
                    case __.status : _status = Convert.ToInt32(value); break;
                    case __.publishTime : _publishTime = Convert.ToDateTime(value); break;
                    case __.createTime : _createTime = Convert.ToDateTime(value); break;
                    case __.updateTime : _updateTime = Convert.ToDateTime(value); break;
                    case __.createUid : _createUid = Convert.ToInt64(value); break;
                    case __.modifyUid : _modifyUid = Convert.ToInt64(value); break;
                    default: base[name] = value; break;
                }
            }
        }
        #endregion

        #region 字段名
        /// <summary>取得活动表字段信息的快捷方式</summary>
        public partial class _
        {
            ///<summary>活动页ID</summary>
            public static readonly Field id = FindByName(__.id);

            ///<summary>活动页标题</summary>
            public static readonly Field title = FindByName(__.title);

            ///<summary>活动页图片地址</summary>
            public static readonly Field imageUrl = FindByName(__.imageUrl);

            ///<summary>活动页内容地址</summary>
            public static readonly Field contentUrl = FindByName(__.contentUrl);

            ///<summary>可见用户</summary>
            public static readonly Field visiableUid = FindByName(__.visiableUid);

            ///<summary>活动状态</summary>
            public static readonly Field status = FindByName(__.status);

            ///<summary>发布时间</summary>
            public static readonly Field publishTime = FindByName(__.publishTime);

            ///<summary>创建时间</summary>
            public static readonly Field createTime = FindByName(__.createTime);

            ///<summary>更新时间</summary>
            public static readonly Field updateTime = FindByName(__.updateTime);

            ///<summary>创建者,用户表的uid</summary>
            public static readonly Field createUid = FindByName(__.createUid);

            ///<summary>修改者，用户表的uid</summary>
            public static readonly Field modifyUid = FindByName(__.modifyUid);

            static Field FindByName(String name) { return Meta.Table.FindByName(name); }
        }

        /// <summary>取得活动表字段名称的快捷方式</summary>
        partial class __
        {
            ///<summary>活动页ID</summary>
            public const String id = "id";

            ///<summary>活动页标题</summary>
            public const String title = "title";

            ///<summary>活动页图片地址</summary>
            public const String imageUrl = "imageUrl";

            ///<summary>活动页内容地址</summary>
            public const String contentUrl = "contentUrl";

            ///<summary>可见用户</summary>
            public const String visiableUid = "visiableUid";

            ///<summary>活动状态</summary>
            public const String status = "status";

            ///<summary>发布时间</summary>
            public const String publishTime = "publishTime";

            ///<summary>创建时间</summary>
            public const String createTime = "createTime";

            ///<summary>更新时间</summary>
            public const String updateTime = "updateTime";

            ///<summary>创建者,用户表的uid</summary>
            public const String createUid = "createUid";

            ///<summary>修改者，用户表的uid</summary>
            public const String modifyUid = "modifyUid";

        }
        #endregion
    }

    /// <summary>活动表接口</summary>
    public partial interface IBanner
    {
        #region 属性
        /// <summary>活动页ID</summary>
        Int64 id { get; set; }

        /// <summary>活动页标题</summary>
        Byte[] title { get; set; }

        /// <summary>活动页图片地址</summary>
        Byte[] imageUrl { get; set; }

        /// <summary>活动页内容地址</summary>
        Byte[] contentUrl { get; set; }

        /// <summary>可见用户</summary>
        Byte[] visiableUid { get; set; }

        /// <summary>活动状态</summary>
        Int32 status { get; set; }

        /// <summary>发布时间</summary>
        DateTime publishTime { get; set; }

        /// <summary>创建时间</summary>
        DateTime createTime { get; set; }

        /// <summary>更新时间</summary>
        DateTime updateTime { get; set; }

        /// <summary>创建者,用户表的uid</summary>
        Int64 createUid { get; set; }

        /// <summary>修改者，用户表的uid</summary>
        Int64 modifyUid { get; set; }
        #endregion

        #region 获取/设置 字段值
        /// <summary>获取/设置 字段值。</summary>
        /// <param name="name">字段名</param>
        /// <returns></returns>
        Object this[String name] { get; set; }
        #endregion
    }
}
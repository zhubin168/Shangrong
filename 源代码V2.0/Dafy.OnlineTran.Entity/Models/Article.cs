﻿﻿using System;
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
    [BindIndex("PK_Aritcle", true, "id")]
    [BindTable("Article", Description = "", ConnName = "Lomark", DbType = DatabaseType.SqlServer)]
    public partial class Article : IArticle
    {
        #region 属性
        private Int64 _id;
        /// <summary>文章ID</summary>
        [DisplayName("文章ID")]
        [Description("文章ID")]
        [DataObjectField(true, true, false, 19)]
        [BindColumn(1, "id", "文章ID", null, "bigint", 19, 0, false)]
        public virtual Int64 id
        {
            get { return _id; }
            set { if (OnPropertyChanging(__.id, value)) { _id = value; OnPropertyChanged(__.id); } }
        }

        private String _title;
        /// <summary>文章标题</summary>
        [DisplayName("文章标题")]
        [Description("文章标题")]
        [DataObjectField(false, false, false, 50)]
        [BindColumn(2, "title", "文章标题", null, "nvarchar(50)", 0, 0, true)]
        public virtual String title
        {
            get { return _title; }
            set { if (OnPropertyChanging(__.title, value)) { _title = value; OnPropertyChanged(__.title); } }
        }

        private Int32 _type;
        /// <summary>文章类型</summary>
        [DisplayName("文章类型")]
        [Description("文章类型")]
        [DataObjectField(false, false, false, 10)]
        [BindColumn(3, "type", "文章类型", null, "int", 10, 0, false)]
        public virtual Int32 type
        {
            get { return _type; }
            set { if (OnPropertyChanging(__.type, value)) { _type = value; OnPropertyChanged(__.type); } }
        }

        private String _shareUrl;
        /// <summary>文章分享图片</summary>
        [DisplayName("文章分享图片")]
        [Description("文章分享图片")]
        [DataObjectField(false, false, true, 50)]
        [BindColumn(4, "shareUrl", "文章分享图片", null, "nvarchar(50)", 0, 0, true)]
        public virtual String shareUrl
        {
            get { return _shareUrl; }
            set { if (OnPropertyChanging(__.shareUrl, value)) { _shareUrl = value; OnPropertyChanged(__.shareUrl); } }
        }

        private String _shareTitle;
        /// <summary>文章分享描述</summary>
        [DisplayName("文章分享描述")]
        [Description("文章分享描述")]
        [DataObjectField(false, false, true, 50)]
        [BindColumn(5, "shareTitle", "文章分享描述", null, "nvarchar(50)", 0, 0, true)]
        public virtual String shareTitle
        {
            get { return _shareTitle; }
            set { if (OnPropertyChanging(__.shareTitle, value)) { _shareTitle = value; OnPropertyChanged(__.shareTitle); } }
        }

        private String _listUrl;
        /// <summary>文章列表图片</summary>
        [DisplayName("文章列表图片")]
        [Description("文章列表图片")]
        [DataObjectField(false, false, true, 50)]
        [BindColumn(6, "listUrl", "文章列表图片", null, "nvarchar(50)", 0, 0, true)]
        public virtual String listUrl
        {
            get { return _listUrl; }
            set { if (OnPropertyChanging(__.listUrl, value)) { _listUrl = value; OnPropertyChanged(__.listUrl); } }
        }

        private String _contentUrl;
        /// <summary>正文链接</summary>
        [DisplayName("正文链接")]
        [Description("正文链接")]
        [DataObjectField(false, false, true, 50)]
        [BindColumn(7, "contentUrl", "正文链接", null, "nvarchar(50)", 0, 0, true)]
        public virtual String contentUrl
        {
            get { return _contentUrl; }
            set { if (OnPropertyChanging(__.contentUrl, value)) { _contentUrl = value; OnPropertyChanged(__.contentUrl); } }
        }

        private String _content;
        /// <summary>文章内容</summary>
        [DisplayName("文章内容")]
        [Description("文章内容")]
        [DataObjectField(false, false, false, 2147483647)]
        [BindColumn(8, "content", "文章内容", null, "text", 0, 0, false)]
        public virtual String content
        {
            get { return _content; }
            set { if (OnPropertyChanging(__.content, value)) { _content = value; OnPropertyChanged(__.content); } }
        }

        private Int32 _status;
        /// <summary>文章状态</summary>
        [DisplayName("文章状态")]
        [Description("文章状态")]
        [DataObjectField(false, false, false, 10)]
        [BindColumn(9, "status", "文章状态", null, "int", 10, 0, false)]
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
        [BindColumn(10, "publishTime", "发布时间", null, "datetime", 3, 0, false)]
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
        [BindColumn(11, "createTime", "创建时间", null, "datetime", 3, 0, false)]
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
        [BindColumn(12, "updateTime", "更新时间", null, "datetime", 3, 0, false)]
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
        [BindColumn(13, "createUid", "创建者,用户表的uid", null, "bigint", 19, 0, false)]
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
        [BindColumn(14, "modifyUid", "修改者，用户表的uid", null, "bigint", 19, 0, false)]
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
                    case __.type : return _type;
                    case __.shareUrl : return _shareUrl;
                    case __.shareTitle : return _shareTitle;
                    case __.listUrl : return _listUrl;
                    case __.contentUrl : return _contentUrl;
                    case __.content : return _content;
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
                    case __.title : _title = Convert.ToString(value); break;
                    case __.type : _type = Convert.ToInt32(value); break;
                    case __.shareUrl : _shareUrl = Convert.ToString(value); break;
                    case __.shareTitle : _shareTitle = Convert.ToString(value); break;
                    case __.listUrl : _listUrl = Convert.ToString(value); break;
                    case __.contentUrl : _contentUrl = Convert.ToString(value); break;
                    case __.content : _content = Convert.ToString(value); break;
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
        /// <summary>取得字段信息的快捷方式</summary>
        public partial class _
        {
            ///<summary>文章ID</summary>
            public static readonly Field id = FindByName(__.id);

            ///<summary>文章标题</summary>
            public static readonly Field title = FindByName(__.title);

            ///<summary>文章类型</summary>
            public static readonly Field type = FindByName(__.type);

            ///<summary>文章分享图片</summary>
            public static readonly Field shareUrl = FindByName(__.shareUrl);

            ///<summary>文章分享描述</summary>
            public static readonly Field shareTitle = FindByName(__.shareTitle);

            ///<summary>文章列表图片</summary>
            public static readonly Field listUrl = FindByName(__.listUrl);

            ///<summary>正文链接</summary>
            public static readonly Field contentUrl = FindByName(__.contentUrl);

            ///<summary>文章内容</summary>
            public static readonly Field content = FindByName(__.content);

            ///<summary>文章状态</summary>
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

        /// <summary>取得字段名称的快捷方式</summary>
        partial class __
        {
            ///<summary>文章ID</summary>
            public const String id = "id";

            ///<summary>文章标题</summary>
            public const String title = "title";

            ///<summary>文章类型</summary>
            public const String type = "type";

            ///<summary>文章分享图片</summary>
            public const String shareUrl = "shareUrl";

            ///<summary>文章分享描述</summary>
            public const String shareTitle = "shareTitle";

            ///<summary>文章列表图片</summary>
            public const String listUrl = "listUrl";

            ///<summary>正文链接</summary>
            public const String contentUrl = "contentUrl";

            ///<summary>文章内容</summary>
            public const String content = "content";

            ///<summary>文章状态</summary>
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

    /// <summary>接口</summary>
    public partial interface IArticle
    {
        #region 属性
        /// <summary>文章ID</summary>
        Int64 id { get; set; }

        /// <summary>文章标题</summary>
        String title { get; set; }

        /// <summary>文章类型</summary>
        Int32 type { get; set; }

        /// <summary>文章分享图片</summary>
        String shareUrl { get; set; }

        /// <summary>文章分享描述</summary>
        String shareTitle { get; set; }

        /// <summary>文章列表图片</summary>
        String listUrl { get; set; }

        /// <summary>正文链接</summary>
        String contentUrl { get; set; }

        /// <summary>文章内容</summary>
        String content { get; set; }

        /// <summary>文章状态</summary>
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
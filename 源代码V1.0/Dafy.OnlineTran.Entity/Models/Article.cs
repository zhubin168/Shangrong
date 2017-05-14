﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Xml.Serialization;
using XCode;
using XCode.Configuration;
using XCode.DataAccessLayer;

namespace Dafy.OnlineTran.Entity.Models
{
    /// <summary>文章管理</summary>
    [Serializable]
    [DataObject]
    [Description("文章管理")]
    [BindIndex("PK_ARTICLE", true, "Id")]
    [BindTable("Article", Description = "文章管理", ConnName = "Lomark", DbType = DatabaseType.SqlServer)]
    public partial class Article : IArticle
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

        private String _ArticleTitle;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, false, 150)]
        [BindColumn(2, "ArticleTitle", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String ArticleTitle
        {
            get { return _ArticleTitle; }
            set { if (OnPropertyChanging(__.ArticleTitle, value)) { _ArticleTitle = value; OnPropertyChanged(__.ArticleTitle); } }
        }

        private Int32 _ArticleType;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, true, 10)]
        [BindColumn(3, "ArticleType", "创建者名称", null, "int", 10, 0, false)]
        public virtual Int32 ArticleType
        {
            get { return _ArticleType; }
            set { if (OnPropertyChanging(__.ArticleType, value)) { _ArticleType = value; OnPropertyChanged(__.ArticleType); } }
        }

        private String _ArticleImg;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, true, 150)]
        [BindColumn(4, "ArticleImg", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String ArticleImg
        {
            get { return _ArticleImg; }
            set { if (OnPropertyChanging(__.ArticleImg, value)) { _ArticleImg = value; OnPropertyChanged(__.ArticleImg); } }
        }

        private String _ArticleContent;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, true, 2147483647)]
        [BindColumn(5, "ArticleContent", "创建者名称", null, "text", 0, 0, false)]
        public virtual String ArticleContent
        {
            get { return _ArticleContent; }
            set { if (OnPropertyChanging(__.ArticleContent, value)) { _ArticleContent = value; OnPropertyChanged(__.ArticleContent); } }
        }

        private Int32 _IsRecommand;
        /// <summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
        [DisplayName("状态0：未激活1：激活失败2：已启用3：已停用4：已删除")]
        [Description("状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)")]
        [DataObjectField(false, false, true, 10)]
        [BindColumn(6, "IsRecommand", "状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)", "0", "int", 10, 0, false)]
        public virtual Int32 IsRecommand
        {
            get { return _IsRecommand; }
            set { if (OnPropertyChanging(__.IsRecommand, value)) { _IsRecommand = value; OnPropertyChanged(__.IsRecommand); } }
        }

        private Int32 _IsPublish;
        /// <summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
        [DisplayName("状态0：未激活1：激活失败2：已启用3：已停用4：已删除")]
        [Description("状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)")]
        [DataObjectField(false, false, true, 10)]
        [BindColumn(7, "IsPublish", "状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)", "0", "int", 10, 0, false)]
        public virtual Int32 IsPublish
        {
            get { return _IsPublish; }
            set { if (OnPropertyChanging(__.IsPublish, value)) { _IsPublish = value; OnPropertyChanged(__.IsPublish); } }
        }

        private Int32 _Status;
        /// <summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
        [DisplayName("状态0：未激活1：激活失败2：已启用3：已停用4：已删除")]
        [Description("状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)")]
        [DataObjectField(false, false, true, 10)]
        [BindColumn(8, "Status", "状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)", "0", "int", 10, 0, false)]
        public virtual Int32 Status
        {
            get { return _Status; }
            set { if (OnPropertyChanging(__.Status, value)) { _Status = value; OnPropertyChanged(__.Status); } }
        }

        private DateTime _CreatedOn;
        /// <summary>创建时间</summary>
        [DisplayName("创建时间")]
        [Description("创建时间")]
        [DataObjectField(false, false, true, 3)]
        [BindColumn(9, "CreatedOn", "创建时间", null, "datetime", 3, 0, false)]
        public virtual DateTime CreatedOn
        {
            get { return _CreatedOn; }
            set { if (OnPropertyChanging(__.CreatedOn, value)) { _CreatedOn = value; OnPropertyChanged(__.CreatedOn); } }
        }

        private String _CreatedByName;
        /// <summary>创建者名称</summary>
        [DisplayName("创建者名称")]
        [Description("创建者名称")]
        [DataObjectField(false, false, true, 150)]
        [BindColumn(10, "CreatedByName", "创建者名称", null, "nvarchar(150)", 0, 0, true)]
        public virtual String CreatedByName
        {
            get { return _CreatedByName; }
            set { if (OnPropertyChanging(__.CreatedByName, value)) { _CreatedByName = value; OnPropertyChanged(__.CreatedByName); } }
        }

        private DateTime _ModifiedOn;
        /// <summary>修改时间</summary>
        [DisplayName("修改时间")]
        [Description("修改时间")]
        [DataObjectField(false, false, true, 3)]
        [BindColumn(11, "ModifiedOn", "修改时间", null, "datetime", 3, 0, false)]
        public virtual DateTime ModifiedOn
        {
            get { return _ModifiedOn; }
            set { if (OnPropertyChanging(__.ModifiedOn, value)) { _ModifiedOn = value; OnPropertyChanged(__.ModifiedOn); } }
        }

        private String _ModifiedByName;
        /// <summary>修改者名称</summary>
        [DisplayName("修改者名称")]
        [Description("修改者名称")]
        [DataObjectField(false, false, true, 150)]
        [BindColumn(12, "ModifiedByName", "修改者名称", null, "nvarchar(150)", 0, 0, true)]
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
                    case __.ArticleTitle : return _ArticleTitle;
                    case __.ArticleType : return _ArticleType;
                    case __.ArticleImg : return _ArticleImg;
                    case __.ArticleContent : return _ArticleContent;
                    case __.IsRecommand : return _IsRecommand;
                    case __.IsPublish : return _IsPublish;
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
                    case __.ArticleTitle : _ArticleTitle = Convert.ToString(value); break;
                    case __.ArticleType : _ArticleType = Convert.ToInt32(value); break;
                    case __.ArticleImg : _ArticleImg = Convert.ToString(value); break;
                    case __.ArticleContent : _ArticleContent = Convert.ToString(value); break;
                    case __.IsRecommand : _IsRecommand = Convert.ToInt32(value); break;
                    case __.IsPublish : _IsPublish = Convert.ToInt32(value); break;
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
        /// <summary>取得文章管理字段信息的快捷方式</summary>
        public partial class _
        {
            ///<summary>主键ID(自增列)</summary>
            public static readonly Field Id = FindByName(__.Id);

            ///<summary>创建者名称</summary>
            public static readonly Field ArticleTitle = FindByName(__.ArticleTitle);

            ///<summary>创建者名称</summary>
            public static readonly Field ArticleType = FindByName(__.ArticleType);

            ///<summary>创建者名称</summary>
            public static readonly Field ArticleImg = FindByName(__.ArticleImg);

            ///<summary>创建者名称</summary>
            public static readonly Field ArticleContent = FindByName(__.ArticleContent);

            ///<summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
            public static readonly Field IsRecommand = FindByName(__.IsRecommand);

            ///<summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
            public static readonly Field IsPublish = FindByName(__.IsPublish);

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

        /// <summary>取得文章管理字段名称的快捷方式</summary>
        partial class __
        {
            ///<summary>主键ID(自增列)</summary>
            public const String Id = "Id";

            ///<summary>创建者名称</summary>
            public const String ArticleTitle = "ArticleTitle";

            ///<summary>创建者名称</summary>
            public const String ArticleType = "ArticleType";

            ///<summary>创建者名称</summary>
            public const String ArticleImg = "ArticleImg";

            ///<summary>创建者名称</summary>
            public const String ArticleContent = "ArticleContent";

            ///<summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
            public const String IsRecommand = "IsRecommand";

            ///<summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
            public const String IsPublish = "IsPublish";

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

    /// <summary>文章管理接口</summary>
    public partial interface IArticle
    {
        #region 属性
        /// <summary>主键ID(自增列)</summary>
        Int64 Id { get; set; }

        /// <summary>创建者名称</summary>
        String ArticleTitle { get; set; }

        /// <summary>创建者名称</summary>
        Int32 ArticleType { get; set; }

        /// <summary>创建者名称</summary>
        String ArticleImg { get; set; }

        /// <summary>创建者名称</summary>
        String ArticleContent { get; set; }

        /// <summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
        Int32 IsRecommand { get; set; }

        /// <summary>状态(0：未激活  1：激活失败 2：已启用  3：已停用 4：已删除)</summary>
        Int32 IsPublish { get; set; }

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
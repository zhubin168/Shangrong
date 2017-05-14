﻿using System;
using System.Data;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;
using Dafy.OnlineTran.Common.Response;
using Dafy.OnlineTran.IService.Pc;
using Dafy.OnlineTran.Common.Request;

namespace Dafy.OnlineTran.Api.Controllers
{
    /// <summary>
    /// 理财师管理
    /// 创建人：朱斌
    /// 创建时间：2017-04-30
    /// </summary>
    [AllowAnonymous]
    public class FinancialController : AuthController
    {
        private readonly IUserService _service;
        /// <summary>
        /// 注入service
        /// </summary>
        public FinancialController(IUserService service)
        {
            _service = service;
        }

        /// <summary>
        /// 客户管理列表
        /// </summary>
        [HttpPost]
        public WeixinUserRS GetUsers(WeixinUserRQ rq)
        {
            if (rq == null || rq.pageIndex <= 0 || rq.pageSize <= 0)
                return new WeixinUserRS { total = 0, list = null };
            rq.roleId = 0;
            return _service.GetUsers(rq);
        }

        /// <summary>
        /// 设为理财师
        /// </summary>
        [HttpPost]
        public ResultModel<string> SetUsers(UpdateWeixinUserRQ rq)
        {
            return _service.SetUsers(rq);
        }

        /// <summary>
        /// 理财师管理列表
        /// </summary>
        [HttpPost]
        public WeixinUserRS GetManagers(WeixinUserRQ rq)
        {
            if (rq == null || rq.pageIndex <= 0 || rq.pageSize <= 0)
                return new WeixinUserRS { total = 0, list = null };
            rq.roleId = 1;
            return _service.GetManagers(rq);
        }

        /// <summary>
        /// 理财师详情
        /// </summary>
        [HttpPost]
        public WeixinUserItemRS DetailManager(DetailUserRQ rq)
        {
            rq.roleId = 1;
            return _service.DetailManager(rq);
        }

        /// <summary>
        /// 渠道管理列表
        /// </summary>
        [HttpPost]
        public WeixinUserRS GetChannels(WeixinUserRQ rq)
        {
            if (rq == null || rq.pageIndex <= 0 || rq.pageSize <= 0)
                return new WeixinUserRS { total = 0, list = null };
            rq.roleId = 2;
            return _service.GetChannels(rq);
        }

        /// <summary>
        /// 渠道详情
        /// </summary>
        [HttpPost]
        public WeixinUserItemRS DetailChannel(DetailUserRQ rq)
        {
            rq.roleId = 2;
            return _service.DetailChannel(rq);
        }

        /// <summary>
        /// 编辑任务津贴
        /// </summary>
        [HttpPost]
        public ResultModel<string> SetAllowance(DetailUserRQ rq)
        {
            return _service.SetAllowance(rq);
        }

        /// <summary>
        /// 编辑银行卡信息
        /// </summary>
        [HttpPost]
        public ResultModel<string> SetBank(DetailUserRQ rq)
        {
            return _service.SetBank(rq);
        }

        /// <summary>
        /// 更改上级
        /// </summary>
        [HttpPost]
        public ResultModel<string> SetRelation(DetailUserRQ rq)
        {
            return _service.SetRelation(rq);
        }

        /// <summary>
        /// 理财师机构修改
        /// </summary>
        [HttpPost]
        public ResultModel<string> SetCompany(DetailUserRQ rq)
        {
            return _service.SetCompany(rq);
        }

        /// <summary>
        /// 客户详情
        /// </summary>
        [HttpPost]
        public CustormerUserRS DetailCustomer(DetailUserRQ rq)
        {
            return _service.DetailCustomer(rq);
        }

        /// <summary>
        /// 团队详情
        /// </summary>
        [HttpPost]
        public DetailMemberRS DetailMember(DetailMemberRQ rq)
        {
            return _service.DetailMember(rq);
        }

        /// <summary>
        /// 公司详情
        /// </summary>
        [HttpPost]
        public CompanyRs DetailCompany(CompanyRQ rq)
        {
            return _service.DetailCompany(rq);
        }

        /// <summary>
        /// 理财师业绩
        /// </summary>
        [HttpPost]
        public AllowanceRs GetAllowances(AllowanceRQ rq)
        {
            return _service.GetAllowances(rq);
        }

        /// <summary>
        /// 业绩详情
        /// </summary>
        [HttpPost]
        public AllowanceDetailRs GetDetailAllowances(AllowanceDetailRQ rq)
        {
            return _service.GetDetailAllowances(rq);
        }

        /// <summary>
        /// 理财师收益
        /// </summary>
        [HttpPost]
        public AllowanceRs GetIncomes(AllowanceRQ rq)
        {
            return _service.GetIncomes(rq);
        }

        /// <summary>
        /// 收益详情
        /// </summary>
        [HttpPost]
        public AllowanceDetailRs GetDetailIncomes(AllowanceDetailRQ rq)
        {
            return _service.GetDetailIncomes(rq);
        }

        /// <summary>
        /// 认证审核
        /// </summary>
        [HttpPost]
        public CheckUsersRS GetCheckUsers(CheckUsersRQ rq)
        {
            return _service.GetCheckUsers(rq);
        }

        /// <summary>
        /// 审核理财师
        /// </summary>
        [HttpPost]
        public ResultModel<string> CheckUser(CheckUserRQ rq)
        {
            rq.auditUid = 100321;//Convert.ToInt32(this.User.Identity.Name);
            return _service.CheckUser(rq);
        }
    }
}

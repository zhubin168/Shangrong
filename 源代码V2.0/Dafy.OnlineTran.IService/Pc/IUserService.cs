using Dafy.OnlineTran.Common.Request;
using Dafy.OnlineTran.Common.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dafy.OnlineTran.IService.Pc
{
    /// <summary>
    /// 理财师管理接口定义
    /// 创建人：朱斌
    /// 创建时间：2017-04-30
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// 客户管理列表
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        WeixinUserRS GetUsers(WeixinUserRQ rq);

        /// <summary>
        /// 设为理财师
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        ResultModel<string> SetUsers(UpdateWeixinUserRQ rq);

        /// <summary>
        /// 理财师管理列表
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        WeixinUserRS GetManagers(WeixinUserRQ rq);

        /// <summary>
        /// 理财师详情
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        WeixinUserItemRS DetailManager(DetailUserRQ rq);

        /// <summary>
        /// 渠道管理列表
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        WeixinUserRS GetChannels(WeixinUserRQ rq);

        /// <summary>
        /// 渠道详情
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        WeixinUserItemRS DetailChannel(DetailUserRQ rq);

        /// <summary>
        /// 编辑任务津贴
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        ResultModel<string> SetAllowance(DetailUserRQ rq);

        /// <summary>
        /// 编辑银行卡信息
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        ResultModel<string> SetBank(DetailUserRQ rq);

        /// <summary>
        /// 更改上级
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        ResultModel<string> SetRelation(DetailUserRQ rq);

        /// <summary>
        /// 理财师机构修改
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        ResultModel<string> SetCompany(DetailUserRQ rq);

        /// <summary>
        /// 客户详情
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        CustormerUserRS DetailCustomer(DetailUserRQ rq);

        /// <summary>
        /// 团队详情
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
<<<<<<< HEAD
        DetailMemberRS DetailMember(DetailMemberRQ rq);
=======
        WeixinUserItemRS DetailMember(DetailUserRQ rq);
>>>>>>> f4e2de8cb81036ec7f44bd05fd698f70ccfb2b11

        /// <summary>
        /// 公司详情
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        CompanyRs DetailCompany(CompanyRQ rq);
<<<<<<< HEAD

        /// <summary>
        /// 理财师业绩
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        AllowanceRs GetAllowances(AllowanceRQ rq);

        /// <summary>
        /// 理财师业绩详情
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        AllowanceDetailRs GetDetailAllowances(AllowanceDetailRQ rq);

        /// <summary>
        /// 理财师收益
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        AllowanceRs GetIncomes(AllowanceRQ rq);

        /// <summary>
        /// 理财师收益详情
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        AllowanceDetailRs GetDetailIncomes(AllowanceDetailRQ rq);

        /// <summary>
        /// 认证审核
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        CheckUsersRS GetCheckUsers(CheckUsersRQ rq);

        /// <summary>
        /// 审核理财师
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        ResultModel<string> CheckUser(CheckUserRQ rq);
=======
>>>>>>> f4e2de8cb81036ec7f44bd05fd698f70ccfb2b11
    }
}

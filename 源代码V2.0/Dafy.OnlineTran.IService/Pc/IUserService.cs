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
        WeixinUserItemRS DetailMember(DetailUserRQ rq);

        /// <summary>
        /// 公司详情
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        CompanyRs DetailCompany(CompanyRQ rq);
    }
}

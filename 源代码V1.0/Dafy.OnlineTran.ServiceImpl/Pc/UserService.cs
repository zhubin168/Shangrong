using Dafy.OnlineTran.Common.Helpers;
using Dafy.OnlineTran.Common.Request;
using Dafy.OnlineTran.Common.Response;
using Dafy.OnlineTran.Entity.Models;
using Dafy.OnlineTran.IService.Pc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using XCode;

namespace Dafy.OnlineTran.ServiceImpl.Pc
{
    /// <summary>
    /// 理财师管理仓储实现
    /// 创建人：朱斌
    /// 创建时间：2017-04-30
    /// </summary>
    public class UserService : IUserService
    {
        /// <summary>
        /// 理财师管理列表
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>

        public WeixinUserRS GetUsers(WeixinUserRQ rq)
        {
            var result = new WeixinUserRS { total = 0, list = null };
            var sql = string.Empty;//"select * from Wexin_User where 1=1 ";
            if (!string.IsNullOrWhiteSpace(rq.paraName))
            {
                sql += string.Format(" (Username like '%{0}%' or TelePhone like '%{0}%') ", rq.paraName);
            }
            var user = Wexin_User.FindAll(sql, "Id desc", null, (rq.pageIndex - 1) * rq.pageSize, rq.pageSize);
            var query = (from a in user.ToList()
                             select new
                             {
                                 a.City,
                                 a.Country,
                                 a.Create_time,
                                 a.Headimgurl,
                                 a.Id,
                                 a.LoginTime,
                                 a.Nickname,
                                 a.Open_Id,
                                 a.Password,
                                 a.Province,
                                 a.Remark,
                                 a.RoleId,
                                 a.Sex,
                                 a.Subscribe_time,
                                 a.TelePhone,
                                 a.Unionid,
                                 a.Username,
                                 a.IsPrice,
                                 a.Ident,
                                 a.CardNo,
                                 a.BankName,
                                 a.Company,
                                 a.CompCity,
                                 a.Department,
                                 a.Position
                             }); 
                query = query.OrderByDescending(q => q.Id).ThenByDescending(q => q.LoginTime);
                result.total = Wexin_User.FindAll(sql, null, null, 0, 0).Count; //query.Count();
                if (result.total == 0) return result;
                result.list = query.Select(a => new WeixinUserItemRS
                {
                    //City = a.City,
                    //Country = a.Country,
                    //Create_time = a.Create_time,
                    Headimgurl = a.Headimgurl,
                    Id = a.Id,
                    //LoginTime = a.LoginTime,
                    Nickname = a.Nickname,
                    OpenId = a.Open_Id,
                    Password = a.Password,
                    //Province = a.Province,
                    Remark = a.Remark,
                    RoleId = a.RoleId,
                    Sex = a.Sex,
                    //Subscribe_time = a.Subscribe_time,
                    TelePhone = a.TelePhone,
                    //Unionid = a.Unionid,
                    Username = a.Username,
                    IsPrice=a.IsPrice,
                    Ident=a.Ident,
                    CardNo=a.CardNo,
                    BankName=a.BankName,
                    Company=a.Company,
                    CompCity=a.CompCity,
                    Department=a.Department,
                    Position=a.Position
                }).ToList();
                return result;
        }

        public ResultModel<string> DelUsers(UpdateWeixinUserRQ rq)
        {
            var user = Wexin_User.FindById(rq.Id);
            int nCount = user.Delete();
            return new ResultModel<string>
            {
                state = nCount,
                message = nCount > 0 ? "删除成功！" : "操作失败！",
                data = nCount.ToString()
            };
        }

        /// <summary>
        /// 保存理财师信息
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>

        public ResultModel<string> SaveUsers(UpdateWeixinUserRQ rq)
        {
            EntityList<Wexin_User> users = new EntityList<Wexin_User>();
            var user = Wexin_User.FindById(rq.Id);
            if (null == user)
            {
                user = new Wexin_User();
                user.City = rq.City;
                user.Country = rq.Country;
                user.Create_time = DateTime.Now;
                user.Headimgurl = rq.Headimgurl;
                user.LoginTime = DateTime.Now;
                user.Nickname = rq.Nickname;
                user.Open_Id = rq.Open_Id;
                user.Password = rq.Password;
                user.Province = rq.Province;
                user.Sex = rq.Sex;
                //user.TelePhone = rq.TelePhone;
                user.Unionid = rq.Unionid;
            }
            user.Username = rq.Username;
            user.Password=rq.Password;
            user.TelePhone = rq.TelePhone;
            user.Remark = rq.Remark;
            user.RoleId=rq.RoleId;
            user.IsPrice = rq.IsPrice;
            user.Ident = rq.Ident;
            user.CardNo = rq.CardNo;
            user.BankName = rq.BankName;
            user.Company = rq.Company;
            user.CompCity = rq.CompCity;
            user.Department = rq.Department;
            user.Position = rq.Position;
            users.Add(user);
            int nCount = users.Save();
            return new ResultModel<string>
            {
                state = nCount,
                message = nCount > 0 ? "保存成功！" : "操作失败！",
                data = nCount.ToString()
            };
        }
    }
}

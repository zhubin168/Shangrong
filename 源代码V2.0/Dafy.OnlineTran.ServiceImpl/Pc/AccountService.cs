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

namespace Dafy.OnlineTran.ServiceImpl.Pc
{
    public class AccountService : IAccountService
    {
        /// <summary>
        /// 登录认证
        /// </summary>
        /// <param name="loginRQ"></param>
        /// <returns></returns>
        public SysUserList Login(LoginRQ loginRQ)
        {
            var pwd = DesCryptoUtil.Encrypt(loginRQ.password);
            var data = Users.Find(string.Format(" uname='{0}' and Password='{1}' and loginPC=1 and status=1 and auditStatus=2 ", loginRQ.userId, pwd));
            if (data == null)
            {
                return null;
            }
            //记录登录日志
            var record = new LoginRecord()
            {
                loginTime=DateTime.Now,
                uid=data.uid,
                loginMode="P",
                weixinID=data.weixinId
            };
            record.Save();
            return new SysUserList()
            { 
                Id=data.uid,
                Headimgurl=data.headerUrl,
                Nickname=data.nickName,
                Open_Id=data.weixinId,
                Password=data.password,
                RoleId=data.roleId,
                TelePhone=data.phone,
                Username=data.uname
            };
        }

        /// <summary>
        /// 找回密码
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        public bool FindPassword(FindPasswordRQ rq)
        {
            var newEncryptedPassword = DesCryptoUtil.Encrypt(rq.newPassword);
            var user = Users.Find(new string[] { Users._.uname, Users._.phone }, new string[] { rq.saleId, rq.phone });
            if (user == null || user.uid <= 0)
            {
                return false;
            }
            user.password = newEncryptedPassword;
            int flag=user.Update();
            return flag > 0 ? true : false;
        }
    }
}

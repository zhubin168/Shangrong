using System;
using System.Data;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;
using GiveU.Authorization.OAuthApp;
using GiveU.Infrastructure.Logging;
using Dafy.OnlineTran.Common.Response;
using Dafy.OnlineTran.IService.Pc;
using Dafy.OnlineTran.Common.Request;
using System.Collections.Generic;
using System.Web;
using System.Collections;
using Swashbuckle.Swagger;
using System.Text.RegularExpressions;
using System.Configuration;
using System.Globalization;

namespace GiveU.CollectionVisit.Web.Controllers
{
    /// <summary>
    /// 公共接口管理
    /// 创建人：朱斌
    /// 创建时间：2017-05-05
    /// </summary>
    [AllowAnonymous]
    public class CommonController : ApiController
    {
        private static readonly string picsPath = "doc/pics";
        private static readonly string attachmentsPath = "doc/attachments";

        /// <summary>
        /// 上传图片
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public ResultModel<string> UploadImg()
        {
            #region 多个文件上传
            bool success = false;
            string msg = "";
            string filePath = "";
            HttpFileCollection files = HttpContext.Current.Request.Files;
            List<string> lstfilePath = new List<string>();
            foreach (string key in files.AllKeys)
            {
                HttpPostedFile file = files[key];
                string ext = System.IO.Path.GetExtension(file.FileName).ToLower();
                if (CheckUploadFileType(ext))
                {
                    if (file.ContentLength > 5 * 1024 * 1024)
                    {
                        msg = "上传的文件大小最大为5M！";
                    }
                    else
                    {
                        string fileName = Guid.NewGuid().ToString("N") + ext;
                        if (!Directory.Exists(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, picsPath)))
                        {
                            Directory.CreateDirectory(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, picsPath));
                        }
                        //物理路径
                        filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, picsPath, fileName);
                        file.SaveAs(filePath);
                        //虚拟路径
                        filePath = Path.Combine(HttpContext.Current.Request.Url.Authority, picsPath, fileName);
                        lstfilePath.Add(filePath);
                        success = true;
                    }
                }
                else
                {
                    msg = "请上传正确的文件类型(.jpg .jpeg .gif .png .bmp)";
                    break;
                }
            }
            return new ResultModel<string>
            {
                state =success?1:0,
                message = msg,
                data = string.Join(",", lstfilePath.ToArray())
            };
            #endregion
        }

        /// <summary>
        /// 上传附件
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public ResultModel<string> UploadDoc()
        {
            #region 多个文件上传
            bool success = false;
            string msg = "";
            string filePath = "";
            HttpFileCollection files = HttpContext.Current.Request.Files;
            List<string> lstfilePath = new List<string>();
            foreach (string key in files.AllKeys)
            {
                HttpPostedFile file = files[key];
                string ext = System.IO.Path.GetExtension(file.FileName).ToLower();
                if (file.ContentLength > 50 * 1024 * 1024)
                {
                    msg = "上传的文件大小最大为50M！";
                }
                else
                {
                    string fileName = Guid.NewGuid().ToString("N") + ext;
                    if (!Directory.Exists(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, attachmentsPath)))
                    {
                        Directory.CreateDirectory(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, attachmentsPath));
                    }
                    //物理路径
                    filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, attachmentsPath, fileName);
                    file.SaveAs(filePath);
                    //虚拟路径
                    filePath = Path.Combine(HttpContext.Current.Request.Url.Authority, attachmentsPath, fileName);
                    lstfilePath.Add(filePath);
                    success = true;
                }
            }
            return new ResultModel<string>
            {
                state = success?1:0,
                message = msg,
                data = string.Join(",", lstfilePath.ToArray())
            };
            #endregion
        }

        /// <summary>
        /// 检验文件类型
        /// </summary>
        /// <param name="fileName">文件名</param>
        /// <returns></returns>
        private bool CheckUploadFileType(string fileName)
        {
            List<string> fileTypeList = new List<string>() { ".jpg", ".jpeg", ".gif", ".png", ".bmp" };
            string extension = fileName.Substring(fileName.LastIndexOf('.')).ToLower();
            if (fileTypeList.Contains(extension))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        //#region "KE编辑器文件上传"

        ///// <summary>
        ///// 从配置文件中获取指定的数据
        ///// </summary>
        ///// <param Name="strKey"></param>
        ///// <returns></returns>
        //private static string GetConfigInfo(string strKey)
        //{
        //    var strValue = string.Empty;

        //    if (null != ConfigurationManager.AppSettings[strKey])
        //    {
        //        strValue = ConfigurationManager.AppSettings[strKey];
        //    }

        //    return strValue;
        //}

        //public string GetKeFilePath(string t)
        //{
        //    return GetConfigInfo(t == "n" ? "NoticePath" : "NewsPath");
        //}
        //[AllowAnonymous]
        //public string KeUpload(string t)
        //{
        //    //文件保存目录路径
        //    var savePath = GetKeFilePath(t);

        //    //文件保存目录URL
        //    var saveUrl = savePath;

        //    //定义允许上传的文件扩展名
        //    var extTable = new Hashtable
        //     {
        //         {"image", "gif,jpg,jpeg,png,bmp"},
        //         {"flash", "swf,flv"},
        //         {"media", "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb"},
        //         {"file", "doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2"}
        //     };

        //    //最大文件大小
        //    const int maxSize = 2 * 1024 * 1024;

        //    var imgFile = Request.Files["imgFile"];
        //    if (imgFile == null)
        //    {
        //        ShowError("请选择文件。");
        //    }

        //    var dirPath = Server.MapPath(savePath);
        //    if (!Directory.Exists(dirPath))
        //    {
        //        ShowError("上传目录不存在。");
        //    }

        //    var dirName = HttpContext.Current.Request.QueryString["dir"];
        //    if (string.IsNullOrEmpty(dirName))
        //    {
        //        dirName = "image";
        //    }
        //    if (!extTable.ContainsKey(dirName))
        //    {
        //        ShowError("目录名不正确。");
        //    }

        //    if (imgFile == null) return null;
        //    var fileName = imgFile.FileName;
        //    var extension = Path.GetExtension(fileName);
        //    if (extension == null) return null;
        //    var fileExt = extension.ToLower();

        //    if (imgFile.InputStream == null || imgFile.InputStream.Length > maxSize)
        //    {
        //        ShowError("上传文件大小超过限制。");
        //    }

        //    if (string.IsNullOrEmpty(fileExt) || Array.IndexOf(((string)extTable[dirName]).Split(','), fileExt.Substring(1).ToLower()) == -1)
        //    {
        //        ShowError("上传文件扩展名是不允许的扩展名。\n只允许" + ((string)extTable[dirName]) + "格式。");
        //    }

        //    //创建文件夹
        //    dirPath += dirName + "/";
        //    saveUrl += dirName + "/";
        //    if (!Directory.Exists(dirPath))
        //    {
        //        Directory.CreateDirectory(dirPath);
        //    }
        //    var ymd = DateTime.Now.ToString("yyyyMMdd", DateTimeFormatInfo.InvariantInfo);
        //    dirPath += ymd + "/";
        //    saveUrl += ymd + "/";
        //    if (!Directory.Exists(dirPath))
        //    {
        //        Directory.CreateDirectory(dirPath);
        //    }

        //    var newFileName = DateTime.Now.ToString("yyyyMMddHHmmss_ffff", DateTimeFormatInfo.InvariantInfo) + fileExt;
        //    var filePath = dirPath + newFileName;

        //    imgFile.SaveAs(filePath);

        //    var fileUrl = ConfigurationManager.AppSettings["KEFilesPreviewURL"] + saveUrl + newFileName;

        //    var hash = new Hashtable();
        //    hash["error"] = 0;
        //    hash["url"] = fileUrl;

        //    return hash.to;
        //}

        ////显示错误信息
        //private JsonResult ShowError(string msg)
        //{
        //    return Json(new { error = 1, message = msg });
        //}

        ///// <summary>
        ///// KE文件管理
        ///// </summary>
        ///// <returns></returns>
        //[AllowAnonymous]
        //public string FileManager(string t)
        //{

        //    //根目录路径，相对路径
        //    var rootPath = GetKeFilePath(t);
        //    //根目录URL，可以指定绝对路径
        //    var rootUrl = rootPath;
        //    //图片扩展名
        //    var fileTypes = "gif,jpg,jpeg,png,bmp";

        //    var currentPath = "";
        //    var currentUrl = "";
        //    var currentDirPath = "";
        //    var moveupDirPath = "";

        //    var dirPath = Server.MapPath(rootPath);
        //    var dirName = HttpContext.Current.Request.QueryString["dir"];
        //    if (!string.IsNullOrEmpty(dirName))
        //    {
        //        if (Array.IndexOf("image,flash,media,file".Split(','), dirName) == -1)
        //        {
        //            Response.Write("Invalid Directory Name.");
        //            Response.End();
        //        }
        //        dirPath += dirName + "/";
        //        rootUrl += dirName + "/";
        //        if (!Directory.Exists(dirPath))
        //        {
        //            Directory.CreateDirectory(dirPath);
        //        }
        //    }

        //    //根据path参数，设置各路径和URL
        //    var path = HttpContext.Current.Request.QueryString["path"];
        //    path = string.IsNullOrEmpty(path) ? "" : path;
        //    if (path == "")
        //    {
        //        currentPath = dirPath;
        //        currentUrl = rootUrl;
        //        currentDirPath = "";
        //        moveupDirPath = "";
        //    }
        //    else
        //    {
        //        currentPath = dirPath + path;
        //        currentUrl = rootUrl + path;
        //        currentDirPath = path;
        //        moveupDirPath = Regex.Replace(currentDirPath, @"(.*?)[^\/]+\/$", "$1");
        //    }

        //    //排序形式，Name or size or Type
        //    var order = HttpContext.Current.Request.QueryString["order"];
        //    order = String.IsNullOrEmpty(order) ? "" : order.ToLower();

        //    ////不允许使用..移动到上一级目录
        //    //if (Regex.IsMatch(path, @"\.\."))
        //    //{
        //    //    Response.Write("Access is not allowed.");
        //    //    Response.End();
        //    //}
        //    ////最后一个字符不是/
        //    //if (path != "" && !path.EndsWith("/"))
        //    //{
        //    //    Response.Write("Parameter is not valid.");
        //    //    Response.End();
        //    //}
        //    ////目录不存在或不是目录
        //    //if (!Directory.Exists(currentPath))
        //    //{
        //    //    Response.Write("Directory does not exist.");
        //    //    Response.End();
        //    //}

        //    //遍历目录取得文件信息
        //    var dirList = Directory.GetDirectories(currentPath);
        //    var fileList = Directory.GetFiles(currentPath);

        //    var result = new Hashtable();
        //    result["moveup_dir_path"] = moveupDirPath;
        //    result["current_dir_path"] = currentDirPath;
        //    result["current_url"] = ConfigurationManager.AppSettings["KEFilesPreviewURL"] + currentUrl;
        //    result["total_count"] = dirList.Length + fileList.Length;
        //    List<Hashtable> dirFileList = new List<Hashtable>();
        //    result["file_list"] = dirFileList;
        //    foreach (var t1 in dirList)
        //    {
        //        DirectoryInfo dir = new DirectoryInfo(t1);
        //        Hashtable hash = new Hashtable();
        //        hash["is_dir"] = true;
        //        hash["has_file"] = (dir.GetFileSystemInfos().Length > 0);
        //        hash["filesize"] = 0;
        //        hash["is_photo"] = false;
        //        hash["filetype"] = "";
        //        hash["filename"] = dir.Name;
        //        hash["datetime"] = dir.LastWriteTime.ToString("yyyy-MM-dd HH:mm:ss");
        //        dirFileList.Add(hash);
        //    }
        //    foreach (var t1 in fileList)
        //    {
        //        FileInfo file = new FileInfo(t1);
        //        Hashtable hash = new Hashtable();
        //        hash["is_dir"] = false;
        //        hash["has_file"] = false;
        //        hash["filesize"] = file.Length;
        //        hash["is_photo"] = (Array.IndexOf(fileTypes.Split(','), file.Extension.Substring(1).ToLower()) >= 0);
        //        hash["filetype"] = file.Extension.Substring(1);
        //        hash["filename"] = file.Name;
        //        hash["datetime"] = file.LastWriteTime.ToString("yyyy-MM-dd HH:mm:ss");
        //        dirFileList.Add(hash);
        //    }
        //    return JsonMapper.ToJson(result);
        //}
        //#endregion
    }
}

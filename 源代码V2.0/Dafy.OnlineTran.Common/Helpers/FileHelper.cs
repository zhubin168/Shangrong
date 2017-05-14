using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dafy.OnlineTran.Common.Helpers
{
    public static class FileHelper
    {
        /// <summary>
        /// 上传文件
        /// </summary>
        /// <param name="fileBytes"></param>
        /// <param name="destinationPath"></param>
        /// <param name="emsg"></param>
        /// <returns></returns>
        public static bool SaveFile(byte[] fileBytes, string destinationPath, out string emsg)
        {
            emsg = "";
            try
            {
                using (var fsWrite = new FileStream(destinationPath, FileMode.Append))
                {
                    fsWrite.Write(fileBytes, 0, fileBytes.Length);
                }
                ;
            }
            catch (Exception ex)
            {
                emsg = ex.Message;
                return false;
            }
            return true;
        }

        /// <summary>
        /// 文件文件路径，生成二进制文件流
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public static byte[] GetFileBytes(string filePath)
        {
            using (var fsRead = new FileStream(filePath, FileMode.Open))
            {
                var fsLen = (int)fsRead.Length;
                var fileByte = new byte[fsLen];
                fsRead.Read(fileByte, 0, fileByte.Length);
                return fileByte;
            }
        }

        public static string GetFileFolder(string fileType, string serverPath)
        {
            //根据文件类型获取文件夹
            var fileFolder = GetAppConfig(fileType.ToLower());
            fileFolder = @"/" + fileFolder + @"/" + DateTime.Now.Year.ToString() +
                         DateTime.Now.Month.ToString() + @"/" + DateTime.Now.Day.ToString();
            if (!Directory.Exists(serverPath + @"/" + fileFolder))
                Directory.CreateDirectory(serverPath + @"/" + fileFolder);
            return fileFolder;
        }

        private static string GetAppConfig(string key)
        {
            return ConfigurationManager.AppSettings[key] ?? ConfigurationManager.AppSettings[key];
        }
    }
}

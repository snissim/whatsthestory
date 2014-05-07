using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LBI.WhatsTheStory.Web.Controllers
{
    public class DataController : Controller
    {
        public ActionResult Tests()
        {
            return Json(new string[] { "test1", "test2", "test3", "test4" }, JsonRequestBehavior.AllowGet);
        }
    }
}
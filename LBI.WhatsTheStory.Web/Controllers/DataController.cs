using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CodeProse.Pogo;
using LBI.WhatsTheStory.Domain;

namespace LBI.WhatsTheStory.Web.Controllers
{
    public class DataController : Controller
    {
        IDictionary<string, string> _symbols;

        public DataController()
        {
            _symbols = new Dictionary<string, string>
            {
                { "mcdonalds", "MCD" },
                { "coca-cola", "KO" }
            };
        }

        public ActionResult Tests()
        {
            return Json(new string[] { "test1", "test2", "test3", "test4" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult StockPrices(string id)
        {
            var datastore = new GoogleCloudDatastore("Pogo");

            string symbol = _symbols[id];

            using (var session = datastore.OpenSession())
            {
                var prices = session.Query<DailyStockQuote>()
                    .Where(t => t.Symbol == symbol)
                    .ToList();

                return Json(prices, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult AddAwardAverage(GpcAwardAverage postModel)
        {
            var datastore = new GoogleCloudDatastore("Pogo");

            using (var session = datastore.OpenSession())
            {
                session.Store(postModel);
                session.SaveChanges();
            }

            return new EmptyResult();
        }
    }
}
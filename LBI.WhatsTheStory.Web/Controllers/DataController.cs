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

        public ActionResult StockPrices(string id)
        {
            var datastore = new GoogleCloudDatastore("Pogo");

            string symbol = _symbols[id];

            using (var session = datastore.OpenSession())
            {
                var prices = session.Query<DailyStockQuote>()
                    .Where(t => t.Symbol == symbol)
                    .ToList()
                    .OrderBy(t => t.Date); // GCD is throwing an error when trying to filter and order...

                return Json(prices, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult AwardAverages(string id)
        {
            var datastore = new GoogleCloudDatastore("Pogo");

            using (var session = datastore.OpenSession())
            {
                var awards = session.Query<GpcAwardAverage>()
                    .Where(t => t.Company == id)
                    .ToList();

                return Json(awards, JsonRequestBehavior.AllowGet);
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
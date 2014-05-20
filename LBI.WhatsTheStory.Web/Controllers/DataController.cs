using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CodeProse.Pogo;
using LBI.WhatsTheStory.Domain;
using LBI.WhatsTheStory.Domain.Connectors;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

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

        public ActionResult FinancialNews(string id)
        {
            var rss = new GoogleFinanceNews().GetRssFeed(_symbols[id]);

            return Json(rss, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ParseArticle(string url)
        {
            string parserUrl = "http://boilerpipe-web.appspot.com/extract?output=json&url=" + Url.Encode(url);

            var wr = (HttpWebRequest)HttpWebRequest.Create(parserUrl);
            var httpResponse = (HttpWebResponse)wr.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                JsonResult jr = new JsonResult();
                var json = streamReader.ReadToEnd();
                jr.Data = JsonConvert.DeserializeObject<BoilerPipeResponse>(json);
                jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                return jr;
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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using System.ServiceModel.Syndication;
using System.Net;
using System.Web;

namespace LBI.WhatsTheStory.Domain.Connectors
{
    public class GoogleFinanceNews
    {
        public IEnumerable<GoogleFinanceNewsRssRecord> GetRssFeed(string symbol)
        {
            XmlReaderSettings settings = new XmlReaderSettings();
            settings.XmlResolver = null;
            settings.DtdProcessing = DtdProcessing.Parse;

            var request = (HttpWebRequest)WebRequest.Create(string.Format("https://www.google.com/finance/company_news?q={0}&output=rss", symbol));
            var response = request.GetResponse();

            using (var feed = response.GetResponseStream())
            {
                using (var reader = XmlReader.Create(feed, settings))
                {
                    var rss = SyndicationFeed.Load(reader);

                    var items =
                        rss.Items.Select(t => new GoogleFinanceNewsRssRecord
                        {
                            Category = t.Categories.Count > 0 ? t.Categories[0].Name : null,
                            Link = t.Links[0].Uri.ToString(),
                            Title = HttpUtility.HtmlDecode(t.Title.Text),
                            PublishDate = t.PublishDate.LocalDateTime,
                            Symbol = symbol
                        }).ToList();

                    return items;
                }
            }
        }
    }
}
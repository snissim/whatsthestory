using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using LBI.WhatsTheStory.Domain.Connectors;
using CodeProse.Pogo;

namespace LBI.WhatsTheStory.Tests
{
    [TestClass]
    public class DatastoreTests
    {
        [TestMethod]
        public void WriteStockQuotes()
        {
            var target = new YahooFinance();
            string symbol = "KO";
            DateTime startDate = new DateTime(2014, 1, 1);
            DateTime endDate = new DateTime(2014, 3, 31);

            var results = target.GetHistoricalDailyStockQuotes(symbol, startDate, endDate);

            var datastore = new GoogleCloudDatastore("Pogo");

            using (var session = datastore.OpenSession())
            {
                foreach (var quote in results)
                {
                    session.Store(quote);
                }

                session.SaveChanges();
            }
        }
    }
}
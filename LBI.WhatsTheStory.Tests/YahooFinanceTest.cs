using LBI.WhatsTheStory.Domain.Connectors;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using LBI.WhatsTheStory.Domain;
using System.Collections.Generic;
using System.Linq;

namespace LBI.WhatsTheStory.Tests
{
    [TestClass]
    public class YahooFinanceTest
    {
        [TestMethod, Ignore]
        public void GetHistoricalDailyStockQuotesTest()
        {
            var target = new YahooFinance();
            string symbol = "MCD";
            DateTime startDate = new DateTime(2014, 1, 1);
            DateTime endDate = new DateTime(2014, 3, 31);

            var results = target.GetHistoricalDailyStockQuotes(symbol, startDate, endDate);
            var count = results.Count();

            Assert.AreEqual(61, count);
        }
    }
}
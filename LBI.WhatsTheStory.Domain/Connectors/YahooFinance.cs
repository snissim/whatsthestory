using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.IO;
using CsvHelper;

namespace LBI.WhatsTheStory.Domain.Connectors
{
    public class YahooFinance
    {
        public IEnumerable<DailyStockQuote> GetHistoricalDailyStockQuotes(string symbol, DateTime startDate, DateTime endDate)
        {
            var url = string.Format("http://ichart.finance.yahoo.com/table.csv?s={0}&g=d&a={1}&b={2}&c={3}&d={4}&e={5}&f={6}&ignore=.csv",
                                        symbol, startDate.Month - 1, startDate.Day, startDate.Year, endDate.Month - 1, endDate.Day, endDate.Year);
            var request = (HttpWebRequest)WebRequest.Create(url);
            var response = request.GetResponse();
            using (var reader = new StreamReader(response.GetResponseStream()))
            {
                var csv = new CsvReader(reader);
                var records = csv.GetRecords<YahooFinanceCsvRecord>().ToList();

                return records.Select(t => ConvertYahooRecordToDailyStockQuote(t, symbol));
            }
        }

        private DailyStockQuote ConvertYahooRecordToDailyStockQuote(YahooFinanceCsvRecord yahoo, string symbol)
        {
            var result = new DailyStockQuote
            {
                Id = Guid.NewGuid().ToString(),
                Symbol = symbol,
                Date = yahoo.Date,
                Open = yahoo.Open,
                High = yahoo.High,
                Low = yahoo.Low,
                Close = yahoo.Close,
                //AdjClose = yahoo.AdjClose,
                Volume = yahoo.Volume
            };

            return result;
        }
    }
}

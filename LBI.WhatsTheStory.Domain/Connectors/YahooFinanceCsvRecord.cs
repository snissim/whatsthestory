using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LBI.WhatsTheStory.Domain.Connectors
{
    public class YahooFinanceCsvRecord
    {
        public DateTime Date { get; set; }

        public double Open { get; set; }

        public double High { get; set; }

        public double Low { get; set; }

        public double Close { get; set; }

        //public double AdjClose { get; set; }

        public long Volume { get; set; }
    }
}

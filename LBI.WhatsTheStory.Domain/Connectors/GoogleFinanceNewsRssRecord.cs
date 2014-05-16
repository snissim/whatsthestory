using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LBI.WhatsTheStory.Domain.Connectors
{
    public class GoogleFinanceNewsRssRecord
    {
        public string Title { get; set; }

        public string Symbol { get; set; }

        public string Link { get; set; }

        public string Category { get; set; }

        public DateTime PublishDate { get; set; }
    }
}
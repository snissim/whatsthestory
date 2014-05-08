using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LBI.WhatsTheStory.Domain
{
    public class GpcAwardAverage
    {
        public string Company { get; set; }

        public int AdsScored { get; set; }

        public int SevenPlusAds { get; set; }

        public double GpcAverage { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LBI.WhatsTheStory.Domain.Connectors
{
    public class BoilerPipeResponse
    {
        public BoilerPipeArticle Response { get; set; }

        public string Status { get; set; }
    }

    public class BoilerPipeArticle
    {
        public string Content { get; set; }

        public string Title { get; set; }

        public string Source { get; set; }
    }
}

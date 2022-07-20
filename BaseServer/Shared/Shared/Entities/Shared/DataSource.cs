using System;
using System.Collections.Generic;
using System.Text;

namespace Shared.Entities.Shared
{
    public class DataSource
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = int.MaxValue;
        public List<Filter> Filter { get; set; }
    }
}

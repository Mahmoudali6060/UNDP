using System;
using System.Collections.Generic;
using System.Text;

namespace Shared.Enums
{
    public enum CarRequestStatusEnum :byte
    {
        UnderReview = 1,
        Assigned = 2,
        Closed=3,
        NotAvailable = 4, 
        Reserved = 5
    }
}

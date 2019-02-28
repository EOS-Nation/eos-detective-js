import * as path from "path";
import * as detective from "..";

// Configure Detective
detective.config(path.join(__dirname, "..", ".env"));

// Get Report
detective.reports.get("altcoinomysa")
    .then(data => console.log(data))

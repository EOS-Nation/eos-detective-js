import * as path from "path";
import * as detective from "../dist";

// Configure Detective
detective.config(path.join(__dirname, "..", ".env"));

// Remove Profile
detective.reports.remove("eosnationftw").then((trx_id) => {
    console.log("removed report", trx_id);
});
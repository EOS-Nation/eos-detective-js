import * as path from "path";
import * as detective from "../";

// Configure Detective
detective.config(path.join(__dirname, "..", ".env"));

// Get Profile
detective.profile("eosnationftw").then(response => {
    const profile = response.data;

    // Post report on chain
    if (profile) {
        detective.reports.post(profile).then((trx_id) => {
            console.log("posted report", trx_id);
        });
    }
})

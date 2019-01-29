import * as path from "path";
import * as detective from "../dist";

// Configure Detective
detective.config(path.join(__dirname, "..", ".env"));

// Get Profile
detective.profile("eosnationftw").then(response => {
    const profile = response.data;

    // Post report on chain with scores greater than 70
    if (profile && profile.score >= 70) {
        detective.reports.post(profile).then((trx_id) => {
            console.log("posted report", trx_id);
        });
    }
})

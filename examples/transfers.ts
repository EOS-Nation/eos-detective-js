import * as path from "path";
import * as detective from "..";

// Configure Detective
detective.config(path.join(__dirname, "..", ".env"));

// Get Tranfers
detective.transfers(["eosnationftw"], {accumulated: false, limit: 10, offset: 10})
    .then((response) => console.log(response.data))
    .catch((err) => console.error(err));

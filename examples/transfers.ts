import * as path from "path";
import * as detective from "..";

// Configure Detective
detective.config(path.join(__dirname, "..", ".env"));

// Get Tranfers
detective.transfers(["bosdiceadmin"], {accumulated: false, chain: "BOS"})
    .then((response) => console.log(response.data))
    .catch((err) => console.error(err));

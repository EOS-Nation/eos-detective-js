import * as path from "path";
import * as detective from "..";

// Configure Detective
detective.config(path.join(__dirname, "..", ".env"));

// Get Accounts
detective.accounts("system")
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

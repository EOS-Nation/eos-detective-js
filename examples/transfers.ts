import * as path from "path";
import * as detective from "../dist";

// Configure Detective
detective.config(path.join(__dirname, "..", ".env"));

// Get Tranfers
detective.transfers(["eosnationftw"]).then((response) => console.log(response.data));

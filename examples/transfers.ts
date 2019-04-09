import * as path from "path";
import * as detective from "..";

// Configure Detective
detective.config(path.join(__dirname, "..", ".env"));

// Get Tranfers
detective.transfers(["eosnationftw"], {direction: 'incoming', accumulated: true, quantity_min: 400})
    .then((response) => {
        //console.log(response)
        console.log(response.data!.transfers);
    })
    .catch((err) => console.error(err));

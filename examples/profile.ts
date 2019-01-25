import * as path from "path";
import * as detective from "../";

// Private Settings;
require('dotenv').config(path.join(__dirname, "..", ".env"));
const token = process.env.DETECTIVE_TOKEN;
const endpoint = process.env.DETECTIVE_ENDPOINT;

// Configure Detective
detective.config(token, {endpoint});

// Get Profile
detective.profile("eosnationftw").then((response) => console.log(response.data));

import * as path from "path";
import * as detective from "../";

// Configure Detective
detective.config(path.join(__dirname, "..", ".env"));

test("detective.reports.get", async () => {
    const report = await detective.reports.get("altcoinomysa")
    expect(report.score).toBe(100);
});

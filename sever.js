const express = require("express");
const runScraper = require("./scraper");
const sendMail = require("./mailer");

const app = express();
app.use(express.static("public"));

app.get("/run", async (req, res) => {
  const emails = await runScraper();
  await sendMail(emails);

  res.send("Process completed ✅");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
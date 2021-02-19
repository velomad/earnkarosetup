const express = require("express");
const app = express();
const PORT = process.env.port || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/scrape", require("./routes/routes.scraper"));
app.use("/api/v1/offerzone", require("./routes/routes.offers"));

app.listen(PORT, () => {
  console.log(`connected at PORT : ${PORT}`);
});

const express = require("express");
const app = express();
const PORT = process.env.port || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", require("./routes/routes.scraper"));

app.listen(PORT, () => {
  console.log(`connected at PORT : ${PORT}`);
});

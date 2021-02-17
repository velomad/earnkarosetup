const router = require("express").Router();
const scraper = require("../controller/controller.scraper");

router.get("/topselling", scraper.topSelling);

module.exports = router;

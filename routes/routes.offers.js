const router = require("express").Router();
const offers = require("../controller/controller.offers");

router.get("/", offers.offerProducts);
router.get("/product", offers.singleProduct);

module.exports = router;

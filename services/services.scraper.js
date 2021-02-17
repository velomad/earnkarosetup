const pool = require("../db");

module.exports = {
  topSellingService: (data, offerZone) => {
    console.log(data);

    let arry = [];

    data.map((el) => {
      arry.push([
        el.website,
        el.category,
        el.displayCategory,
        el.gender,
        el.productName,
        el.brandName,
        el.imageUrl,
        el.discountPercent,
        el.productPrice,
        el.productPriceStrike,
        el.productLink,
        el.size,
        el.productRating,
      ]);
    });

    console.log(offerZone, "was extracted");
  },
};

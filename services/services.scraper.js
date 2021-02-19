const pool = require("../db");

module.exports = {
  topSellingService: (data, offerZone) => {
    let arry = [];

    data.map((el) => {
      arry.push([
        el.productPrice,
        el.priceStrike,
        el.brandName,
        el.productName,
        el.productImage,
        el.discountPercent,
        el.productLink,
        JSON.stringify(el.thumbnailImages),
        offerZone,
      ]);
    });

    console.log(arry);

    const sql =
      "INSERT INTO earnkaro (productPrice, priceStrike, brandName, productName, productImage, discountPercent, productLink, thumbnailImages, offerZone) VALUES ?";
    const values = [arry];
    pool.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
      }
    });
  },
};

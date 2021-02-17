const puppeteer = require("puppeteer");
const { topSellingService } = require("../services/services.scraper");

module.exports = {
  topSelling: async (req, res) => {
    const url = "";

    function wait(ms) {
      return new Promise((resolve) => setTimeout(() => resolve(), ms));
    }
    const config = {
      username: "sagarc111@gmail.com",
      password: "xtrainn213",
    };
    async function autoScroll(page) {
      await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
          // let totalHeight = 0;
          let distance = 100;
          let timer = setInterval(() => {
            // let scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            let getText = document.querySelector(
              "#Title_Get_Extra_From_Earnkaro"
            ).innerText;
            if (
              document.querySelectorAll(".fl.fw.product_c").length ===
              Number(((getText.match(/(\d+)/)[0] / 100) * 100).toFixed(0))
            ) {
              console.log("in if block");
              getText = "";
              window.scrollTo(0, 0);
              clearInterval(timer);
              resolve();
            }
          }, 70);
        });
      });
    }
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    await page.setViewport({ width: 1200, height: 768 });

    await page.goto(`https://earnkaro.com/`, {
      waitUntil: "networkidle0",
    });

    const signIn = await page.$("#link_signin");
    await signIn.click({ clickCount: 1 });
    await wait(3000);
    const signInWithFb = await page.$("div>a#close_and_go_fb_signin_pp");
    await signInWithFb.click({ clickCount: 1 });
    await wait(3000);
    const pages = await browser.pages();
    const popup = pages[pages.length - 1];
    await popup.type("#email", config.username, { delay: 30 });
    await popup.type("#pass", config.password, { delay: 30 });
    const loginbutton = await popup.$("#loginbutton");
    await loginbutton.click({ clickCount: 1 });
    await wait(5000);
    const links = [
      "best-of-myntra",
      "beauty-and-personal-care",
      "best-of-mamaearth",
      "best-of-ajio",
    ];
    for (var i in links) {
      await page.goto(`https://earnkaro.com/top-selling-products/${links[i]}`, {
        waitUntil: "load",
        timeout: 0,
      });
      // await autoScroll(page);

      // // Get the height of the rendered page
      // const bodyHandle = await page.$("body");
      // const { height } = await bodyHandle.boundingBox();
      // await bodyHandle.dispose();

      // // Scroll one viewport at a time, pausing to let content load
      // const viewportHeight = page.viewport().height;
      // let viewportIncr = 0;
      // while (viewportIncr + viewportHeight < height) {
      //   await page.evaluate((_viewportHeight) => {
      //     window.scrollBy(0, _viewportHeight);
      //   }, viewportHeight);
      //   await wait(100);
      //   viewportIncr = viewportIncr + viewportHeight;
      // }

      let data = await page.evaluate(() => {
        let products = [];
        let productElements = document.querySelectorAll(".fl.fw.product_c");

        productElements.forEach((productElement, index) => {
          let productJson = {};

          let imgArry = [];

          var liLength = document.querySelectorAll(".product_img_thumb")[index]
            .childNodes[1].children.length;
          for (var j = 0; j < liLength; j++) {
            imgArry.push(
              document.querySelectorAll(".product_img_thumb")[index]
                .childNodes[1].children[j].children[0].src
            );
          }

          try {
            // product Price
            productJson.productPrice = productElement.querySelector(
              ".p_totalprice"
            )
              ? productElement.querySelector(".p_totalprice").innerText
              : null;

            // Price Strike
            productJson.priceStrike = productElement.querySelector(
              ".price_strike>del"
            )
              ? productElement.querySelector(".price_strike>del").innerText
              : null;

            // Brand
            productJson.brandName = productElement.querySelector(".brand")
              ? productElement.querySelector(".brand").innerText.split(":")[1]
              : null;

            // Product Name
            productJson.productName = productElement.querySelector(
              ".product_name"
            )
              ? productElement.querySelector(".product_name").title
              : null;

            // Product Image
            productJson.productImage = productElement.querySelector(
              ".product_img_mn>a>img"
            )
              ? productElement.querySelector(".product_img_mn>a>img").src
              : null;

            // Discount Percent
            productJson.discountPercent = productElement.querySelector(
              ".price_percentage"
            )
              ? productElement.querySelector(".price_percentage").innerText
              : null;

            // Product Link
            productJson.productLink = productElement.querySelector(
              ".fl.share_addbtn.add_to_wishlilst"
            )
              ? productElement.querySelector(
                  ".fl.share_addbtn.add_to_wishlilst"
                ).dataset.cashback_url + "1364982"
              : null;

            productJson.thumbnailImages = imgArry;
          } catch (e) {
            console.log(e);
          }
          products.push(productJson);
        });
        return products;
      });

      topSellingService(data, links[i]);
    }

    res.send("Finish");

    await browser.close();
  },
};

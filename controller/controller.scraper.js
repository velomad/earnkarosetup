const puppeteer = require("puppeteer");
const { topSellingService } = require("../services/services.scraper");

module.exports = {
  topSelling: async (req, res) => {
    const url =
      "https://earnkaro.com/top-selling-products/beauty-and-personal-care";

    function wait(ms) {
      return new Promise((resolve) => setTimeout(() => resolve(), ms));
    }
    const config = {
      username: "sagarc111@gmail.com",
      password: "xtrainn213",
    };

    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    await page.setViewport({ width: 1200, height: 768 });

    await page.goto(`${url}`, {
      waitUntil: "networkidle0",
    });

    const signIn = await page.$("#link_signin");
    await signIn.click({ clickCount: 1 });
    await wait(2000);
    const signInWithFb = await page.$("div>a#close_and_go_fb_signin_pp");
    await signInWithFb.click({ clickCount: 1 });
    await wait(2000);
    const pages = await browser.pages();
    const popup = pages[pages.length - 1];
    console.log(popup);
    await fbPage.type("#email", config.username, { delay: 30 });
    await fbPage.type("#pass", config.password, { delay: 30 });
    // await popup.close()
    // const fbPage = await browser.newPage();
    // await fbPage.goto(
    //   "https://www.facebook.com/login.php?skip_api_login=1&api_key=442881609842304&kid_directed_site=0&app_id=442881609842304&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv3.2%2Fdialog%2Foauth%3Fapp_id%3D442881609842304%26cbt%3D1613564213811%26channel_url%3Dhttps%253A%252F%252Fstaticxx.facebook.com%252Fx%252Fconnect%252Fxd_arbiter%252F%253Fversion%253D46%2523cb%253Df1df04ac582bb5c%2526domain%253Dearnkaro.com%2526origin%253Dhttps%25253A%25252F%25252Fearnkaro.com%25252Ff2478038a5bb0ac%2526relation%253Dopener%26client_id%3D442881609842304%26display%3Dpopup%26domain%3Dearnkaro.com%26e2e%3D%257B%257D%26fallback_redirect_uri%3Dhttps%253A%252F%252Fearnkaro.com%252F%26locale%3Den_US%26logger_id%3Df6c02b1e8d5554%26origin%3D1%26redirect_uri%3Dhttps%253A%252F%252Fstaticxx.facebook.com%252Fx%252Fconnect%252Fxd_arbiter%252F%253Fversion%253D46%2523cb%253Df2104ba865f029c%2526domain%253Dearnkaro.com%2526origin%253Dhttps%25253A%25252F%25252Fearnkaro.com%25252Ff2478038a5bb0ac%2526relation%253Dopener%2526frame%253Df2d6d84bd6336f4%26response_type%3Dtoken%252Csigned_request%252Cgraph_domain%26scope%3Demail%252Cpublic_profile%26sdk%3Djoey%26version%3Dv3.2%26ret%3Dlogin%26fbapp_pres%3D0%26tp%3Dunspecified&cancel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df2104ba865f029c%26domain%3Dearnkaro.com%26origin%3Dhttps%253A%252F%252Fearnkaro.com%252Ff2478038a5bb0ac%26relation%3Dopener%26frame%3Df2d6d84bd6336f4%26error%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied&display=popup&locale=en_GB&pl_dbl=0",
    //   {
    //     waitUntil: "networkidle0",
    //   }
    // );
    // await fbPage.type("#email", config.username, { delay: 30 });
    // await fbPage.type("#pass", config.password, { delay: 30 });
    // const loginbutton = await fbPage.$("#loginbutton");
    // await loginbutton.click({ clickCount: 1 });
    // topSellingService("data");
    // res.send("test");
  },
};

const puppeteer = require("puppeteer");

const url = "https://www.amazon.com/s?k=graphics+card";

const webScrappingScript = async (url) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2" });

    const products = await page.evaluate(() => {
      const items = [];
      document
        .querySelectorAll(".s-main-slot .s-result-item")
        .forEach((element) => {
          const productName = element
            .querySelector("h2 .a-link-normal")
            ?.innerText.trim();
          const price = element
            .querySelector(".a-price .a-offscreen")
            ?.innerText.trim();

          if (productName && price) {
            items.push({ product_name: productName, price: price });
          }
        });
      return items;
    });

    console.log(JSON.stringify(products, null, 2));

    await browser.close();
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

webScrappingScript(url);

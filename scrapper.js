const axios = require("axios");
const cheerio = require("cheerio");

const url =
  "https://www.amazon.ae/s?k=watches&crid=LVI9OS3E58EL&sprefix=watche%2Caps%2C207&ref=nb_sb_noss_2";

const webScrappingScript = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    const $ = cheerio.load(response.data);
    const products = [];
    $(".s-main-slot .s-result-item").each((index, element) => {
      const productName = $(element).find("h2 .a-link-normal").text().trim();
      const price = $(element).find(".a-price .a-offscreen").text().trim();

      if (productName && price) {
        products.push({
          product_name: productName,
          price: price,
        });
      }
    });
    console.log(JSON.stringify(products, null, 2));
  } catch (error) {
    console.error(`Error fetching the Amazon page: ${error.message}`);
  }
};

webScrappingScript(url);

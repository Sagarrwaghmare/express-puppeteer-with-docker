const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto("https://mangakakalot.com/");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });


    // Mangas Fetch
    let popMangas = await page.$$(".xem-nhieu-item")

    let arr = []
    for (const m of popMangas) {
        let title = await page.evaluate((e)=>{
            return e.textContent
        },m)
        arr.push(title)
    }
    
    await page.screenshot({path:"testingScreenShot.png"})

    console.log(arr);
    res.send(arr);
    

  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };




// const browser = await puppeteer.launch({headless:true})

// const page = await browser.newPage()

    
// let url = 'https://mangakakalot.com/' 
// await page.goto(url)

// let popMangas = await page.$$(".xem-nhieu-item")

// let arr = []
// for (const m of popMangas) {
//     let title = await page.evaluate((e)=>{
//         return e.textContent
//     },m)
//     arr.push(title)
// }

// await browser.close()

// console.log(arr)
// return arr;
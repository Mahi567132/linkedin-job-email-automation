const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const scrapeEmails = require('./scraper');
const sendMail = require('./mailer');

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    userDataDir: "./user_data",
    defaultViewport: null,
    slowMo: 50
  });

  const page = await browser.newPage();

  await page.goto('https://www.linkedin.com/feed/', { waitUntil: 'networkidle2' });

  console.log("LinkedIn opened");

  // 🔥 Scroll to load posts
  await autoScroll(page);

  // 🔥 Scrape emails
  const emails = await scrapeEmails(page);

  console.log("Emails found:", emails);

  // 🔥 Send emails
  if (emails.length > 0) {
    await sendMail(emails);
  } else {
    console.log("No emails found");
  }

})();

// 🔥 Auto scroll function
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      let distance = 500;

      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 1000);
    });
  });
}
async function scrapeEmails(page) {
  const emails = await page.evaluate(() => {
    const bodyText = document.body.innerText;

    const foundEmails = bodyText.match(
      /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/g
    );

    return foundEmails || [];
  });

  return [...new Set(emails)]; // remove duplicates
}

module.exports = scrapeEmails;
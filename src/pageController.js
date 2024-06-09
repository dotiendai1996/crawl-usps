const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance, tracking_no){
	// console.log('tracking_no controller', tracking_no, browserInstance);
	let browser;
	try{
		browser = await browserInstance;
		let status = await pageScraper.scraper(browser, tracking_no);
		await browser.close();
		// console.log('status pageController', status);
		return status;
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance, tracking_no) => scrapeAll(browserInstance, tracking_no)
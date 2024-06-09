const express = require("express");
const path = require("path");
const morgan = require('morgan');
// const handlebars = require('express-handlebars');
const http = require('http');


const browserObject = require("./browser");
const scraperController = require("./pageController");

const app = express();
const port = 3001;

//HTTP logger
app.use(morgan('combined'));

//Template engine
// app.engine('hbs', handlebars.engine({extname: '.hbs'}));
// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'resources\\views'));

app.get("/tracking", (req, res) => {
  // console.log('PATH:', path.join(__dirname, 'resources\\views'));
  //Start the browser and create a browser instance
  async function getStatus() {
    let tracking_no = await req.query.id;
    // console.log(JSON.stringify(req.query.id));
    let browserInstance = browserObject.startBrowser();
  
    // Pass the browser instance to the scraper controller
    let status = await scraperController(browserInstance, tracking_no);
    // console.log('important ', status);
  
    await res.setHeader('Content-Type', 'application/json');
    await res.end(JSON.stringify({ tracking_no, status: status || null }));
  }

  getStatus();

  // res.render('home');
  
});

// app.get("/news", (req, res) => {
//   res.render('news');
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

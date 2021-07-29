// NOTE: install dependencies using `npm install` or view readme.md before beginning
// (`nodemon` refreshes your express server every time you make changes)

// express is a server-side web framework that runs on a server (essentially another computer)
// to give you (your computer) a website or data through the internet (HTTP)
// *** you can use express to make your own API ***

// import express using `require`
// (you import files/libraries using `require` on Node.js)
const express = require("express");
// make an instance of the library
const app = express();

// we tell the app to listen to port 6060 on our computer (locally) => http://localhost:6060
const port = 6060;
app.listen(port, () => {
    console.log(`Example app listening @ http://localhost:${port}`);
});

// when a browser accesses the root (/) of the server, it issues a GET request.
// `app.get('/')` listens when this happens, and runs a callback function
app.get("/", (req, res) => {
    // when the homepage is requested, the server sends "Hello World" w/ `res.send()`
    return res.send("Hello World!");
});

// The callback can utilize information from the browser's request `req` and
// interact with the object of the server's oncoming response `res`
app.get("/client", (req, res) => {
    // the request object provides a lot of information
    // we can get the url entry that the browser accessed
    const { url } = req;
    // and even the browser type itself if we dig into the request headers
    const browserInfo = req.headers["user-agent"];
    // return info on page
    return res.send(`
    Client entry url: ${url}
    <br>
    Client browser: ${browserInfo}
    `);
});
// try going onto http://localhost:6060/client

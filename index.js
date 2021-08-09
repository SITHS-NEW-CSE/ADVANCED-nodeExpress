// Express is a server-side web framework that runs on a server (essentially another computer)
// to "serve" you (your computer) data over the internet (HTTP) e.g. dynamic websites

// import files/libraries using `require` on Node.js
const express = require("express");
// make an instance of express
const app = express();

// we tell the app to listen to port 3000 on our computer (locally) => http://localhost:3000
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening @ http://localhost:${port}`);
});

// === INTRO ===

// when you access the root (/) of the server, you issue a GET request.
// Below is a "handler" of GET requests from `http://localhost:3000`
app.get("/", (req, res) => {
    // use `res.send()` to send typical sorts of data, such as strings
    return res.send("Hello World!");
});

// The callback can utilize information from the browser's request `req` and
// interact with the object of the server's oncoming response `res`
app.get("/client", (req, res) => {
    // the request object provides a lot of information
    // we can get the url the browser accessed, and its IP address
    // NOTE: ip is `::1`, which represents localhost!
    const { url, ip } = req;
    // even the browser type itself if we dig into the request headers
    const browserInfo = req.headers["user-agent"];
    // return info on page
    return res.send(`
    Client entry url: ${url}
    <br>
    Client IP address: ${ip}
    <br>
    Client browser: ${browserInfo}
    `);
});
// try going onto http://localhost:3000/client

// === PARAMETERS & QUERIES ===

// test data
const people = [
    { name: "Barack", data: 42 },
    { name: "Obama", data: 25 },
    { name: "Donald", data: -10 },
    { name: "Trump", data: 1000001010 },
];

app.get('/people', (req, res) => {
    return res.json(people)
})

// The client can provide data on the route via parameters (`:id`)
app.get("/parameter/:id", (req, res) => {
    // access parameters in `req.params`
    const { id } = req.params;
    // NOTE: all parameters will be strings at first, convert type when necessary
    const index = parseInt(id) - 1;
    // send appropriate data, checking if the index exists
    const result = people[index];
    if (!result) return res.status(404).send("Person not found");
    return res.json(result);
});

// parameters can be part of the structure of the route
app.get("/parameter/:id/data", (req, res) => {
    const { id } = req.params;
    const index = parseInt(id) - 1;
    // access the data property of the indexed object
    const result = people[index];
    if (!result) return res.status(404).send("Person not found");
    return res.json(result.data);
});

// The client can also provide queries, inserted after the route
app.get("/query", (req, res) => {
    // client queries stored in `req.query`
    const query = req.query;
    const limit = query.limit;
    let filteredPeople = people;
    if (limit) {
        filteredPeople = filteredPeople.filter((person) => {
            return person.data > limit;
        });
    }
    if (filteredPeople.length <= 0)
        return res.status(404).send("Query returns no people");

    return res.json(filteredPeople);
    // NOTE: it will return all people if no queries are passed
});
// Try accessing http://localhost:3000/query?limit=40 (it'll return people with `data` > 40)

// === POST ===
// when the client issues a post request, it basically means that the client wants to
// add new data to the server.
app.post("/addPerson/:name/:data", (req, res) => {
    const newPerson = req.params;
    people.push(newPerson);
    return res.redirect('/people')
})
// you can issue a post request with a html form (covered later) or by using postman.


// P.S. when making new express projects, use the `nodemon` package which will 
// automatically refresh your server when making changes! Make appropriate changes on package.json
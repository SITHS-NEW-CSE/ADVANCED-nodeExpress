const path = require("path");
const express = require("express");
const app = express();
const { products, people } = require("./data");

const port = 6060;
app.listen(port, () => {
    console.log(`Example app running @ http://localhost:${port}`);
});

app.get("/product", (req, res) => {
    // Use `res.json` to specifically send json data (products: array of objects)
    return res.json(products);
});

// === Parameters ===

// `:productId` is a parameter for anything the user puts. Accessible
// in `req.params`, and is very useful for accessing specific entries/points of data
app.get("/product/:productId", (req, res) => {
    const id = req.params.productId;
    // find product with appropriate id in `products` array
    // NOTE: parameter will be strings if unformatted
    const product = products.find((product) => product.id === parseInt(id));
    // if there's no product, return 404 error
    if (!product) return res.status(404).send("Product Not Found");
    return res.json(product);
});

// you are able to use multiple parameters in your route like this:
app.get("/product/:productId/:prop", (req, res) => {
    const { productId, prop } = req.params;
    const product = products.find(
        (product) => product.id === parseInt(productId)
    );
    const productProp = product[prop];
    if (!productProp) return res.status(404).send("Product property not found");
    return res.json(productProp);
});

// === Queries ===

// Queries are a more flexible way to input variable data, usually used to search/filter data
// The user provides query data by appending a `?`, followed by `key=value&key=value&...` format
// e.g. http://localhost:6060/queryDemo?name=John&vibing=true
app.get("/queryDemo", (req, res) => {
    const query = req.query;
    return res.json(query);
    // this returns the query you provide
});

app.get("/people/search", (req, res) => {
    // multiple queries work too
    const { name, limit } = req.query;
    let filteredPeople = people;
    if (name) {
        filteredPeople = filteredPeople.filter((person) => {
            return person.name.startsWith(name);
        });
    }
    if (limit) {
        filteredPeople = filteredPeople.slice(0, parseInt(limit));
    }
    if (filteredPeople.length <= 0)
        return res.status(404).send("Person not found");
    return res.json(filteredPeople);
});
// NOTE: this handler will return all the people if you don't provide
// any queries. You can implement logic to stop this from happening.

// === MIDDLEWARE & POST ===

// "Middleware" in express is a term for a function that handles the flow of
// server logic, which in part means handling `req` and `res` objects. You can write
// your own middleware or use existing ones (e.g. what we're doing below)

// You can set specific middleware to run for all routes/handlers using `app.use`

// `express.static()` is a built-in middleware to expose static (non-changing) files to 
// the root of the server so served resources (like html files) can access it
app.use(express.static("./public"));

app.get("/input", (req, res) => {
    // we tell the server to "serve" an html file in our project directory (__dirname is root)
    res.sendFile(path.resolve(__dirname, "./input.html"));
});


// A POST request is issued when the client wants to SEND data to the server (GET: receive)
// We can define a handler when a client issues a POST request on /input
app.post("/input", (req, res) => {
    const input = req.body.name;
    console.log(input);
    res.send(`Added ${input} to 'people' array!`);
});

// the `express.urlencoded()` middleware lets the server properly "read" 
// post responses from the client HTML
app.use(express.urlencoded({extended: true}))

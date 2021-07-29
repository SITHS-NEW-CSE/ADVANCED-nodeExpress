const express = require("express");
const app = express();
const { products, people } = require("./data");

const port = 6060;
app.listen(port, () => {
    console.log(`Example app running @ http://localhost:${port}`);
});

app.get("/", (req, res) => {
    // you can use `res.json` to specifically send json data
    // here, we send an array of objects from data.js
    return res.json(products);
});

// === Parameters ===

// the specified route "/product/:productId" indicates that `:productId` is
// a parameter ("placeholder") for anything that the user puts. This parameter is accessible
// in `req.params`, and is very useful for accessing specific entries/points of data
app.get("/product/:productId", (req, res) => {
    const id = req.params.productId;
    // find product with appropriate id in `products` array
    const product = products.find((product) => product.id === parseInt(id));
    // if product is undefined, return 404 error
    if (!product) return res.status(404).send("Product Not Found");
    return res.json(product);
});

// you are able to use multiple parameters in your route like this:
app.get("/product/:productId/:prop", (req, res) => {
    const { productId, prop } = req.params;
    // find product with appropriate id in `products` array, and get requested prop
    const product = products.find(
        (product) => product.id === parseInt(productId)
    );
    const productProp = product[prop]
    if (!productProp) return res.status(404).send("Product property not found");
    return res.json(productProp);
});

// === Queries ===

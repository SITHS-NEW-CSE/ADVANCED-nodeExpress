const express = require("express");
const router = express.Router();

const products = [
    {
        name: "iPhone",
        price: 1000,
    },
    {
        name: "MacBook",
        price: 1500,
    },
    {
        name: "Elon Musk",
        price: 0,
    },
    {
        name: "toilet paper 😳",
        price: 99999999,
    },
];

router.get("/", (req, res) => {
    res.render("product", { products });
});

router.get("/:priceLimit", (req, res) => {
    const limit = parseInt(req.params.priceLimit);
    // we can use the same template, but pass different context data
    res.render("product", {
        products: products.filter((product) => product.price >= limit),
        limit
    });
});

module.exports = router;

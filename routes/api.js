const express = require("express");
const axios = require("axios").default;
const router = express.Router();

// getting environment variable
const API_KEY = process.env["API_KEY"];
const apiEntry = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

router.get("/", (req, res) => {
    if (!API_KEY)
        return res.send("There's no API_KEY environment variable defined!");
    return res.render("api");
});

router.get("/answer", (req, res) => {
    const query = req.query["search-box"];
    // make fetch call to New York Times *on the server*
    axios
        .get(`${apiEntry}?q=${query}&api-key=${API_KEY}`)
        .then((apiRes) => {
            // render the api response in the client html
            return res.render('answer', {data: apiRes.data.response.docs})
        })
        .catch((error) => {
            return res.render('error', {error});
        });
});

module.exports = router;

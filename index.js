import express from 'express';
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send("Bruh moment")
})

app.listen(port, () => {
    console.log(`Example app listening @ http://localhost:${port}`);
})
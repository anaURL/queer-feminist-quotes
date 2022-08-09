const express = require("express"),
const app = express(),
const mongoose = require("mongoose"),
const FeministQuote = require("./models/quotes"),
require('dotenv').config()

app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

//Connect to Mongoose
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true }, 
    () => {console.log("Connected to the database!");}
)

// GET METHOD
app.get("/", async (req, res) => {
    try {
        FeministQuote.find({}, (err, quotes) => {
            res.render("index.ejs", { feministQuotes: quotes });
        });
    } catch (err) {
        if (err) return res.status(500).send(err);
    }
});

//POST METHOD
app.post('/', async (req, res) => {
    const feministQuote = new FeministQuote(
        {
            author: req.body.author,
            content: req.body.content
        });
    try {
        await feministQuote.save();
        console.log(feministQuote)
        res.redirect("/");
    } catch (err) {
        if (err) return res.status(500).send(err);
        res.redirect("/");
    }
});

//DELETE METHOD
app
    .route("/remove/:id")
    .get((req, res) => {
        const id = req.params.id;
        FeministQuote.findByIdAndRemove(id, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

//Start Server
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port`)
})


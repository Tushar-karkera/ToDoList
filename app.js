const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js")

const app = express();

const items = [];
const workItems = [];

app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    
    const day = date.getDate();
    res.render("list", { listTitle: day, newListItems: items });

});

app.post("/", function (req, res) {
    console.log(req.body);
    if (req.body.list === "Work") {
        workItems.push(req.body.newItem);
        res.redirect("/work");
    }
    else {
        items.push(req.body.newItem);
        res.redirect("/");
    }
});


app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});


app.get("/about", function (req, res) {
    res.render("about");
});


app.listen(3000, function () {
    console.log("server has started");
});
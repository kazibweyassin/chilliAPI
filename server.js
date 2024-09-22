var express = require("express");
var cors = require("cors");

var app = express();

let chillies = [];
let count = 0;

app.use(express.json());
app.use(cors());

app.get("/chillies", (req, res) => {
    res.send(chillies);
    console.log("GET /chillies");
});

app.get("/chillies/:id", (req, res) => {
    const chiiwanted = chillies.find(c => c.id === parseInt(req.params.id));
    if (!chiiwanted) {
        res.status(404).send("The chilli with the given ID was not found");
    } else {
        res.status(200).send(chiiwanted);
    }
});

app.post("/chillies", (req, res) => {
    const neeChilli = { id: count++, ...req.body };
    chillies.push(neeChilli);
    res.status(201).send(neeChilli);
});

app.put("/chillies/:id", (req, res) => {
    const chilliIndex = chillies.findIndex((c) => c.id === parseInt(req.params.id));
    if (chilliIndex !== -1) {
        chillies[chilliIndex] = { id: parseInt(req.params.id), ...req.body };
        res.status(200).send(chillies[chilliIndex]);
    } else {
        res.status(404).send("The chilli with the given ID was not found");
    }
});

app.delete("/chillies/:id", (req, res) => {
    console.log(`delete a chilli with id ${req.params.id}`);
  
    const deletedChilli = chillies.find((c) => c.id === parseInt(req.params.id));
  
    if (!deletedChilli) {
        res.status(404).send("The chilli with the given ID was not found");
    } else {
        chillies = chillies.filter((c) => c.id !== parseInt(req.params.id));
        res.status(200).send(deletedChilli);
    }
});

app.all("*", (req, res) => {
    res.status(404).send("404 Not Found");
});

app.listen(3001, () => {
    console.log("listening on port 3001");
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path')


//const { SERVER_PORT } = process.env;
const { seed, getCreature, createCreature,getAllCreatures,getAttack } = require("./controller.js");



app.use(express.json());
app.use(cors());


//----middleware -------


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(express.static(path.join(__dirname, '../public')));

//seed the database
app.post("/seed", seed);

//get a creature
app.get("/creatures/:id", getCreature);
//get attack info
app.get("/attacks/:id", getAttack)
//get all creatures
app.get('/creatures',getAllCreatures);
//create a creature

app.post("/creatures", createCreature);

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`listening on port ${port}`));

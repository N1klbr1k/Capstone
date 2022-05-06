require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const { SERVER_PORT } = process.env;
const { seed, getCreature, createCreature,getAllCreatures,getAttack } = require("./controller.js");

app.use(express.json());
app.use(cors());

//seed the database
//app.post("/seed", seed);

//get a creature
app.get("/creatures/:id", getCreature);
//get attack info
app.get("/attacks/:id", getAttack)
//get all creatures
app.get('/creatures',getAllCreatures);
//create a creature
//app.post("/creatures", createCreature);

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));

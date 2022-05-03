require("dotenv").config();
const express = require("express");
const app = express();
const { SERVER_PORT } = process.env;
const { seed, getCreature, createCreature } = require("./controller.js");

app.use(express.json());

//seed the database
app.post("/seed", seed);

//get a creature
app.get("/creature/:id", getCreature);

//create a creature
app.post("/creature", createCreature);

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));

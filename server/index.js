require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path')
const {client } = require('pg')

const { SERVER_PORT } = process.env;
const { seed, getCreature, createCreature,getAllCreatures,getAttack } = require("./controller.js");



app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"))
})

app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, './public/styles.css'))
})

app.get('/js',(req, res) => {
    res.sendFile(path.join(__dirname, "./public/main.js"))
})
//----middleware -------
   app.use('/js',express.static(path.join(__dirname,'public/main.js')));
   
   app.use('/styles',express.static(path.join(__dirname,'./public/styles.css')))

   app.use('/', express.static(path.join(__dirname, './public/index.html')));

    
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

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));

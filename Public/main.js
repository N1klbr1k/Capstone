const monstlist = document.querySelector(".monster-select");
const monst_container = document.getElementsByClassName("add_monster_div");

const baseURL = "http://localhost:4545/";

//generate a random number between 1 and 20
const roll20 = () => {
  randNUM = Math.floor(Math.random() * 20 + 1);
  return randNUM;
};

//create a div to display creature
const createCreatureCard = (creature) => {
  let creatureDiv = document.createElement("div");
  let contents = creatureDiv.innerHTML(
    `<div class="creature_div">
    <p>${creature.creature_name}</p>
    <button onclick=''>+</button>
    <p>${creature.hp}</p>
    <button onclick=''>+</button>
    </div>
    `
  );
  monstlist.appendChild(creatureDiv);
};
//delete a creature card
const deleteCreatureCard = () => {};

//handle the attack button
const attackHandler = (e) => {
  e.preventDefault();
};

const getCreature = (id) => {
  axios
    .get(`${baseURL}/creatures?id=${id}`)
    .then((res) => {})
    .catch((err) => console.log(err));
};
//gets all creatures so they can be displayed in the drop down
const getAllCreatures = () => {
  axios.get(`http://localhost:4545/creatures`).then((res) => {
    for (let i = 0; i < res.data.length; i++) {}
  });
};

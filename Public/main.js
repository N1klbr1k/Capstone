const baseURL = "http://localhost:4545/";

//generate a random number between 1 and 20
const roll20 = () => {
  randNUM = Math.floor(Math.random() * 20 + 1);
  return randNUM;
};

//create a div to display creature
const createCreatureCard = () => {};
//delete a creature card
const deleteCreatureCard = () => {};

//handle the attack button
const attackHandler = (e) => {
  e.preventDefault();
};

const getCreature = (id) => {
  axios
    .get(`${baseURL}${id}`)
    .then((res) => {})
    .catch((err) => console.log(err));
};
//gets all creatures so they can be displayed in the drop down
const getAllCreatures = () => {

}

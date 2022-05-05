const monstlist = document.querySelector(".monster__container");
const monst_container = document.getElementsByClassName("monster__container");
const monst_btn = document.getElementById("add_monster");
const monst_form = document.getElementById("monster_form");
const monst_select= document.getElementById('monster-select');
const monstPic = document.getElementById('monstPic');
const strNum = document.getElementById('strNum')
const dexNum = document.getElementById('dexNum')
const conNum = document.getElementById('conNum')
const intNum = document.getElementById('intNum')
const wisNum = document.getElementById('wisNum')
const charNum = document.getElementById('charNum')


const baseURL = "http://localhost:4545/";

//generate a random number between 1 and 20
const roll20 = () => {
  randNUM = Math.floor(Math.random() * 20 + 1);
  return randNUM;
};

//create a div to display creature
const createCreatureCard = (creature) => {
  let creatureDiv = document.createElement("div");
  let changeHp =creature[0].hp
  creatureDiv.classList.add("creature_div");
  creatureDiv.innerHTML = `
    <p>${creature[0].name}</p>
    <button class='increment'>+</button>
    <p ><span>${changeHp}</span>/</p>
    
    <p>${creature[0].hp}</p>
    <button onclick='${changeHp => changeHP--}'>-</button>
     `;
  monstlist.appendChild(creatureDiv);
  //code for delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.addEventListener("click", deleteCreature);
  creatureDiv.appendChild(deleteBtn)
  //pic stuff
  monstPic.src = creature[0].imageurl
  strNum.textContent = creature[0].strength

};
//const decrement = val => val--;
//delete a creature card
const deleteCreature = (e) => {
  e.target.parentNode.remove();
}
//decrement the id of a creature
const decreaseHP = (e) => {
  console.log(e.target.nextSibling)
}
//handle the attack button
// const attackHandler = (e) => {
//   e.preventDefault();
// };
const submitHandler = (e) => {
  e.preventDefault();
  const monstDropDown = document.getElementById("monster-select");

  let id = monstDropDown.selectedIndex;

  getCreature(id);
};

const getCreature = (id) => {
  axios.get(`${baseURL}creatures/${id}`)
    .then((res) => {
      createCreatureCard(res.data);
      console.log(res.data)
    })
    .catch((err) => console.log(err));
};
//gets all creatures so they can be displayed in the drop down
const getAllCreatures = () => {
  axios.get(`http://localhost:4545/creatures`).then((res) => {
    // console.log(res.data)
   for (let i = 0; i < res.data.length; i++) {
       
        const monstOpt = document.createElement('option')
        monstOpt.textContent = res.data[i].creature_name
        monst_select.appendChild(monstOpt)
  }
  });
};
getAllCreatures();

//monst_btn.addEventListener("click", getCreature);
monst_form.addEventListener("submit", submitHandler);



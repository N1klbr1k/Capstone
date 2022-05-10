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
const monstDesc = document.getElementById('monst_desc')
const monstName = document.getElementById('monst_name')
const attackBtn = document.getElementById('attack_button')
const resultCont = document.querySelector('.result_container')

const baseURL = "http://localhost:4545/";

//generate a random number between 1 and 20
const rollx = (x) => {
  let v = Number(x)
  let randNUM = Math.floor(Math.random() * v + 1);
  return randNUM;
};

//create a div to display creature
const createCreatureCard = (creature) => {
  let creatureDiv = document.createElement("div");
  let changeHp =creature[0].hp//creature[0].hp
  let maxHp = creature[0].hp
  let idNum = creature[0].id
  creatureDiv.classList.add("creature_div");
  creatureDiv.setAttribute('data',`${idNum}`)
  creatureDiv.innerHTML = `
    <p>${creature[0].name}</p>
    
    <p ><span>${changeHp}</span>/</p>
    
    <p>${creature[0].hp}</p>
    
     `;
  monstlist.appendChild(creatureDiv);
  //------------increment hp----------------------
  const addHpButton = document.createElement('button')
  addHpButton.textContent= '+'
  addHpButton.addEventListener('click',increment)
  creatureDiv.appendChild(addHpButton)
  //--------------------------
  const changeHpBtn = document.createElement('button')
  changeHpBtn.textContent = "-"
  changeHpBtn.addEventListener('click', decrement)
  creatureDiv.appendChild(changeHpBtn)
  //code for delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.addEventListener("click", deleteCreature);
  creatureDiv.appendChild(deleteBtn)
  //pic stuff
  monstPic.src = creature[0].imageurl
  //stat stuff in info box
  strNum.textContent = creature[0].strength
  dexNum.textContent = creature[0].dex
  conNum.textContent = creature[0].con
  intNum.textContent = creature[0].intell
  wisNum.textContent = creature[0].wis
  charNum.textContent = creature[0].char
  //name and description in info box
  monstDesc.textContent = creature[0].description
  monstName.textContent = creature[0].name
};
//const decrement = val => val--;
//delete a creature card
const deleteCreature = (e) => {
  e.target.parentNode.remove();
}
//decrement the hp of a creature
const decrement = (e) => {
  //console.log(e.target.parentNode.childNodes[3].childNodes[0].innerHTML)
  let change = Number(e.target.parentNode.childNodes[3].childNodes[0].innerHTML)
  change--
  if(change <= 0){
    deleteCreature(e)
  } else {
  e.target.parentNode.childNodes[3].childNodes[0].innerHTML = change
  }
}
//----------------add t0 hp of creature----------------------------
const increment = (e) => {
  //console.log(e.target.parentNode.childNodes[5].childNodes[0])
  let change = Number(e.target.parentNode.childNodes[3].childNodes[0].innerHTML)
 if(change < Number(e.target.parentNode.childNodes[5].childNodes[0].data)){
   change++
   e.target.parentNode.childNodes[3].childNodes[0].innerHTML = change
 }
}




//-------------------------------------------------------------
//handle the attack button
const attackHandler = (e) => {

   e.preventDefault();
  //console.log(monstlist.children[1].attributes.data.textContent)
  console.log(monstlist.children.length)
  for(let i = 1; i < monstlist.children.length; i++){
    let id = monstlist.children[i].attributes.data.textContent;
    getAttack(id);
  }
//    axios.get(`${baseURL}creatures/${id}`).then((res) => makeAttackCard(res.data))
 };

 //----------querry's the database to get the info to make an attack------------
 const getAttack = id => {
   axios.get(`/attacks/${id}`).then((res) => {
     console.log(res.data)
     makeAttackCard(res.data)
   }).catch(err => console.log(err))
 }
 //-----------------------------------------------------------------------------
const makeAttackCard = attackdata => {
  let attackRoll = rollx(20) + Number(attackdata[0].to_hit)
  let damage =Math.floor((attackdata[0].damage-10)/2)
  let dieRoll = (nRoll, sDie) => {
    let total =0;
    for(let i = 0; i < nRoll;i++ ){
      total = total + rollx(sDie)
    }

    return total;
  } 
  //let damageRolled = dieRoll(attackdata.num_die,attackdata.die_size)
  let enemyAcCont = document.getElementById('ac__container')
  let enemyAc = enemyAcCont.selectedIndex;
  console.log(enemyAc)
  let hitMessage =document.createElement('p')
  hitMessage.textContent= ` ${attackRoll} hits doing ${dieRoll(Number(attackdata[0].num_die),Number(attackdata[0].die_size)+damage)}damage. ${attackdata[0].description}`
  const attackdiv = document.createElement('div')
  attackdiv.classList.add('attack_div')
  let missMessage = document.createElement('p')
  missMessage.textContent =  `${attackRoll} misses` 
  if(attackRoll > enemyAc){
    attackdiv.appendChild(hitMessage)
  } else {
    attackdiv.appendChild(missMessage)
  }
  const line = document.createElement('div')
  line.classList.add('line')
  attackdiv.appendChild(line)
  resultCont.appendChild(attackdiv)
}
//---------handles submits from the select monster form-----
 const submitHandler = (e) => {
  e.preventDefault();
  const monstDropDown = document.getElementById("monster-select");

  let id = monstDropDown.selectedIndex;

  getCreature(id);
};

const getCreature = (id) => {
  axios.get(`/creatures/${id}`)
    .then((res) => {
      createCreatureCard(res.data);
      console.log(res.data)
    })
    .catch((err) => console.log(err));
};
//gets all creatures so they can be displayed in the drop down
const getAllCreatures = () => {
  axios.get(`/creatures/`).then((res) => {
    // console.log(res.data)
   for (let i = 0; i < res.data.length; i++) {
       
        const monstOpt = document.createElement('option')
        monstOpt.textContent = res.data[i].creature_name
        monstOpt.value = res.data[i].creature_id
        monst_select.appendChild(monstOpt)
  }
  });
};
getAllCreatures();

//monst_btn.addEventListener("click", getCreature);
monst_form.addEventListener("submit", submitHandler);
attackBtn.addEventListener('click',attackHandler)


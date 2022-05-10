const creatureName = document.getElementById('name')
const hitSelect = document.getElementById('hit_select')
const strDrop = document.getElementById('strength_dropdown')
const dexDrop = document.getElementById('dex_dropdown')
const conDrop = document.getElementById('con_dropdown')
const intDrop = document.getElementById('int_dropdown')
const wisDrop = document.getElementById('wis_dropdown')
const charDrop = document.getElementById('char_dropdown')
const dieNum = document.getElementById('die_num')
const dieSize = document.getElementById('die_size')
const attDesc = document.getElementById('att_desc')
const imageURL = document.getElementById('imageIn')
const altText = document.getElementById('alt_text')
const monstForm = document.querySelector('form')
const hpInput = document.getElementById('hpInp')
const acDrop = document.getElementById('ac_cont')
const speedIn = document.getElementById('speed_input')
const crIn = document.getElementById('CR')
const monstDesc = document.getElementById('monst_Desc')
const attName = document.getElementById('att_name')



const addOptions = (selectid, numOpt) => {
    for(let i = 0; i< numOpt; i++){
        let option = document.createElement('option')
        option.textContent= i+1
        selectid.appendChild(option)
    }
}

addOptions(dieNum, 10)
addOptions(dieSize, 12)
addOptions(acDrop, 25)
addOptions(strDrop, 20)
addOptions(dexDrop, 20)
addOptions(conDrop, 20)
addOptions(hitSelect, 15)
addOptions(charDrop, 20)
addOptions(wisDrop, 20)
addOptions(intDrop, 20)

const createCreature = () => {

    body = {
        name:  creatureName.value,
        hp: +hpInput.value, 
        ac: +acDrop.value,
        speed: speedIn.value,
        cr: crIn.value,
        desc: monstDesc.value,
        str: +strDrop.value,
        dex: +dexDrop.value,
        con: +conDrop.value,
        int: +intDrop.value,
        wis: +wisDrop.value,
        char: +charDrop.value,
        attack_name: attName.value,
        to_hit: +hitSelect.value,
        die_size: +dieSize.value,
        num_die: +dieNum.value,
        description: attDesc.value,
        imageURL: imageURL.value,
        alt_text:altText.value
        }
    axios.post(`http://localhost:4545/creatures`,body).then(res => {console.log(res, 1)}).catch(err => console.log(err))
}

const submitHandler = e => {
    e.preventDefault()
    console.log(e.target);
    createCreature(e);
}

monstForm.addEventListener('submit', submitHandler)
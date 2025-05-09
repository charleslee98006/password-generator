let symbolToggle = true
let numbersToggle = true
let symbolToggleEl = document.querySelector("#symbol-toggle-btn")
let numbersToggleEl = document.querySelector("#numbers-toggle-btn")
let result1El = document.querySelector("#result-1")
let result2El = document.querySelector("#result-2")
let passwordLengthEl = document.querySelector("input")

const alphaCharacters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"] 
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const specialChars = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"];

function toggleSymbol(){
    symbolToggle = !symbolToggle
    if(symbolToggle){
        symbolToggleEl.textContent = "On"
    }else{
        symbolToggleEl.textContent = "Off"
    }
}

function toggleNumbers(){
    numbersToggle = !numbersToggle
    if(numbersToggle){
        numbersToggleEl.textContent = "On"
    }else{
        numbersToggleEl.textContent = "Off"
    }
}
function createPassword(){
    result1El.textContent = generatePassword()
    result2El.textContent = generatePassword()
}

function generatePassword(){
    let generatedPassword = ""
    let passwordLengthInputValue = passwordLengthEl.value
    if(!passwordLengthInputValue){
        passwordLengthInputValue = passwordLengthEl.placeholder
    } else if(passwordLengthInputValue > 15){
        showToast("Sorry, only 15 characters max!")
        throw new Error('Only 15 characters max are allowed!');
    }
    let filter;
    for (let j = 0; j< passwordLengthInputValue; j++){
        if(!symbolToggle && !numbersToggle){
            filter = alphaCharacters
        }else if(!symbolToggle){
            filter = alphaCharacters.concat(numbers)
        }else if(!numbersToggle){
            filter = alphaCharacters.concat(specialChars)
        }else{
            filter = alphaCharacters.concat(specialChars).concat(numbers)
        }
        generatedPassword += filter[Math.floor(Math.random() * filter.length)]
    }
    return generatedPassword;
        
}

function copyToClickBoard(element){
    try{
        showToast("Copied to Clipboard!")
        navigator.clipboard.writeText(element.textContent)
    }catch(error){
        console.log(error)
    }
}

function showToast(message){
    var el = document.getElementById("snackbar");
    el.textContent = message
    el.className = "show";
    setTimeout(function(){ el.className = el.className.replace("show", ""); }, 3000);
}
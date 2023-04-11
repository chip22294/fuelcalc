document.getElementById("main-form").addEventListener("submit", checkForm);
var mainForm = document.getElementById("main-form");
var errorMsg = document.getElementById("errormsg");
const viberURL = "viber://forward?text=";
const telegramURL = "https://telegram.me/share/url?url=http://fire.me&text=";

//inForm.addEventListener("submt", checkForm);

function calc(fuelCons, fuelCost, distance) {
    return Math.round (((fuelCons / 100) * distance) * fuelCost);
}

function chkErrors() {
    var retResult = true;

    if (mainForm.fuelcons.value === "" || mainForm.fuelcost.value === "" || mainForm.distance.value === "") {
        retResult = false;
    }
    if (mainForm.fuelcons.value <= 1 || mainForm.fuelcost.value <= 1 || mainForm.distance.value <= 1) {
        retResult = false;
    }
    return retResult;
}

function processForm () {
    var oFuelcons = mainForm.fuelcons.value;
    var oFuelcost = mainForm.fuelcost.value;
    var oDistance = mainForm.distance.value;
    
    if (chkErrors()) {
        mainForm.price.value= calc (oFuelcons, oFuelcost, oDistance);
        errorMsg.textContent = "";
    } else 
    {
        mainForm.price.value= 0;
        errorMsg.textContent = "Error !";
    }
}

function checkForm(event) {
    event.preventDefault();
    processForm();
}

function makeReport() {
    var rep = "";
    rep += "Fuel consumption: " + mainForm.fuelcons.value + " l/100 km ";
    rep += "Fuel cost: " + mainForm.fuelcost.value + " UAH ";
    rep += "Distance: " + mainForm.distance.value + " km ";
    rep += "Price: " + mainForm.price.value + " UAH";
    return rep;
}

function shareText (inText, inUrl) {
    console.log(inText);
    window.open (inUrl + inText);
}

function sendToClick(inClick) {
    processForm();
    makeReport();
    switch (inClick) {
        case "viber":
            shareText (makeReport(), viberURL);
            break;
        case "telegram":
            shareText (makeReport(), telegramURL);
            break;

        default:
            break;
    }
    
}
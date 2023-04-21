document.getElementById("main-form").addEventListener("submit", checkForm);
var mainForm = document.getElementById("main-form");
var errorMsg = document.getElementById("errormsg");
const viberURL = "viber://forward?text=";
const telegramURL = "https://telegram.me/share/url?url=http://fire.me&text=";

mainForm.fuelcons.value = getCookie("fuelcons");
mainForm.fuelcost.value =  getCookie("fuelcost");
mainForm.distance.value =  getCookie("distance");

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

function saveFormCookies() {
    setCookie("fuelcons", mainForm.fuelcons.value, 365);
    setCookie("fuelcost", mainForm.fuelcost.value, 365);
    setCookie("distance", mainForm.distance.value, 365);
}

function processForm () {
    var oFuelcons = mainForm.fuelcons.value;
    var oFuelcost = mainForm.fuelcost.value;
    var oDistance = mainForm.distance.value;
    
    if (chkErrors()) {
        mainForm.price.value= calc (oFuelcons, oFuelcost, oDistance);
        errorMsg.textContent = "";
        saveFormCookies();
    } else 
    {
        mainForm.price.value = 0;
        errorMsg.textContent = "Error !";
    }
}

function checkForm(event) {
    event.preventDefault();

    switch (event.submitter.id) {
        case "calculate":
            processForm();
            break;

        case "resetf":
            mainForm.price.value = 0;
            mainForm.distance.value = 0;
            break;
    
        default:
            break;
    }
    
    
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
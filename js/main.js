document.getElementById("main-form").addEventListener("submit", checkForm);
var mainForm = document.getElementById("main-form");
var errorMsg = document.getElementById("errormsg");

var viberbtn = document.getElementById("viberbtn");
var telebtn = document.getElementById("telebtn");

const viberURL = "viber://forward?text=";
const telegramURL = "https://telegram.me/share/url?url=http://fire.me&text=";
const defaultFuelCost = 49;
const defaultFuelCons = 10;
const defaultDistance = 2;

if (getCookie("fuelcons") !== null) {
    mainForm.fuelcons.value = getCookie("fuelcons");
} else {
    mainForm.fuelcons.value = defaultFuelCons;
}

if (getCookie("fuelcost") !== null) {
    mainForm.fuelcost.value =  getCookie("fuelcost");
} else {
    mainForm.fuelcost.value = defaultFuelCost;
}

if (getCookie("distance") !== null) {
    mainForm.distance.value =  getCookie("distance");    
} else {
    mainForm.distance.value = defaultDistance;
}

function shareVisible(isVisible) {
    if (isVisible) {
        viberbtn.style.visibility = "visible";
        telebtn.style.visibility = "visible";
    } else {
        viberbtn.style.visibility = "hidden";
        telebtn.style.visibility = "hidden";
    }
}

if (mainForm.price.value > 0) { shareVisible (true); }
    else { shareVisible (false); }

function resetCalc() {
    mainForm.price.value = 0;
    shareVisible (false);
}

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
        shareVisible (true);
    } else 
    {
        mainForm.price.value = 0;
        errorMsg.textContent = "Error !";
        shareVisible (false);
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
            mainForm.distance.value = defaultDistance;
            errorMsg.textContent = "";
            shareVisible (false);
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
document.getElementById("main-form").addEventListener("submit", checkForm);
var mainForm = document.getElementById("main-form");

//inForm.addEventListener("submt", checkForm);

function calc(fuelCons, fuelCost, distance) {
    return Math.round (((fuelCons / 100) * distance) * fuelCost);
}

function chkErrors() {
    var retResult = true;
    /*
    console.log("fuelcons: " + mainForm.fuelcons.value);
    console.log("fuelcost: " + mainForm.fuelcost.value);
    console.log("distance: " + mainForm.distance.value);
    */
    if (mainForm.fuelcons.value === "" || mainForm.fuelcost.value === "" || mainForm.distance.value === "") {
        retResult = false;
    }
    if (mainForm.fuelcons.value <= 1 || mainForm.fuelcost.value <= 1 || mainForm.distance.value <= 1) {
        retResult = false;
    }
    return retResult;
}

function checkForm(event) {
    event.preventDefault();
    
    var oFuelcons = mainForm.fuelcons.value;
    var oFuelcost = mainForm.fuelcost.value;
    var oDistance = mainForm.distance.value;
    
    if (chkErrors()) {
        mainForm.price.value= calc (oFuelcons, oFuelcost, oDistance);
    } else 
    {
        mainForm.price.value="Error !";
    }


    
}


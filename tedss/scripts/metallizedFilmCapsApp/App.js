const utils = new Utils();
function validate() {
    const dropDownID = ["#inputType","#inputVoltage","#inputCapacitance","#inputTolerance",]
    let dropDownValues = utils.getSelectedFields(dropDownID);
    let displayBool;
    if(!dropDownValues.includes("")&&validateCapacitance(dropDownValues[2])){
        displayData(dropDownValues);
        displayBool = true;
    } else displayBool = false;
    utils.showHideJquery(displayBool,"#resourcesMetalFilmCaps");
}
function loadVoltageDropDown(){
    const voltage = {};
        voltage["default"] = ["A","B","C","D","E","F"];
        voltage["MC12"] = ["D","F","J"];
    const defaultType = ["625B","625C","625D","650B","650C","650D","652A","653A"];
    const typeList = document.getElementById("inputType");
    const voltageList = document.getElementById("inputVoltage");
    let selectedValue = (defaultType.includes(typeList.options[typeList.selectedIndex].value))
        ? "default"
        : "MC12";
    for(let j=voltageList.options.length-1; j>=1; j--){
        voltageList.remove(j);
    }
    let dropdownOptions = voltage[selectedValue];
    if(dropdownOptions){
        for(let i=0; i<dropdownOptions.length; i++){
            let value = new Option(dropdownOptions[i],dropdownOptions[i]);
            voltageList.options.add(value);
        }
    }
}
function validateCapacitance(capacitance){
    const regex = new RegExp(/^[1-9]{1}[\d]{2}$/);
    if(regex.test(capacitance)) return true;
    else{
        (function(){
            utils.showHideJquery(true,"#popup");
            $("#popupText").text(function(){return (capacitance.substring(0,1)==="0")? "Capacitance Code Can't Start With 0" : "Capacitance Code Too Long!"});
            $('body').css("overflow","hidden");
            const popupArea = document.getElementById("popup");
            $(window).click(function(event){
                if(event.target==popupArea) {
                    utils.showHideJquery(false,"#popup")
                    $('body').css("overflow","visible");
                }
            });
        })();
        return false
    }
}
function displayData(dropDownValues){
    const elementID = ["#outputVoltage","#outputCapacitance","#outputTolerance", "#outputPartNumber"];
    const obj = {
        voltage:(function(){return returnVoltage(dropDownValues[0],dropDownValues[1]);})(),
        capacitance:(function(){return utils.roundCapacitance(utils.threeDigitCodeCalculator(dropDownValues[2]),false);})(),
        tolerance:(function(){return returnTolerance(dropDownValues[3]);})(),
        partNumber:(function(){return returnPartNumber(dropDownValues);})()
    };
    const returnedValues = Object.values(obj);
    for(let i=0; i<elementID.length; i++){
        $(elementID[i]).val(returnedValues[i]);
    }
}
const enablePopover = (function (){
    $('[data-toggle="popover"]').popover()
})();
window.onload = enablePopover;
const reset = (function(){
    $("#inputType").change(function(){
        let resetDropDownVal = $("#inputType").val();
        if(resetDropDownVal==="") utils.resetTedss("#metalFilmCapsApp","#resourcesMetalFilmCaps");
    });
    $("#resetApp").click(function(){
        utils.resetTedss("#metalFilmCapsApp","#resourcesMetalFilmCaps");
    });
})();
window.onload = reset;
function returnVoltage(type,voltage){
    if(type=="MC12"){
        switch(voltage){
            case "D" : voltage += " = 100 VDC";
            break;
            case "F" : voltage += " = 200 VDC";
            break;
            case "J" : voltage += " = 400 VDC";
            break;
        }
    } else{
        switch(voltage){
            case "A" : voltage += " = 50 VDC";
            break;
            case "B" : voltage += " = 100 VDC";
            break;
            case "C" : voltage += " = 200 VDC";
            break;
            case "D" : voltage += " = 300 VDC";
            break;
            case "E" : voltage += " = 400 VDC";
            break;
            case "F" : voltage += " = 600 VDC";
            break;
        }
    } return voltage;
}
function returnTolerance(tolerance){
    switch(tolerance){
        case "M" : tolerance += " = ±20%";
        break;
        case "K" : tolerance += " = ±10%";
        break;
        case "J" : tolerance += " = ±5%";
        break;
        case "G" : tolerance += " = ±2%";
        break;
        case "F" : tolerance += " = ±1%";
        break;    
    }
    return tolerance;
}
function returnPartNumber(dropDownValues){
    let partNumber = dropDownValues.join("");
    return (dropDownValues[0]!="MC12")? partNumber = utils.insert(partNumber,4,"1") : partNumber;
}

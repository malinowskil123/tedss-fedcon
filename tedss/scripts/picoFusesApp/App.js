const picoUtils = new Utils();
// reset second drop down on change on first
function validate(){
    const dropdownId = ["#series","#ampCode"];
    let valuesArr = picoUtils.getSelectedFields(dropdownId);
    let resourceBool;
    if(valuesArr.includes("")!=true){
        let partNumberDataObject = picoUtils.getDataFromStorage(valuesArr[0],valuesArr[1],"ampCode");
        displayData(partNumberDataObject);
        displayRating(partNumberDataObject);
        resourceBool = true;
    } else resourceBool = false;
    picoUtils.showHide(resourceBool,"#resourcesPicoApp");
}
function loadValuesDropDown(series){
    let dropDownLength = $("#ampCode").children("option").length;
    if(dropDownLength>1)picoUtils.resetDynamicDropDown("#ampCode");
    picoUtils.populateDropDown(series,"ampCode","ampCode");
}
function displayData(partNumberDataObject){
    const tableId = ["#amperageRating","#maxVoltage","#interruptingRating","#action","#application"];
    let counter = 0;
    for(let i in partNumberDataObject){
        if(i==="amperageRating"||i==="maxVoltage"||i==="interruptingRating"||i==="action"||i==="application") $(tableId[counter++]).text(partNumberDataObject[i]);
        else ;
    }  
}
// fix===============!
function displayRating(partNumberDataObject){
    const tableId = ["#rcLogo","#csaLogo","#pseLogo"];
    let counter = 0;
    for(let i in partNumberDataObject){
        if(i==="rcRating"||i==="csaRating"||i==="pseRating"){
            if(partNumberDataObject[i]===false) $(tableId[counter++]).hide("slow");
            if(partNumberDataObject[i]===true) $(tableId[counter++]).show("fast");
        } else ;
    }  
}
function belfuseConversion(partNumberDataObject) {
}
const reset = (function(){
    $("#series").change(function(){
        let resetDropDownVal = $("#series").val();
        if(resetDropDownVal=="") picoUtils.resetApp("#picoApp","#resourcesPicoApp");
    });
    $("#resetApp").click(function(){
        picoUtils.resetApp("#picoApp","#resourcesPicoApp");
    });
})();
window.onload = reset;
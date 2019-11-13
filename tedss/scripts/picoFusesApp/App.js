const picoUtils = new Utils();
const picoGlobalJquery = new GlobalJquery();

function validate(){
    const dropdownId = ["#series","#ampCode"];
    let valuesArr = picoUtils.getSelectedFields(dropdownId);
    let partNumberDataObject = picoUtils.getDataFromStorage(valuesArr[0],valuesArr[1],"ampCode");
    let resourceBool;
    if(valuesArr.includes("")!=true){
        displayTable(partNumberDataObject);
        resourceBool = true;
    } else resourceBool = false;
    picoGlobalJquery.fadeInFadeOut(resourceBool,"#resources")
}
function loadValuesDropDown(series){
    let dropDownLength = $("#ampCode").children("option").length;
    if(dropDownLength>1)picoUtils.resetDynamicDropDown("#ampCode");
    picoUtils.populateDropDown(series,"ampCode","ampCode");
}

function displayTable(partNumberDataObject){
    const tableId = ["#amperageRating","#maxVoltage","#interruptingRating","#application"];
    if($(tableId[0]).text()!="") picoUtils.clearText(tableId);
    $("#resetMilF19207").click(function(){
        picoUtils.clearText(tableId);
    });
    let counter = 0;
    for(let i in partNumberDataObject){
        if(i==="ampCode"){
            ; //nop
        } else $(tableId[counter++]).text(partNumberDataObject[i]);
       console.log(partNumberDataObject[i]);
    }  
}

const reset = (function(){
    $("#series").change(function(){
        let resetDropDownVal = $("#series").val();
        if(resetDropDownVal=="") picoUtils.resetApp("#picoApp","#resources");
    });
    $("#resetApp").click(function(){
        picoUtils.resetApp("#picoApp","#resources");
    });
})();
window.onload = reset;
const onLoadFunctions = (function(){
    picoGlobalJquery.hideElement("#resources");
})();
window.onload = onLoadFunctions;
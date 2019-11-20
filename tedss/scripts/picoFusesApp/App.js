const picoUtils = new Utils();

function validate(){
    const dropdownId = ["#series","#ampCode"];
    let valuesArr = picoUtils.getSelectedFields(dropdownId);
    $("#series").change(function(){
        valuesArr[1] = "";
    });
    console.log(valuesArr);
    if(!valuesArr.includes("")){
        let partNumberDataObject = picoUtils.getDataFromStorage(valuesArr[0],valuesArr[1],"ampCode");
        displayTechnicalData(partNumberDataObject);
        displayRating(partNumberDataObject);
        displayAlternatePn(partNumberDataObject);
        picoUtils.showHide(true,"#resourcesPicoApp");
    } else picoUtils.showHide(false,"#resourcesPicoApp");
}
function loadValuesDropDown(series){
    picoUtils.populateDropDown(series,"ampCode","ampCode");
}
function displayTechnicalData(partNumberDataObject){
    const tableId = ["#amperageRating","#maxVoltage","#interruptingRating","#action","#application"];
    let counter = 0;
    for(let i in partNumberDataObject){
        if(i==="amperageRating"||i==="maxVoltage"||i==="interruptingRating"||i==="action"||i==="application") {
            if(i==="amperageRating") $(tableId[counter++]).text(partNumberDataObject[i]+"A");
            else if(i==="maxVoltage") $(tableId[counter++]).text(partNumberDataObject[i]+"V")
            else $(tableId[counter++]).text(partNumberDataObject[i]);
        } else ;
    }  
}
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
function displayAlternatePn(littleFuseData){
    const inputId = ["#belfusePn","#bussmanPn"];
    let alternatePn =[belfuseConversion(littleFuseData),bussmannConversion(littleFuseData)];
    for(let i=0; i<inputId.length; i++){
        $(inputId[i]).val(alternatePn[i]);
    }
}
function resourcesLayout(){
    const divId = ["divBelFuse","divBussmann"];
}
// work here
// function loadResources(){

// }
// fix null issues--------------------------------------
function belfuseConversion(littleFuseData) {
    if(littleFuseData===null&&littleFuseData.maxVoltage===125){
        let belFuseSeries = (littleFuseData.action==="fast-acting")? "MQ" : "MS";
        let belfuseNumber = picoUtils.getDataFromStorage(belFuseSeries,littleFuseData.amperageRating,"amperageRating");
        return belfuseNumber.partNumber;
    } else return null;
}
function bussmannConversion(littleFuseData){
    if(littleFuseData===null&&littleFuseData.maxVoltage===125&&littleFuseData.action==="fast-acting"){
        let bussmannPartNumber = picoUtils.getDataFromStorage("MCRW",littleFuseData.amperageRating,"amperageRating");
        return bussmannPartNumber.partNumber;
    } else return null;
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
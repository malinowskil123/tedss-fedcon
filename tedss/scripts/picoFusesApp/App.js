const picoUtils = new Utils();
function validate(){
    const dropdownId = ["#series","#ampCode"];
    let valuesArr = picoUtils.getSelectedFields(dropdownId);
    let displayBool;
    if(valuesArr.includes("")!=true){
        let littleFuseData = picoUtils.getObject(valuesArr[0],valuesArr[1],"ampCode");
        displayTechnicalData(littleFuseData);
        displayRating(littleFuseData);
        displayAlternatePn(littleFuseData,valuesArr.join(""));
        toggleDataSheetOptions();
        displayBool = true;
    } else  displayBool = false;
    picoUtils.showHideJquery(displayBool,"#resourcesPicoApp");
}
// onchange trigger
function loadValuesDropDown(series){
    const styleList = document.getElementById("series");
    const terminalList = document.getElementById("ampCode");
    let selectedValue =  styleList.options[styleList.selectedIndex].value;
    for(let j=terminalList.options.length-1; j>=1; j--){
        terminalList.remove(j);
    }
    let dropdownOptions = picoUtils.getDropDownValues(series,"ampCode");
    if(dropdownOptions){
        for(let i=0; i<dropdownOptions.length; i++){
            let value = new Option(dropdownOptions[i],dropdownOptions[i]);
            terminalList.options.add(value);
        }
    }
}
function displayTechnicalData(littleFuseData){
    const tableId = ["#amperageRating","#maxVoltage","#interruptingRating","#action","#application"];
    let counter = 0;
    for(let i in littleFuseData){
        if(i==="amperageRating"||i==="maxVoltage"||i==="interruptingRating"||i==="action"||i==="application") {
            if(i==="amperageRating") $(tableId[counter++]).text(littleFuseData[i]+"A");
            else if(i==="maxVoltage") $(tableId[counter++]).text(littleFuseData[i]+"V")
            else $(tableId[counter++]).text(littleFuseData[i]);
        } else ;
    }  
}
function displayRating(littleFuseData){
    const tableId = ["#rcLogo","#csaLogo","#pseLogo"];
    let counter = 0;
    for(let i in littleFuseData){
        if(i==="rcRating"||i==="csaRating"||i==="pseRating"){
            if(littleFuseData[i]===false) $(tableId[counter++]).hide("slow");
            if(littleFuseData[i]===true) $(tableId[counter++]).show("fast");
        } else ;
    }  
}
function displayAlternatePn(littleFuseData,littleFusePn){
    if(littleFuseData!==null){
        const divId = ["#divBelfuse","#divBussmann"];
        const alternatePn = [belfuseConversion(littleFuseData),bussmannConversion(littleFuseData)];
        $("#littlefusePn").val(littleFusePn);
        $("#belfusePn").val(belfuseConversion(littleFuseData));
        $("#bussmannPn").val(bussmannConversion(littleFuseData));
        let displayBool;
        for(let i=0; i<alternatePn.length; i++){
            if(alternatePn[i]===null) displayBool = false;
            else displayBool = true;
            picoUtils.showHideJquery(displayBool,divId[i]);
        }
    }
}
// onchange
function loadDataSheet(manufacturer){
    const pnObject = [$("#belfusePn").val(),$("#bussmannPn").val(),$("#littlefusePn").val()];
    let series;
    if(manufacturer==="littlefuse") series = pnObject[2].substring(0,3);
    else if (manufacturer==="belfuse") series = pnObject[0].substring(0,2);
    else if (manufacturer==="bussmann") series = pnObject[1].substring(0,4);
    let dataSheetPath = `/tedss/content/picoFuseData/${getDataSheetFileName(series.toLowerCase())}.pdf`;
    $("#dataSheet").attr("href",dataSheetPath);
}
// work here-----------------
function toggleDataSheetOptions(){
    const pnObject = [$("#belfusePn").val(),$("#bussmannPn").val(),$("#littlefusePn").val()];
    const optionsId = ["#belfuseOption","#bussmannOption"];
    let displayBool,counter=0;
    for(let i=0;i<pnObject.length-1;i++){
        if(pnObject[i]!=="") displayBool=true;
        else displayBool=false;
        picoUtils.showHideJquery(displayBool,optionsId[counter++])
    }
}
function getDataSheetFileName(series){
    if(series==="251"||series==="253") series="251-253";
    else if(series==="265"||series==="266"||series==="267") series="265-266-267"
    return  series+"Series";
}
// function loadImg(){

// }
const reset = (function(){
    $("#series").change(function(){
        let resetDropDownVal = $("#series").val();
        if(resetDropDownVal=="") picoUtils.resetAppTedss("#picoApp","#resourcesPicoApp");
    });
    $("#resetApp").click(function(){
        picoUtils.resetAppTedss("#picoApp","#resourcesPicoApp");
    });
})();
window.onload = reset;
function belfuseConversion(littleFuseData) {
    if(littleFuseData.maxVoltage===125){
        let belFuseSeries = (littleFuseData.action==="fast-acting")? "MQ" : "MS";
        let belfuseNumber = picoUtils.getObject(belFuseSeries,littleFuseData.amperageRating,"amperageRating");
        return (belfuseNumber===null)? null : belfuseNumber.partNumber;
    } else return null;
}
function bussmannConversion(littleFuseData){
    if(littleFuseData.maxVoltage===125&&littleFuseData.action==="fast-acting"){
        let bussmannPartNumber = picoUtils.getObject("MCRW",littleFuseData.amperageRating,"amperageRating");
        return (bussmannPartNumber===null)? null :bussmannPartNumber.partNumber;
    } else return null
}
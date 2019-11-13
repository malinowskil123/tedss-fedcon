const utilsAN3155 = new Utils();
const globalJqueryAN3155 = new GlobalJquery();

function validateAN3155(){
    const dropDownIdArrAN3155 = ["#wattageAN3155","#resistanceAN3155"];
    let valuesArrAN3155 = utilsAN3155.getSelectedFields(dropDownIdArrAN3155,"val");
    let resourceBool;
    if(valuesArrAN3155.includes(" ")!=true){
        let dataObject = utilsAN3155.getDataFromStorage(valuesArrAN3155[0],valuesArrAN3155[1],"resistance");
        resourceBool = true;
        loadResourcesAN3155(valuesArrAN3155[0]);
        showElectricalDataAN3155(valuesArrAN3155,dataObject);
    } else resourceBool = false;
    globalJqueryAN3155.fadeInFadeOut(resourceBool, "#resourcesAN3155");
}
function loadResourcesAN3155(model){
    let pictureLink = `/fedcon/content/images/rheostats/AN3155-${model.substring(7)}.png`;
    $("#diagramAN3155").attr('href',pictureLink);
}
function populateDropDownAN3155(model){
    if(model===""||model==="AN3155-25"||model==="AN3155-50") utilsAN3155.resetDynamicDropDown("#resistanceAN3155");    
    if(model!=="") utilsAN3155.populateDropDown(model, "resistance","resistanceAN3155");
}
function showElectricalDataAN3155(pnArr,dataObject){
    const showIdArrAN3155 = ["#showResistanceAN3155","#showAmperageAN3155"];
    let counter = 0;
    for(let i in dataObject){
        $(showIdArrAN3155[counter++]).val((i==="resistance")? dataObject[i]+="Ω" : dataObject[i]);
    }
    let modelText = (pnArr[0].substring(6)==="25") ? "Model H = 25 Watts" : "Model J = 50 Watts";
    $("#showModelWattageAN3155").val(modelText);
    $("#showPartNumberAN3155").val(pnArr.join("-"));
}

const resetAppAN3155 = (function(){
    $("#wattageAN3155").change(function(){
        let resetDropDownVal = $("#wattageAN3155").val();
        if(resetDropDownVal=="") utilsAN3155.resetApp("#formAN3155","#resourcesAN3155");
    });
    $("#resetAN3155").click(function(){
        utilsAN3155.resetApp("#formAN3155","#resourcesAN3155")
    });
})();
window.onload = resetAppAN3155;
const pageLoadFunctionAN3155 = (function(){
    globalJqueryAN3155.hideElement("#resourcesAN3155");
})();
window.onload = pageLoadFunctionAN3155;
const utilsM22 = new Utils();
const globalJqueryM22 = new GlobalJquery();

function validateM22() {
    const dropdownId = ["#specificationM22", "#resistanceM22", "#electricalPositionM22", "#shaftMountingM22"];
    let valuesArrM22 = utilsM22.getSelectedFields(dropdownId,"val");
    let resourcesBool;
    if(valuesArrM22.includes("")!==true){
        let dataObject = utilsM22.getDataFromStorage(valuesArrM22[0],valuesArrM22[1],"milType");
        resourcesBool = true;
        showPartNumbers(dataObject, valuesArrM22[0], valuesArrM22[2], valuesArrM22[3])
        loadResources(valuesArrM22[0]);
        showElectricalData(dataObject);
        showElectricalPosition(valuesArrM22[2]);
        showShaftInfo(valuesArrM22[3]);
    } else resourcesBool = false;
    globalJqueryM22.fadeInFadeOut(resourcesBool, "#resourcesM22D");   
}
function showPartNumbers(dataObject,specNumber,electricalPosition,shaftMounting){
    let milType = utilsM22.insert(specNumber + dataObject.milType, 6, "-");
    $("#showPartNumberM22").val(milType + electricalPosition + shaftMounting);
    $("#showRpNumberM22").val(utilsM22.insert(dataObject.rpNumber, 4, electricalPosition + shaftMounting));
}
function loadResources(specNumber){
    const specNumberNoDash = specNumber.replace("/","");
    let fancyboxPictureLink = `/fedcon/content/images/rheostats/${specNumberNoDash}.jpg`
    let specSheetLink = `/fedcon/content/specsheet/rheostats/${specNumberNoDash}.pdf`
    $("#fancyboxDiagramM22").attr('href', fancyboxPictureLink,true);
    $("#specSheetLinkM22").attr("href", specSheetLink);
}
// triggered by onchange event
function populateResistanceDropDown(specNumber) {
    if(specNumber===""||specNumber==="M22/03"||specNumber==="M22/05") utilsM22.resetDynamicDropDown("#resistanceM22");
    // doesn't trigger find method by empty spec number
    if(specNumber!="") utilsM22.populateDropDown(specNumber, "milType", "resistanceM22");
}
function showElectricalData(dataObject) {
    const displayElectricalId = ["#showResistanceM22","#showAmperageM22"];
    let counter = 0;
    for(let i in dataObject){
        if(i==="milType"||i==="rpNumber") {
            ;
        } else $(displayElectricalId[counter++]).val(dataObject[i]);
    }
}
function showElectricalPosition(electricalPosition) {
    const electricalPositionArr = [
        "No electrical off position",
        "Electrical off position at end of rotation of the control knob in a counterclockwise direction",
        "Electrical off position at end of rotation of the control knob in a clockwise direction",
    ];
    let text = (electricalPosition===1)? electricalPositionArr[0] : (electricalPosition===2)? electricalPositionArr[1] : electricalPositionArr[2];
    $("#showElectricalPositionM22").val(text);
}
function showShaftInfo(shaftMounting) {
    const displayShaftID = ["#showShaftStyleM22", "#showBushingStyleM22", "#showShaftLengthM22", "#showShaftDiameterM22"];
    let dataObject = utilsM22.getDataFromStorage("shaftDataArr",shaftMounting,"symbol");
    let counter = 0;
    for(let i in dataObject){
        if(i==="symbol") {
            ;//nop
        } else $(displayShaftID[counter++]).val(dataObject[i]);
    }//BADNEW;-)       
}   

const resetAppM22 = (function(){
    $("#specificationM22").change(function(){
        let resetDropDownVal = $("#specificationM22").val();
        if(resetDropDownVal=="") utilsM22.resetApp("#formM22","#resourcesM22D");
    });
    $("#resetM22").click(function(){
        utilsM22.resetApp("#formM22","#resourcesM22D");
    });
})();
window.onload = resetAppM22;
const onLoadFunctionsM22 = (function(){
    globalJqueryM22.hideElement("#resourcesM22D");
    utilsM22.populateDropDown("shaftDataArr", "symbol", "shaftMountingM22");
})();
window.onload = onLoadFunctionsM22;



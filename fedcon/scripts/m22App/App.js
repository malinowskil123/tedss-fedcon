const utilsM22 = new Utils();
function validateM22() {
    const dropdownId = ["#specificationM22","#resistanceM22","#electricalPositionM22","#shaftMountingM22"];
    let valuesArrM22 = utilsM22.getSelectedFields(dropdownId, "val");
    let resourcesBool;
    if (valuesArrM22.includes("") !== true) {
        let m22Object = utilsM22.getObject(valuesArrM22[0],valuesArrM22[1],"milType");
        resourcesBool = true;
        showPartNumbers(m22Object,valuesArrM22[0],valuesArrM22[2],valuesArrM22[3])
        loadResources(valuesArrM22[0]);
        showElectricalData(m22Object);
        showElectricalPosition(valuesArrM22[2]);
        showShaftInfo(valuesArrM22[3]);
    } else resourcesBool = false;
    utilsM22.showHideJs(resourcesBool,"resourcesM22D");
}
// onchange
function populateResistanceM22(specNumber){
    const specList = document.getElementById("specificationM22");
    const resistanceList = document.getElementById("resistanceM22");
    let selectedValue =  specList.options[specList.selectedIndex].value;
    for(let j=resistanceList.options.length-1; j>=1; j--){
        resistanceList.remove(j);
    }
    let dropdownOptions = utilsM22.getDropDownValues(specNumber,"milType");
    if(dropdownOptions){
        for(let i=0; i<dropdownOptions.length; i++){
            let value = new Option(dropdownOptions[i],dropdownOptions[i]);
            resistanceList.options.add(value);
        }
    }
}
const populateShaftData = (function(){
    const shaftMountingList = document.getElementById("shaftMountingM22");
    let dropdownOptions = utilsM22.getDropDownValues("shaftDataArr","symbol");
    if(dropdownOptions){
        for(let i=0; i<dropdownOptions.length; i++){
            let value = new Option(dropdownOptions[i],dropdownOptions[i]);
            shaftMountingList.options.add(value);
        }
    }
})();
window.onload = populateShaftData;
function showPartNumbers(m22Object,specNumber,electricalPosition,shaftMounting){
    let milType = utilsM22.insert(specNumber + m22Object.milType, 6, "-");
    $("#showPartNumberM22").val(milType + electricalPosition + shaftMounting);
    $("#showRpNumberM22").val(utilsM22.insert(m22Object.rpNumber, 4, electricalPosition + shaftMounting));
}
function loadResources(specNumber){
    const specNumberNoDash = specNumber.replace("/","");
    let fancyboxPictureLink = `/fedcon/content/images/rheostats/${specNumberNoDash}.jpg`
    let specSheetLink = `/fedcon/content/specsheet/rheostats/${specNumberNoDash}.pdf`
    $("#fancyboxDiagramM22").attr('href', fancyboxPictureLink,true);
    $("#specSheetLinkM22").attr("href", specSheetLink);
}
function showElectricalData(m22Object) {
    const displayElectricalId = ["#showResistanceM22","#showAmperageM22"];
    let counter = 0;
    for(let i in m22Object){
        if(i==="milType"||i==="rpNumber") {
            ;
        } else $(displayElectricalId[counter++]).val(m22Object[i]);
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
    let m22Object = utilsM22.getObject("shaftDataArr",shaftMounting,"symbol");
    let counter = 0;
    for(let i in m22Object){
        if(i==="symbol") {
            ;//nop
        } else $(displayShaftID[counter++]).val(m22Object[i]);
    }//BADNEW;-)       
}   
const resetAppM22 = (function () {
    $("#specificationM22").change(function () {
        let resetDropDownVal = $("#specificationM22").val();
        if (resetDropDownVal == "") utilsM22.resetFedCon("formM22","resourcesM22D");
    });
    $("#resetM22").click(function () {
        utilsM22.resetFedCon("formM22","resourcesM22D");
    });
})();
window.onload = resetAppM22;



const utilsMetalFilmCaps = new Utils();
const globalJqueryMetalFilmCaps = new GlobalJquery();
const dropDownIdArrMetalFilmCaps = ["#inputType","#inputVoltage","#inputCapacitance","#inputTolerance",]
const elementIdArrMetalFilmCaps = ["#outputVoltage","#outputCapacitance","#outputTolerance", "#outputPartNumber"];
const dropDownValuesVoltageArrMetalFilmCaps = [
    ["625B/625C/625D/650B/650C/650D/652A/653A","A|A","B|B","C|C","D|D","E|E","F|F"],
    ["MC12","D|D","F|F","J|J"]
];

function validateConversionMetalFilmCapsApp() {
    let valuesArr = utilsMetalFilmCaps.getSelectedFields(dropDownIdArrMetalFilmCaps);
    selectedVoltageMetalFilmCaps(valuesArr[0],valuesArr[1]);
    let capacitanceInputTest = new RegExp(/^([0-9]{3})$/);
    if(capacitanceInputTest.test(valuesArr[2])==false){
        valuesArr[2]="";
    }
    else{
        selectedCapacitanceMetalFilmCaps(valuesArr[2]);
    }
    selectedToleranceMetalFilmCaps(valuesArr[3]);
    let fullPartNumber = utilsMetalFilmCaps.returnMetalFilmCapsPartNumber(valuesArr);
    $(elementIdArrMetalFilmCaps[3]).val(fullPartNumber);
    let itemLlink = utilsMetalFilmCaps.setProductLink(fullPartNumber,`FILM > METALLIZED POLYCARBONATE > ${(valuesArr[0]=="652A")? "RADIAL" : "AXIAL"}`);
    $("#productLinkMetalFilmCaps").attr("href", itemLlink);
    let showHideBool = (valuesArr.includes(" ")==false)? true : false;
    globalJqueryMetalFilmCaps.fadeInFadeOut(showHideBool,"#resourcesMetalFilmCaps");

}
function selectedTypeMetalFilmCaps(type){
    utilsMetalFilmCaps.resetDynamicDropDown(dropDownIdArrMetalFilmCaps[1]);
    if(type!=" "){
        utilsMetalFilmCaps.populateDropDown(type,dropDownIdArrMetalFilmCaps[1],dropDownValuesVoltageArrMetalFilmCaps);
    }    
}
function selectedVoltageMetalFilmCaps(type,voltage){    
    $(elementIdArrMetalFilmCaps[0]).val(utilsMetalFilmCaps.returnVoltage(type,voltage));
}
function selectedCapacitanceMetalFilmCaps(capacitance){
    $(elementIdArrMetalFilmCaps[1]).val(utilsMetalFilmCaps.threeDigitCodeCalculator(capacitance,-6,"pF","µf"));
}
function selectedToleranceMetalFilmCaps(tolerance){
    $(elementIdArrMetalFilmCaps[2]).val(utilsMetalFilmCaps.returnToleranceMetalFilmCaps(tolerance));
}

const pageLoadFunctions = (function(){
    globalJqueryMetalFilmCaps.hideElement("#resourcesMetalFilmCaps");
    $(dropDownIdArrMetalFilmCaps[0]).change(function(){
        if($(dropDownIdArrMetalFilmCaps[0]).val()==" ") $("#metalFilmCaps").trigger('reset');
    });
    $("#resetBtn").click(function(){
        globalJqueryMetalFilmCaps.hideElement("#resourcesMetalFilmCaps");
        $("#metalFilmCaps").trigger('reset');
    });
});
window.onload = pageLoadFunctions;

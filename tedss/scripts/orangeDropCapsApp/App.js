let utilsOrangeDropCaps = new Utils();
let globalJqueryOrangeDropCaps = new GlobalJquery();
let dropDownIdArrOrangeDropCaps = ["#inputType","#inputCapacitance","#inputTolerance","#inputVoltage","#inputCaseCode","#inputTerminal","#inputLeadLength"];
let elementIdArrOrangeDropCaps = ["#outputCapacitance","#outputTolerance","#outputVoltage","#outputPartNumber","#productLinkOrangeDropCaps","#terminalImgButton","#resourcesOrangeDropCaps"];
let terminalTableId = ["#caseLength","#terminalSpacing","#terminalLeadLength","#caseLengthVal","#terminalSpacingVal","#terminalLeadLengthVal"];
let dropDownValuesOrangeDropCaps = [
    ["418P/716P","0|0","9|9","5|5"],
    ["715P","9|9","5|5","2|2"],
];

$(function(){
    globalJqueryOrangeDropCaps.hideElement([elementIdArrOrangeDropCaps[6],terminalTableId[0],terminalTableId[1],terminalTableId[2]]);
});

function validateOrangeDropCapsApp(){
    let valuesArr = utilsOrangeDropCaps.getSelectedFields(dropDownIdArrOrangeDropCaps);
    let capacitanceInputTest = new RegExp(/^([0-9]{3})$/);
    if(capacitanceInputTest.test(valuesArr[1])==false){
        valuesArr[1]="";
    }
    else{
        selectedCapacitanceOrangeDropCaps(valuesArr[1]);
    }
    let voltageInputTest = (valuesArr[3].length==2)? new RegExp(/^([R]{1})([0-9]{1})$/) : new RegExp(/^([0-9]{1})$/);
    if(voltageInputTest.test(valuesArr[3])==false){
        valuesArr[3]="";
    }
    else{
        selectedVoltageOrangeDropCaps(valuesArr[3]);
    }
    selectedToleranceOrangeDropCaps(valuesArr[2]);
    selectedTerminalOrangeDropCaps(valuesArr[0],valuesArr[5]);
    terminalTableOrangeDropCaps(valuesArr[0],valuesArr[4],valuesArr[5],valuesArr[6]);
    let partNumber = valuesArr.join("");
    let linkCategory = (valuesArr[0]=="418P")? "FILM > POLYESTER > RADIAL" : "FILM > POLYPROPYLENE > RADIAL";
    $(elementIdArrOrangeDropCaps[3]).val(partNumber);
    $(elementIdArrOrangeDropCaps[4]).attr("href",utilsOrangeDropCaps.setProductLink(partNumber,linkCategory));
    let showHideBool = (valuesArr.includes(" ")==false && valuesArr[1]!=" " && valuesArr[3]!=" ")? true : false; 
    globalJqueryOrangeDropCaps.fadeInFadeOut(showHideBool,elementIdArrOrangeDropCaps[6]);
}
function resetOrangeDropCapsApp(){
    document.getElementById("orangeDropCapsApp").reset();
    globalJqueryOrangeDropCaps.fadeInFadeOut(false,elementIdArrOrangeDropCaps[6]);
    terminalTableOrangeDropCaps(" "," "," "," ",);
}
function selectedTypeOrangeDropCaps(type){
    utilsOrangeDropCaps.resetDynamicDropDown(dropDownIdArrOrangeDropCaps[2]);
    if(type==" "){
        resetOrangeDropCapsApp();
    }
    else{
        utilsOrangeDropCaps.populateDropDown(type,dropDownIdArrOrangeDropCaps[2],dropDownValuesOrangeDropCaps);
    }
}
function selectedCapacitanceOrangeDropCaps(capacitance){
    $(elementIdArrOrangeDropCaps[0]).val(utilsOrangeDropCaps.threeDigitCodeCalculator(capacitance,-6,"pF","µf"));
}
function selectedToleranceOrangeDropCaps(tolerance){
    $(elementIdArrOrangeDropCaps[1]).val(utilsOrangeDropCaps.returnToleranceOrangeDropCaps(tolerance));
}
function selectedVoltageOrangeDropCaps(voltage){
    $(elementIdArrOrangeDropCaps[2]).val(utilsOrangeDropCaps.calculateVoltage(voltage));
}
function selectedTerminalOrangeDropCaps(type,terminal){
    let picId = type + terminal;
    let link = "https://www.tedss.com/stock/Learnmore/orangeDropsTerminals/"
    $(elementIdArrOrangeDropCaps[5]).attr("href",utilsOrangeDropCaps.getItemFromDirectory(link,picId,".jpg",false));
}
function terminalTableOrangeDropCaps(type,caseCode,terminal,leadLength){
    let terminalData;
    let objectProperty;
    if(type!=" " && caseCode!=" "){
        terminalData = utilsOrangeDropCaps.getDataFromStorage("orangeDropTerminalArr",type+caseCode,"typeCaseCode");
        $(terminalTableId[3]).text(terminalData.length);
        globalJqueryOrangeDropCaps.fadeInFadeOut(true,terminalTableId[0]);
        if(terminal!=" "){
            objectProperty = "terminal"+terminal;
            $(terminalTableId[4]).text(terminalData[objectProperty]);
            globalJqueryOrangeDropCaps.fadeInFadeOut(true,terminalTableId[1]);
        }
        else{
            globalJqueryOrangeDropCaps.fadeInFadeOut(false,terminalTableId[1]);
        }
        if(leadLength!=" "){
            $(terminalTableId[5]).text(utilsOrangeDropCaps.returnLeadLength(leadLength));
            globalJqueryOrangeDropCaps.fadeInFadeOut(true,terminalTableId[2]);
        }
        else{
            globalJqueryOrangeDropCaps.fadeInFadeOut(false,terminalTableId[2]);
        }
    }
    else{
        globalJqueryOrangeDropCaps.fadeInFadeOut(false,[terminalTableId[0],terminalTableId[1],terminalTableId[2]]);
    }
}
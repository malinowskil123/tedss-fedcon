let utilsM39015 = new Utils();
let globalJqueryM39015 = new GlobalJquery();
let dropDownIdArrM39015 = ["#inputM1","#inputT1","#inputR1","#inputF1",]
let htmlElementsIdM39015 = ["#outputRTR","#outputRT","#viewTerminalM39015", "#outputR1","#outputT1","#outputF1","#resourcesM39015","#productLinkM39015RT", "#productLinkM39015RTR"];
let dropDownValuesTerminalArrM39015 = [
    ["RTR22","L|L","P|P","W|W","X|X"],
    ["RTR24","P|P","W|W","X|X"]
];
let dropDownValuesResistanceArrM39015 = [
    ["RTR22","501|003","102|004","202|005","502|006","103|007","203|008"],
    ["RTR24","501|006","102|007","202|008","502|009","103|101"],
];

function validateConversionM39015App() {
    let valueArr = utilsM39015.getSelectedFields(dropDownIdArrM39015);
    $(htmlElementsIdM39015[1]).val(utilsM39015.returnRtRtrPartNumber(valueArr));    
    selectedTerminalM39015(valueArr[0],valueArr[1]);
    selectedResistanceRtrRjrM39015(valueArr[2]);
    selectedFailureRateRtrRjrM39015(valueArr[3]);
    let showHideBoolConversionApp = (valueArr.includes(" ")==false)? true : false;
    globalJqueryM39015.fadeInFadeOut(showHideBoolConversionApp,htmlElementsIdM39015[6]);
    $(htmlElementsIdM39015[0]).val(utilsM39015.returnRtRtrPartNumber(valueArr));
    $(htmlElementsIdM39015[8]).attr("href", utilsM39015.setProductLink(utilsM39015.returnRtRtrPartNumber(valueArr,"TRIMPOT")));
    valueArr[0] = valueArr[0].replace("RTR","RT");
    valueArr.pop();
    $(htmlElementsIdM39015[1]).val(utilsM39015.returnRtRtrPartNumber(valueArr));
    $(htmlElementsIdM39015[7]).attr("href", utilsM39015.setProductLink(utilsM39015.returnRtRtrPartNumber(valueArr),"TRIMPOT"));
}
function resetConversionM39015App(){
    document.getElementById("M39015").reset();
    globalJqueryM39015.fadeInFadeOut(false,htmlElementsIdM39015[6]);
}
function selectedMilDesignationM39015(style){
    utilsM39015.resetDynamicDropDown(dropDownIdArrM39015[1]);
    utilsM39015.resetDynamicDropDown(dropDownIdArrM39015[2]);
    if(style==" "){
        resetConversionM39015App();
    }
    else{
        utilsM39015.populateDropDown(style,dropDownIdArrM39015[1],dropDownValuesTerminalArrM39015);
        utilsM39015.populateDropDown(style,dropDownIdArrM39015[2],dropDownValuesResistanceArrM39015);
    }
}
function selectedTerminalM39015(style,terminal){    
    let link = "https://www.tedss.com/stock/Learnmore/rt-rj-trimpots/"
    $(htmlElementsIdM39015[2]).attr("href",utilsM39015.getItemFromDirectory(link,utilsM39015.insert(style+terminal,5,"D"),".png",true));
    $(htmlElementsIdM39015[4]).val(utilsM39015.returnTerminal(terminal));
}
function selectedResistanceRtrRjrM39015(resistance){
    $(htmlElementsIdM39015[3]).val(utilsM39015.threeDigitCodeCalculator(resistance,-3,"Ω","KΩ"));
}
function selectedFailureRateRtrRjrM39015(failureRate){
    $(htmlElementsIdM39015[5]).val(utilsM39015.returnFailureRate(failureRate));
}

let utilsRtrRjr = new Utils();
let globalJqueryRtrRjr = new GlobalJquery();
let dropDownIdRtrRjr = ["#inputStyle","#inputTerminal","#inputResistance","#inputFailureRate"]
let htmlElementsIdRtrRjr = ["#resourcesRtrRjr","#outputCharacteristic","#outputResistance","#outputFailureRate","#outputPartNumber","#failureRateGroup","#productLinkRtrRjr","#viewTerminalRtrRjr"];
let dropDownValuesRtrRjr = [
    ["RT12","L|L","P|P","Y|Y"],
    ["RT22/RTR22/RJ22/RJ24/RJR24","P|P","W|W","X|X","L|L"],
    ["RT24/RTR24","X|X","P|P","W|W"],
    ["RT26","X|X","W|W"],
    ["RJ12","P|P","Y|Y"],
    ["RJ26/RJR26","P|P","W|W","X|X","A|A","B|B"],
    ["RJ50/RJR50","P|P"]
];

$(function(){
    globalJqueryM39015.hideElement(htmlElementsIdM39015[6]);
    globalJqueryRtrRjr.hideElement([htmlElementsIdRtrRjr[0],htmlElementsIdRtrRjr[5]]);
});

function validateRtrRjr(){
    let valuesArr = utilsRtrRjr.getSelectedFields(dropDownIdRtrRjr);
    let resistanceInputTest = new RegExp(/^([0-9]{3})$/);
    let showHideBoolFailureRate;
    let showHideBoolResources;
    if(resistanceInputTest.test(valuesArr[2])==false){
        valuesArr[2]="";
    }
    else{
        selectedResistanceRtrRjr(valuesArr[2]);
    }
    let checkStyle = valuesArr[0].substring(0,3);
    if(checkStyle=="RTR"||checkStyle=="RJR"){
        showHideBoolFailureRate = true;
        if(valuesArr.includes(" ")==false&&valuesArr[2]!=""){
            showHideBoolResources = true;

        }
        else{
            showHideBoolResources = false;
        }
    }
    else{
        showHideBoolFailureRate = false;
        valuesArr.pop();
        if(valuesArr.includes(" ")==false&&valuesArr[2]!=""){
            showHideBoolResources = true;
        }
        else{
            showHideBoolResources = false;

        }
    }
    globalJqueryRtrRjr.fadeInFadeOut(showHideBoolFailureRate,htmlElementsIdRtrRjr[5]);
    globalJqueryRtrRjr.fadeInFadeOut(showHideBoolResources,htmlElementsIdRtrRjr[0]);
    selectedTerminalRtrRjr(valuesArr);
    selectedFailureRateRtrRjr(valuesArr[0],valuesArr[3]);
    $(htmlElementsIdRtrRjr[4]).val(utilsRtrRjr.returnRtRtrPartNumber(valuesArr));
    $(htmlElementsIdRtrRjr[6]).attr("href",utilsRtrRjr.setProductLink(utilsRtrRjr.returnRtRtrPartNumber(valuesArr),"TRIMPOT"))
}
function resetRtrRjr(){
    document.getElementById("RtrRjr").reset();
    globalJqueryRtrRjr.fadeInFadeOut(false,[htmlElementsIdRtrRjr[0],htmlElementsIdRtrRjr[5]]);
}
function selectedStyleRtrRjr(style){
    utilsRtrRjr.resetDynamicDropDown(dropDownIdRtrRjr[1]);
    if(style==" "){
        resetRtrRjr();
    }
    else{
        $(htmlElementsIdRtrRjr[1]).val(utilsRtrRjr.showCharacteristic(style));
        utilsRtrRjr.populateDropDown(style,dropDownIdRtrRjr[1],dropDownValuesRtrRjr);
    }
}
function selectedTerminalRtrRjr(partNumber){
    let link = "https://www.tedss.com/stock/Learnmore/rt-rj-trimpots/"
    let regexRJ = new RegExp(/\b(\w*RJ[0-9]\w*)\b/g);
    let checkStyle = partNumber[0].substring(0,3);
    let imgID = utilsRtrRjr.returnRtRtrPartNumber(partNumber);
    imgID = (regexRJ.test(checkStyle))?imgID.substring(0,6):imgID.substring(0,7);
    $(htmlElementsIdRtrRjr[7]).attr("href",utilsRtrRjr.getItemFromDirectory(link,imgID,".png",true));
}
function selectedResistanceRtrRjr(resistance){
    $(htmlElementsIdRtrRjr[2]).val(utilsRtrRjr.threeDigitCodeCalculator(resistance,-3,"Ω","KΩ"))
}
function selectedFailureRateRtrRjr(style,failureRate){
    let failureRateText;
    let condition = style.charAt(2);
    ($.isNumeric(condition)==true) ? failureRateText = utilsRtrRjr.returnFailureRate("M") : failureRateText =utilsRtrRjr.returnFailureRate(failureRate);
    $(htmlElementsIdRtrRjr[3]).val(failureRateText);
}
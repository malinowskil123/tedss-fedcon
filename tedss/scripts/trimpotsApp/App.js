const utils = new Utils();
function validate(){
    const dropDownId = ["#style","#terminal","#resistance","#failureRate"];
    let valuesArr = utils.getSelectedFields(dropDownId);
    if(!hideFailureRate(valuesArr[0]))valuesArr[3]=null;
    let displayBool;
    if(valuesArr.includes("")===false){
        let resistanceInputValidation = validateResistance(valuesArr[0],valuesArr[2]);
        if(resistanceInputValidation===false) {
            valuesArr[2]=""
            displayBool = false;
        } else {
            displayData(valuesArr);
            displayBool = true;
        }
    } else displayBool = false;
    utils.showHideJquery(displayBool,"#resources");
}
//onchange
function populateResistance() {
    const terminals = {};
        terminals["RT12"] = ["L","P","Y"];
        terminals["RT22"] = ["P","W","X","L"];
        terminals["RTR22"] = ["P","W","X","L"];
        terminals["RJ22"] = ["P","W","X","L"];
        terminals["RJ24"] = ["P","W","X","L"];
        terminals["RJR24"] = ["P","W","X","L"];
        terminals["RT24"] = ["X","P","W"];
        terminals["RTR24"] = ["X","P","W"];
        terminals["RT26"] = ["X","W"];
        terminals["RJ12"] = ["P","Y"];
        terminals["RJ26"] = ["P","W","X","A","B"];
        terminals["RJR26"] = ["P","W","X","A","B"];
        terminals["RJ50"] = ["P"];
        terminals["RJR50"] = ["P"];
    const styleList = document.getElementById("style");
    const terminalList = document.getElementById("terminal");
    let selectedValue =  styleList.options[styleList.selectedIndex].value;
    for(let j=terminalList.options.length-1; j>=1; j--){
        terminalList.remove(j);
    }
    let dropdownOptions = terminals[selectedValue];
    if(dropdownOptions){
        for(let i=0; i<dropdownOptions.length; i++){
            let value = new Option(dropdownOptions[i],dropdownOptions[i]);
            terminalList.options.add(value);
        }
    }
}
function validateResistance(style,resistance){
    style = (style.substring(0,2)==="RJ")? style ="RJ" : style;
    let resistanceCheck = checkResistanceTable(style,resistance);
    if(resistanceCheck===false){
        (function(){
            utils.showHideJquery(true,"#popup");
            $("#popupText").text(function(){return (resistance.length>3)? "Resistance Code Too Long!" : `Incorrect Resistance Code "${resistance}"`;});
            $("#popupImg").attr("src",function(){
                let displayBool = (resistance.length>3)? false : true;
                utils.showHideJquery(displayBool,"#popupImg");
                return `/tedss/content/images/trimPots/resistanceTables/resistance${style}.png`;
            });
            $('body').css("overflow","hidden");
            const popupArea = document.getElementById("popup");
            $(window).click(function(event){
                if(event.target==popupArea) {
                    utils.showHideJquery(false,"#popup")
                    $('body').css("overflow","visible");
                }
            });
        })();
        return false
    } else return true;
}
function checkResistanceTable(style,resistance){
    const resistanceTable = {};
    resistanceTable["RT12"] = ["100","200","500","101","201","501","102","202","502","103","203"];
    resistanceTable["RT22"] = ["500","101","201","501","102","202","502","103","203"];
    resistanceTable["RTR22"] = ["501","102","202","502","103","203"];
    resistanceTable["RT24"] = ["100","200","500","101","201","501","102","202","502","103"];
    resistanceTable["RTR24"] = ["501","102","202","502","103"];
    resistanceTable["RT26"] = ["100","200","500","101","201","501","102","202","502"];
    resistanceTable["RJ"] = ["100","200","500","101","201","501","102","202","502","103","253","503","104","204","254","504","105"];
    return resistanceTable[style].includes(resistance);
}
function hideFailureRate(style){
    const divId = ["#divStyle","#divTerminal","#divResistance","#divFailureRate"];
    const styleRegEx = new RegExp(/(R[T,J][\d]{2})/);
    if(styleRegEx.test(style))utils.showHideJs(false,"divFailureRate");
    else utils.showHideJquery(true,"#divFailureRate");
    (function(){
        for(let i=0; i<divId.length-1; i++){
            let remove = (styleRegEx.test(style))? "col-md-3":"col-md-4";
            let add = (styleRegEx.test(style))? "col-md-4":"col-md-3";
            if($(divId[i]).attr("class")!=add){
                $(divId[i]).removeClass(remove); 
                $(divId[i]).addClass(add); 
            }
        }  
    })();
    return (styleRegEx.test(style))? false : true;       
}
function hideAlternatePn(partNumber){
    const divId = ["#divCharacteristic","#divAlternatePartNumber"];
    let displayBool = (partNumber===null)? false:true;
    utils.showHideJquery(displayBool,"#divAlternatePartNumber");
    (function(){
        for(let i=0; i<divId.length-1; i++){
            let remove = (partNumber===null)? "col-md-6":"col-md-6 col-md-offset-3";
            let add = (partNumber===null)? "col-md-6 col-md-offset-3":"col-md-6";
            if($(divId[i]).attr("class")!=add){
                $(divId[i]).removeClass(remove); 
                $(divId[i]).addClass(add);  
            }
        }  
    })();
}
function displayData(valuesArr){
    if(!valuesArr.includes("")){
        let partNumber = returnPartNumber(valuesArr.join(""));;
        $("#showPartNumber").val(partNumber);
        $("#showCharacteristic").val(showCharacteristic(partNumber));
        $("#showResistance").val(utils.threeDigitCodeCalculator(valuesArr[2],-3,"Ω","KΩ"));
        $("#showFailureRate").val(returnFailureRate(partNumber));
        let partNumberM39015 = convertToM39015(valuesArr);
        hideAlternatePn(partNumberM39015);
        if(partNumberM39015!==null) $("#showM39015").val(partNumberM39015);
        loadResources(valuesArr[0],partNumber);
    }
}
function loadResources(style,partNumber){
    $("#terminalDiagram").attr('href',function(){
        const rjRegEx = new RegExp(/(RJ[\d]{2})/);    
        partNumber = (rjRegEx.test(style))? partNumber.substring(0,6): partNumber.substring(0,7);
        return `/tedss/content/images/trimPots/terminals/${partNumber}.png`;
    });
    $("#specSheetLink").attr("href", function(){
        style = (style.substring(2,3)==="R")? utils.remove(style,3) : style;
        return `/tedss/content/specsheet/trimPots/${style}.pdf`;
    });
}
const resetAppTrimPot = (function () {
    $("#style").change(function () {
        if ($("#style").val()==="") utils.resetTedss("form","#resources");
    });
    $("#resetButton").click(function () {
        hideFailureRate("");
        utils.resetTedss("form","#resources");
    });
})();
window.onload = resetAppTrimPot;
const enablePopover = (function (){
    $('[data-toggle="popover"]').popover()
});
window.onload = enablePopover;
function returnPartNumber(partNumber){
    const styleRegEx = new RegExp(/(R[T,J][\d]{2})/);
    let characteristic;
    if(styleRegEx.test(partNumber.substring(0,4))){
        characteristic = (partNumber.substring(1,2)==="T")? "C2" : "F";
        partNumber = utils.insert(partNumber,4,characteristic);
    } else{
        characteristic = (partNumber.substring(0,3)==="RTR")? "D" : "F";
        partNumber = utils.insert(partNumber,5,characteristic);
    } return partNumber;
}
function showCharacteristic(partNumber){
    if(partNumber.includes("D")) return "D = ±50ppm/°C Temp. Coeff. Max.";
    else if(partNumber.includes("C2")) return "C = ±50ppm/°C Temp. Coeff. Max. 2 = 85°C-150°C Operating Temp.";
    else return "F = ±100ppm/°C Temp. Coeff. Max.";
}
function returnFailureRate(partNumber){
    let failureRate = partNumber.substring(partNumber.length-1);
    switch(failureRate){
        case "M" : failureRate +=" = 1.0%";
        break;
        case "P" : failureRate += " = 0.1%";
        break;
        case "R" : failureRate += " = 0.01%";
        break;
        default: failureRate = "1.0%";
        break;
    }
    return failureRate;
}
function convertToM39015(valuesArr){
    const resistanceTable = {};
        resistanceTable["RT22"] = [["501","003"],["102","004"],["202","005"],["502","006"],["103","007"],["203","008"]];
        resistanceTable["RTR22"] = [["501","003"],["102","004"],["202","005"],["502","006"],["103","007"],["203","008"]];
        resistanceTable["RT24"] = [["501","006"],["102","007"],["202","008"],["502","009"],["103","101"]];
        resistanceTable["RTR24"] = [["501","006"],["102","007"],["202","008"],["502","009"],["103","101"]];
    let resistance = (function(){
        let tempArr = resistanceTable[valuesArr[0]];
        if(tempArr===undefined) return undefined;
        for(let i=0; i<tempArr.length; i++){
            if(tempArr[i][0]==valuesArr[2]) return tempArr[i][1];
        }
    })();
    const styleRegEx = new RegExp(/(RT|RTR)([22,24]{2})/);
    if(styleRegEx.test(valuesArr[0])&&resistance!==undefined){
        let specNumber = (valuesArr[0].includes("22"))? "2" : "3"; 
        let failureRate = (valuesArr[3]===null)? "M" : valuesArr[3];
        return `M39015/${specNumber}-${resistance}${valuesArr[1]}${failureRate}`;
    } else return null;
}
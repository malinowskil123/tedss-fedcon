const utilsM39015 = new Utils();
function validateM39015(){
    const dropDownId = ["#style","#terminal","#resistance","#failureRate"];
    let valuesArr = utilsM39015.getSelectedFields(dropDownId);
    validateResistance(valuesArr[2]);
    if(!hideFailureRate(valuesArr[0]))valuesArr[3]=null;
    displayData(valuesArr);
    let displayBool = (valuesArr.includes(""))? false : true;
    utilsM39015.showHideJs(displayBool,"resources");
}
//onchange
function populateResistanceM39015() {
    let terminals = {};
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
function validateResistance(resistance){
    const resistanceInputTest = new RegExp(/^([\d]{3})$/);
    // resistance!=="" don't trigger on empty string
    // add condition if code not part of table show popup
    if(resistanceInputTest.test(resistance)!==true&&resistance!==""){
        (function(){
            utilsM39015.showHideJs(true,"popup");
            // add function to change resistance table img
            let msg = (resistance.length>3)? "Resistance Code Too Long!" : `Incorrect Resistance Code "${resistance}"`;
            $("#popupText").text(msg);
            $('body').css("overflow","hidden");
            const popupArea = document.getElementById("popup");
            $(window).click(function(event){
                if(event.target==popupArea) {
                    utilsM39015.showHideJs(false,"popup")
                    $('body').css("overflow","visible");
                }
            });
        })();
        $("#resistance").val("");
    }
}
function hideFailureRate(style){
    const divId = ["#divStyle","#divTerminal","#divResistance","#divFailureRate"];
    const styleRegEx = new RegExp(/(R[T,J][\d]{2})/);
    let displayBool = (styleRegEx.test(style))? false:true;
    utilsM39015.showHideJs(displayBool,"divFailureRate","block");
    (function(){
        for(let i=0; i<divId.length-1; i++){
            let remove = (styleRegEx.test(style))? "col-md-3":"col-md-4";
            let add = (styleRegEx.test(style))? "col-md-4":"col-md-3";
            if($(divId[i]).attr("class")!=add){
                $(divId[i]).removeClass(remove); 
                $(divId[i]).toggleClass(add); 
            }
        }  
    })();
    return displayBool;       
}
function hideAlternatePn(partNumber){
    const divId = ["#divCharacteristic","#divAlternatePartNumber"];
    let displayBool = (partNumber===null)? false:true;
    utilsM39015.showHideJs(displayBool,"divAlternatePartNumber","block");
    (function(){
        for(let i=0; i<divId.length-1; i++){
            let remove = (partNumber===null)? "col-md-6":"col-md-6 col-md-offset-3";
            let add = (partNumber===null)? "col-md-6 col-md-offset-3":"col-md-6";
            if($(divId[i]).attr("class")!=add){
                $(divId[i]).removeClass(remove); 
                $(divId[i]).toggleClass(add); 
            }
        }  
    })();
}
function displayData(valuesArr){
    if(!valuesArr.includes("")){
        let partNumber = returnPartNumber(valuesArr.join(""));;
        $("#showPartNumber").val(partNumber);
        $("#showCharacteristic").val(showCharacteristic(partNumber));
        $("#showResistance").val(utilsM39015.threeDigitCodeCalculator(valuesArr[2],-3,"Ω","KΩ"));
        $("#showFailureRate").val(returnFailureRate(partNumber));
        let partNumberM39015 = convertToM39015(valuesArr);
        hideAlternatePn(partNumberM39015);
        if(partNumberM39015!==null) $("#showM39015").val(partNumberM39015);
        loadResources(valuesArr[0],partNumber);
    }
}
function loadResources(style,partNumber){
    const rjRegEx = new RegExp(/(RJ[\d]{2})/);    
    partNumber = (rjRegEx.test(style))? partNumber.substring(0,6): partNumber.substring(0,7);
    let terminalDiagram = `/fedcon/content/images/trimPots/terminals/${partNumber}.png`;
    $("#terminalDiagram").attr('href',terminalDiagram);
    const styleRegEx = new RegExp(/(R[T,J][\d]{2})/);    
    if(styleRegEx.test(style)) style = utilsM39015.insert(style,2,"R");
    let specSheetLink = `/fedcon/content/specsheet/trimPots/${style}.pdf`;
    $("#specSheetLink").attr("href", specSheetLink);
}
const resetAppTrimPot = (function () {
    $("#style").change(function () {
        if ($("#style").val()==="") utilsM39015.resetFedCon("form","resources");
    });
    $("#resetButton").click(function () {
        hideFailureRate("");
        utilsM39015.resetFedCon("form","resources");
    });
})();
window.onload = resetAppTrimPot;
function returnPartNumber(partNumber){
    const styleRegEx = new RegExp(/(R[T,J][\d]{2})/);
    let characteristic;
    if(styleRegEx.test(partNumber.substring(0,4))){
        characteristic = (partNumber.substring(1,2)==="T")? "C2" : "F";
        partNumber = utilsM39015.insert(partNumber,4,characteristic);
    } else{
        characteristic = (partNumber.substring(0,3)==="RTR")? "D" : "F";
        partNumber = utilsM39015.insert(partNumber,5,characteristic);
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
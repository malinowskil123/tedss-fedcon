let utils = new Utils();
function validate(){
    const dropDownIdArrOrangeDropCaps = ["#inputType","#inputCapacitance","#inputTolerance","#inputVoltage","#inputCaseCode","#inputTerminal","#inputLeadLength"];
    const dropDownValues = utils.getSelectedFields(dropDownIdArrOrangeDropCaps);
    let displayBool;
    let capacitance = utils.roundValue("farads",utils.threeDigitCodeCalculator(dropDownValues[1]),-6,4);
    let testCapObj;
    if(dropDownValues[1]!=="") {
        testCapObj = checkCapacitanceTable(dropDownValues[0],dropDownValues[3],capacitance);
        showInvalidCapMsg(dropDownValues[1],testCapObj);
    }
    if(!dropDownValues.includes("")&&testCapObj.contains){
        dropDownValues[1] = capacitance;
        loadData(dropDownValues);
        loadTerminal(dropDownValues[0],dropDownValues[5]);
        displayBool = true;
    } else displayBool = false;
    utils.showHideJquery(displayBool,"#resources");
}
function loadToleranceDropDown(){
    const tolerance = {};
        tolerance["default"] = ["0","5","9"];
        tolerance["715P"] = ["2","9","5"];
    const defaultType = ["418P","716P"];
    const typeList = document.getElementById("inputType");
    const toleranceList = document.getElementById("inputTolerance");
    let selectedValue = (defaultType.includes(typeList.options[typeList.selectedIndex].value))
        ? "default"
        : "715P";
    for(let j=toleranceList.options.length-1; j>=1; j--){
        toleranceList.remove(j);
    }
    let dropdownOptions = tolerance[selectedValue];
    if(dropdownOptions){
        for(let i=0; i<dropdownOptions.length; i++){
            let value = new Option(dropdownOptions[i],dropdownOptions[i]);
            toleranceList.options.add(value);
        }
    }
}
function loadVoltageDropDown(){
    const tolerance = {};
        tolerance["default"] = ["200","400","600","800","1200","1600"];
        tolerance["418P"] = ["100","200","400","600","1000"];
    const defaultType = ["715P","716P"];
    const typeList = document.getElementById("inputType");
    const toleranceList = document.getElementById("inputVoltage");
    let selectedValue = (defaultType.includes(typeList.options[typeList.selectedIndex].value))
        ? "default"
        : "418P";
    for(let j=toleranceList.options.length-1; j>=1; j--){
        toleranceList.remove(j);
    }
    let dropdownOptions = tolerance[selectedValue];
    if(dropdownOptions){
        for(let i=0; i<dropdownOptions.length; i++){
            let value = new Option(dropdownOptions[i],dropdownOptions[i]);
            toleranceList.options.add(value);
        }
    }
}
function showInvalidCapMsg(capacitanceCode,testCapObj){
    if(!testCapObj.contains){
        (function(){
            utils.showHideJquery(true,"#popup");
            $("#popupText").text(function(){
                return (capacitanceCode.substring(0,1)==="0") ? "Capacitance Code Can't Start With 0" : testCapObj.msg;
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
    }
}
function checkCapacitanceTable(type,voltage,capacitance){
    const capacitanceTable = {
        "418P" : {
            "100" : [0.027,.033,.047,.082,.1,.15,.22,.33,.47,.68,.082,1.0],
            "200" : [.0056,.0068,.01,.015,.018,.022,.033,.039,.047,.056,.068,.082,.1,.15,.22,.27,.33,.47],
            "400" : [.001,.0015,.0022,.0033,.0047,.0068,.0082,.01,.015,.018,.022,.033,.047,.056,.068,.082,.1,.15,.18,.22,.27,.33,.39,.47],
            "600" : [.001,.0012,.0015,.0018,.0022,.0027,.0033,.0039,.0047,.0056,.0068,.0082,.01,.12,.18,.22,.25],
            "1000" : [.001,.0015,.0018,.0022,.0033,.0047,.0056,.0068,.0082,.01,.015,.018,.022,.027,.033,.039,.047,.056,.068,.082,.1]
        },
        "715P" : {
            "200" : [.012,.015,.018,.022,.027,.033,.039,.047,.056,.068,.082,.10,.12,.15,.18,.22,.27,.33,.39,.47,.56,.68,.82,1.0],
            "400" : [.0039,.0047,.0056,.0068,.0082,.01,.012,.015,.018,.022,.027,.033,.039,.047,.056,.068,.082,.1,.12,.15,.18,.22,.27,.33,.39,.47],
            "600" : [.001,.0012,.0015,.0018,.0022,.0027,.0033,.0039,.0047,.0056,.0068,.0082,.01,.012,.015,.018,.022,.027,.033,.039,.047,.056,.068,.082,.1,.12,.15,.18,.22],
            "800" : [.0056,.0068,.0082,.01,.012,.015,.018,.022,.027,.033,.039,.047,.056,.068,.082,.1],
            "1200" : [.0027,.0033,.0039,.0047,.0056,.0068,.0082,.01,.012,.015,.018,.022,.027,.033,.039,.047],
            "1600" : [.0018,.0022,.0027,.0033,.0039,.0047,.0056,.0068,.0082,.01,.012,.015,.018,.022,.027,.033]
        },
        "716P" : {
            "200" : [.01,.012,.015,.018,.022,.027,.033,.039,.047,.056,.068,.082,.10,.12,.15,.18,.22,.27,.33,.39,.47,.56,.68,.82,1.0],
            "400" : [.0039,.0047,.0056,.0068,.0082,.01,.012,.015,.018,.022,.027,.033,.039,.047,.056,.068,.082,.10,.12,.15,.18,.22,.27,.33,.39,.47],
            "600" : [.001,.0012,.0015,.0018,.0022,.0027,.0033,.0039,.0047,.0056,.0068,.0082,.01,.012,.015,.018,.022,.027,.033,.039,.047,.056,.068,.082,.10,.12,.15,.18,.22],
            "800" : [.0056,.0068,.0082,.01,.012,.015,.018,.022,.027,.033,.039,.047,.056,.068,.082,.10,.12,.14],
            "1200" : [.0027,.0033,.0039,.0047,.0056,.0068,.0082,.01,.012,.015,.018,.022,.027,.033,.039,.047,.056],
            "1600" : [.001,.0012,.0015,.0018,.0022,.0027,.0033,.0039,.0047,.0056,.0068,.0082,.01,.012,.015,.018,.022,.027,.033]
        }
    };
    let tokenArr = capacitanceTable[type][voltage];
    let containsBool = tokenArr.includes(parseFloat(capacitance));
    let invalidValMsg = `Valid capacitance range ${Math.min.apply(Math,tokenArr)}µf - ${Math.max.apply(Math,tokenArr)}µf for ${type} type at ${voltage}VDC`;
    let obj = {
        contains : containsBool,
        msg : (!containsBool)? invalidValMsg : "",
    };
    return obj;
}
function loadData(dropDownValues){
    const elementID = ["#outputCapacitance","#outputTolerance","#outputVoltage","#outputLeadLength","#outputPartNumber"];
   
    const obj = {
        capacitance: dropDownValues[1],
        tolerance : (function(){return returnTolerance(dropDownValues[2])})(),
        voltage :  dropDownValues[3]+"VDC",
        leadLength : (function(){return returnLeadLength(dropDownValues[6])})(),
        partNumber : (function(){
            dropDownValues[3] = (dropDownValues[3].length===4)? dropDownValues[3].substring(0,2) : dropDownValues[3].substring(0,1);
            return dropDownValues.join("");
        })()
    }
    let returnData = Object.values(obj);
    for(let i=0; i<returnData.length; i++){
        $(elementID[i]).val(returnData[i])
    }
}
function loadTerminal(type,terminal){
    $("#terminal").attr("href",function(){
        return `/tedss/content/images/orangeDropCaps/terminals/${type+terminal}.jpg`
    });
}
const enablePopover = (function (){
    $('[data-toggle="popover"]').popover()
})();
window.onload = enablePopover;
const reset = (function(){
    $("#inputType").change(function(){
        let resetDropDownVal = $("#inputType").val();
        if(resetDropDownVal==="") utils.resetTedss("#orangeDropApp","#resources");
    });
    $("#resetApp").click(function(){
        utils.resetTedss("#orangeDropApp","#resources");
    });
})();
window.onload = reset;
function returnTolerance(tolerance){
    switch(tolerance){
        case "0": tolerance += " = ±20%" ;
        break;
        case "9": tolerance += " = ±10%" ;
        break;
        case "5": tolerance += " = ±5%" ;
        break;
        case "2": tolerance += " = ±2%" ;
        break;
    } return tolerance;
}
function returnLeadLength(leadLength){
    switch(leadLength){
        case "3": leadLength = " 1.250[31.750]";
        break; 
        case "2": leadLength = " 0.250[6.350]";
        break;
        case "1": leadLength = " 0.187[4.750]";
        break;
    } return leadLength;
}
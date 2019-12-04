const picoUtils = new Utils();
function validate(){
    const dropdownId = ["#series","#ampCode"];
    let valuesArr = picoUtils.getSelectedFields(dropdownId);
    let displayBool;
    if(valuesArr.includes("")!=true){
        let littelFuseData = picoUtils.getObject(valuesArr[0],valuesArr[1],"ampCode");
        displayTechnicalData(littelFuseData);
        displayRating(littelFuseData);
        displayAlternatePn(littelFuseData,valuesArr.join(""));
        showHideDataSheetOptions();
        loadTerminalImg(valuesArr[0]);
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
function displayTechnicalData(littelFuseData){
    const tableId = ["#amperageRating","#maxVoltage","#interruptingRating","#action","#application"];
    let counter = 0;
    for(let i in littelFuseData){
        if(i==="amperageRating"||i==="maxVoltage"||i==="interruptingRating"||i==="action"||i==="application") {
            if(i==="amperageRating") $(tableId[counter++]).text(littelFuseData[i]+"A");
            else if(i==="maxVoltage") $(tableId[counter++]).text(littelFuseData[i]+"V")
            else $(tableId[counter++]).text(littelFuseData[i]);
        } else ;
    }  
}
function displayRating(littelFuseData){
    const tableId = ["#rcLogo","#csaLogo","#pseLogo"];
    let counter = 0;
    for(let i in littelFuseData){
        if(i==="rcRating"||i==="csaRating"||i==="pseRating"){
            if(littelFuseData[i]===false) $(tableId[counter++]).hide("slow");
            if(littelFuseData[i]===true) $(tableId[counter++]).show("fast");
        } else ;
    }  
}
function displayAlternatePn(littelFuseData,littelFusePn){
    if(littelFuseData!==null){
        $("#littelfusePn").val(littelFusePn);
        const obj = {
            belfuse:(function(){return belfuseConversion(littelFuseData);})(),
            bussmann:(function(){return bussmannConversion(littelFuseData);})(),
            divID : ["#divBelfuse","#divBussmann"],
            labelID : ["#belfusePnLabel","#bussmannPnLabel"],
            alternatePnID : ["#belfusePn","#bussmannPn"]
        };
        const alternatePN = Object.values(obj);
        for(let i=0; i<obj.divID.length; i++){
            let displayBoolPN,displayBoolQPL;
            const displayBool =[ displayBoolPN = (alternatePN[i]===null)? false : true,displayBoolQPL = (littelFuseData.application!=="military")? false : true];
            const displayID = [obj.divID,obj.labelID]
            for(let j=0; j<displayBool.length; j++) picoUtils.showHideJquery(displayBool[j],displayID[j][i]);
            $(obj.alternatePnID[i]).val(alternatePN[i]);
        }
    }
}
// datasheet-------------------------
function loadDataSheet(manufacturer){
    const pnArr = [$("#littelfusePn").val(),$("#belfusePn").val(),$("#bussmannPn").val()];
    $("#dataSheet").attr("href",function(){
        if(manufacturer===""&&pnArr[1]===""&&pnArr[2]===""){
            activateLink();
            return getDataSheetPath("littelfuse",pnArr);
        } else if(manufacturer===""){
            popupDataSheetValidation();
            return deactivateLink();
        } else {
            activateLink();
            return getDataSheetPath(manufacturer,pnArr);
        }
    });
}
function activateLink(){$("#dataSheet").attr("target","_blank");}
function deactivateLink(){
    $("#dataSheet").attr("target","_self");
    return "javascript:void(0);";
}
function showHideDataSheetOptions(){
    const pnArr = [$("#belfusePn").val(),$("#bussmannPn").val()];
    const optionsId = ["#belfuseOption","#bussmannOption"];
    let displayBool;
    for(let i=0;i<pnArr.length;i++){
        if(pnArr[i]==="") displayBool=false;
        else displayBool=true;
        picoUtils.showHideJquery(displayBool,optionsId[i])
    }
    // hide dropdown if no alternate pn
    let dropDownVisibility = (pnArr[0]===""&&pnArr[1]==="")? false : true;
    picoUtils.showHideJquery(dropDownVisibility,"#divDataSheet");
}
function getDataSheetPath(manufacturer,pnArr){
    let series = (function(){
        let prefix;
        if(manufacturer==="littelfuse")prefix=pnArr[0].substring(0,3);
        else if (manufacturer==="belfuse")prefix=pnArr[1].substring(0,2);
        else if (manufacturer==="bussmann")prefix=pnArr[2].substring(0,4);
        return  prefix.toLowerCase();
    })();
    let fileName = (function(){
        let dataSheet;
        if(series==="251"||series==="253") dataSheet="251-253Series";
        else if(series==="265"||series==="266"||series==="267")dataSheet="265-266-267Series";
        else dataSheet = series+"Series";
        return dataSheet;
    })();
    return `/tedss/content/picoFuseData/picoFuseDataSheet/${fileName}.pdf`;
}
function popupDataSheetValidation(){
    picoUtils.showHideJquery(true,"#popup");
    $('body').css("overflow","hidden");
    const popupArea = document.getElementById("popup");
    $(window).click(function(event){
        if(event.target==popupArea) {
            picoUtils.showHideJquery(false,"#popup")
            $('body').css("overflow","visible");
        }
    });
}
// datasheet-------------------------
function loadTerminalImg(series){
    $("#terminal").attr("href",function(){
        return `/tedss/content/picoFuseData/picoFuseTerminals/${series+"Series"}.jpg`;
    });
}
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
function belfuseConversion(littelFuseData) {
    if(littelFuseData.maxVoltage===125){
        let belFuseSeries = (littelFuseData.action==="fast-acting")? "MQ" : "MS";
        let belfuseNumber = picoUtils.getObject(belFuseSeries,littelFuseData.amperageRating,"amperageRating");
        return (belfuseNumber===null)? null : belfuseNumber.partNumber;
    } else return null;
}
function bussmannConversion(littelFuseData){
    if(littelFuseData.maxVoltage===125&&littelFuseData.action==="fast-acting"){
        let bussmannPartNumber = picoUtils.getObject("MCRW",littelFuseData.amperageRating,"amperageRating");
        return (bussmannPartNumber===null)? null :bussmannPartNumber.partNumber;
    } else return null
}
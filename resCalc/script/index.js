const utilsRes = new Utils();
// onfocus
function cursorBand(color){
    let resColorID = $("#resTable td");
    const dropDownID = ["#colorBandDropDown1","#colorBandDropDown2","#colorBandDropDown3","#colorBandDropDown4","#colorBandDropDown5"];
    for(let i=0; i<dropDownID.length; i++){
        if(color===""&&$(dropDownID[i]).is(":focus")) $("#"+resColorID[i].id).addClass("default");
        else $("#"+resColorID[i].id).removeClass("default");
    }
}
// onchange
function changeColorBand(color,id){
    const tdID = ["#band1","#band2","#band3","#band4","#band5"];
    const dropDownID = ["#colorBandDropDown1","#colorBandDropDown2","#colorBandDropDown3","#colorBandDropDown4","#colorBandDropDown5"];
    let currentIndex = tdID.indexOf("#"+id),
        nextIndex = currentIndex+1;
    let prevColor = $(tdID[currentIndex]).attr("class");
    $(tdID[currentIndex]).removeClass(prevColor);
    $(tdID[currentIndex]).addClass("res"+color);
    if(color==="") $(dropDownID[currentIndex]).focus();
    else if(nextIndex<=4) $(dropDownID[nextIndex]).focus();
}
// onchange
function validateResColorCode(){
    const dropDownID = ["#colorBandDropDown1","#colorBandDropDown2","#colorBandDropDown3","#colorBandDropDown4","#colorBandDropDown5"];
    let valuesArr = utilsRes.getSelectedFields(dropDownID,"text");
    let displayBool;
    if(!valuesArr.includes("Select Color")){
        displayBool = true;
        displayColorCodeData(valuesArr);
    } else displayBool = false;
    utilsRes.showHideJs(displayBool,"colorCodeOutput");
}
function displayColorCodeData(valuesArr){
    const outputID = ["#resColorCodeResistance","#resColorCodeTolerance","#resColorCodeFailureRate"];  
    let obj = {
        resistance : (function(){return getResistance(valuesArr.slice(0,3))})(),
        tolerance : (function(){return getTolerance(valuesArr[3]);})(),
        failureRate : (function(){return getFailureRate(valuesArr[4]);})()
    }
    obj = Object.values(obj);
    for(let i=0; i<obj.length;i++) $(outputID[i]).val(obj[i]);
}
function colorBandToNumber(color){
    const table = {"black":0,"brown":1,"red":2,"orange":3,"yellow":4,"green":5,"blue":6,"violet":7,"gray":8,"white":9,"gold":0.1};
    return table[color.toLowerCase()];
}
function getResistance(colorCodeArr){
    let resCode = "";
    for(let i=0; i<colorCodeArr.length;i++) resCode+= colorBandToNumber(colorCodeArr[i]);
    let rawResValue = (function(){
        if(resCode.substring(resCode.length-3)==0.1){
            resCode = resCode.substring(0,2)
            return parseFloat(resCode)*0.1;
        } else return utilsRes.threeDigitCodeCalculator(resCode);
    })();
    let resValue = utilsRes.roundValueLowerHigher("ohms",rawResValue,-3,2)
    return resValue;
}
function getTolerance(tolerance){
    tolerance = tolerance.toLowerCase();
    switch(tolerance){
        case "gold":  tolerance = "5%";
        break;
        case "silver":  tolerance = "10%";
        break;
        case "no color":  tolerance = "20%";
        break;
    } return tolerance;
}
function getFailureRate(failureRate){
    failureRate = failureRate.toLowerCase();
    switch(failureRate){
        case "brown" :  failureRate = "1.0%";
        break;
        case "no color" :  failureRate = "-";
        break;
        case "red":  failureRate = "0.1%";
        break;
        case "orange":  failureRate = "0.01%";
        break;
        case "yellow":  failureRate = "0.001%";
        break;
    } return failureRate;
}
function resetResistorColors(){
    let resColorID = $("#resTable td");
    for(let i=0; i<resColorID.length; i++) {
        $("#"+resColorID[i].id).removeAttr("class");
    }
} 
const resetResCalc = (function(){
    $("#resetColorCode").click((function(){
        utilsRes.resetFedCon("formResColorCode","colorCodeOutput");
        resetResistorColors();
        $("#colorBandDropDown1").focus();
    }));
})();
window.onload = resetResCalc;
const utilsRes = new Utils();
function changeColorBand(id,color){
    id = id.replace("colorBandDropDown","#band"), color = "res" + color;
    let removePrevColor = $(id).attr("class");
    $(id).removeClass(removePrevColor);
    $(id).addClass(color);
}
function validateResColorCode(){
    const tdID = ["#colorBandDropDown1","#colorBandDropDown2","#colorBandDropDown3","#colorBandDropDown4","#colorBandDropDown5"];
    let valuesArr = utilsRes.getSelectedFields(tdID,"text");
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
        resistance : (function(){
            let resCode = "";
            for(let i=0; i<3;i++) resCode+= colorBandToNumber(valuesArr[i]);
            return utilsRes.threeDigitCodeCalculator(resCode,-3,"Ω","KΩ");
        })(),
        tolerance : (function(){return getTolerance(valuesArr[3]);})(),
        failureRate : (function(){return getFailureRate(valuesArr[4]);})()
    }
    obj = Object.values(obj);
    for(let i=0; i<obj.length;i++) $(outputID[i]).val(obj[i]);
}
function colorBandToNumber(color){
    const table = {"black":0,"brown":1,"red":2,"orange":3,"yellow":4,"green":5,"blue":6,"violet":7,"gray":8,"white":9,"golf":0.1};
    return table[color.toLowerCase()];
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
        case "black":  failureRate = "1.0%";
        break;
        case "brown":  failureRate = "0.1%";
        break;
        case "red":  failureRate = "0.01%";
        break;
        case "orange":  failureRate = "0.001%";
        break;
    } return failureRate;
}
// work here  
const resetResCalc = (function(){
    utilsRes.resetFedCon(false, );
})();
window.onload = resetResCalc;


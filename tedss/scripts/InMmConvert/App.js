// first javascript app
function lengthConverter(source,valNum){
    valNum = parseFloat(valNum);
    let inputInchesL = $("#inputInchesL").val();
    let inputMiliMetersL = $("#inputMiliMetersL").val();
    if(source=="inputInchesL") $("#inputMiliMetersL").val((valNum * 25.4).toFixed(2));
    if(source=="inputMiliMetersL") $("#inputInchesL").val((valNum / 25.4).toFixed(2));
}
function diameterConverter(source,valNum1){
    valNum1 = parseFloat(valNum1);
    let inputInchesD = $("#inputInchesD").val();
    let inputMiliMetersD = $("#inputMiliMetersD").val();
    if(source=="inputInchesD") $("#inputMiliMetersD").val((valNum1 * 25.4).toFixed(2));
    if(source=="inputMiliMetersD") $("#inputInchesD").val((valNum1 / 25.4).toFixed(2));
}
const resetApp = (function(){
    $("#reset").click(function(){
        $("#inToMmConversion").trigger('reset');
    });
})();
window.onload = resetApp;
let utilsM39006 = new Utils();
let globalJqueryM39006 = new GlobalJquery();

function validateM39006(specificationNumber,clrNumber){
    if(clrNumber!="")globalJqueryM39006.fadeInFadeOut(true,"#resetM39006");
    let pdfLink = `/content/specsheet/tantalumCaps/M39006-${specificationNumber}.pdf`, 
    imgLink = showTerminalM39006(specificationNumber);
    $("#clrNumberM39006").text(`CLR Number ${clrNumber}`);
    $("#terminalPicM39006").attr('src', imgLink);
    $("#specSheetM39006").attr('href', pdfLink);
    $("#specSheetM39006").attr('target', "_blank");
}
function resetLink(){
    $("#specSheetM39006").attr('href', "Javascript:void(0);");
    $("#specSheetM39006").attr('target', "_self");
}
function showTerminalM39006(specificationNumber) {
    let pic;
    if (specificationNumber == "22" || specificationNumber == "25" || specificationNumber == "30" || specificationNumber == "31") {
        pic = "M39006-22-25-30-31"
    }else if (specificationNumber == "09" || specificationNumber == "21") {
        pic = "M39006-9"
    }else if (specificationNumber == "20") {
        pic = "M39006-20";
    }else if (specificationNumber == "01" || specificationNumber == "02" || specificationNumber == "03" || specificationNumber == "04") {
        pic = "M39006-01-02-03-04"
    }else {
        pic = "M39006";
    }
    return `/content/images/tantalumCaps/${pic}.png`;
}
const resetAppM39006 = (function(){
    $("#specificationNumberM39006").change(function(){
        // test line without option:selected with text()
        // let resetDropDownVal = $("#specificationNumberM39006 option:selected").text();
        let resetDropDownVal = $("#specificationNumberM39006").val();

        if(resetDropDownVal=="") {
            utilsM39006.resetApp("#formM39006","#resetM39006");
            resetLink();
        }
       
    });
    $("#resetM39006").click(function(){
        utilsM39006.resetApp("#formM39006","#resetM39006");
        validateM39006("","");
        resetLink();
    });
})();
window.onload = resetAppM39006;

const pageLoadFunction = (function(){
    globalJqueryM39006.hideElement("#resetM39006");
})();
window.onload = pageLoadFunction;
const utilsM39006 = new Utils();
function validateM39006(specificationNumber,clrNumber){
    if (clrNumber != "")utilsM39006.showHideJs(true,"resetM39006");
    $("#clrNumberM39006").text(`CLR Number ${clrNumber}`);
    loadResources(specificationNumber);
}
function resetLink(){
    $("#specSheetM39006").attr('href', "Javascript:void(0);");
    $("#specSheetM39006").attr('target', "_self");
}
function loadResources(specificationNumber){
    let pdfLink = `/fedcon/content/specsheet/tantalumCaps/M39006-${specificationNumber}.pdf`, 
    imgLink = showTerminalM39006(specificationNumber);
    $("#terminalPicM39006").attr('src', imgLink);
    $("#specSheetM39006").attr('href', pdfLink);
    $("#specSheetM39006").attr('target', "_blank");
}
function showTerminalM39006(specificationNumber) {
    let pic;
    if (specificationNumber=="22"||specificationNumber=="25"||specificationNumber=="30"||specificationNumber=="31") {
        pic = "M39006-22-25-30-31"
    } else if (specificationNumber=="09"||specificationNumber=="21") {
        pic = "M39006-9"
    } else if (specificationNumber=="20") {
        pic = "M39006-20";
    } else if (specificationNumber=="01"||specificationNumber=="02"||specificationNumber=="03"||specificationNumber=="04") {
        pic = "M39006-01-02-03-04"
    } else {
        pic = "M39006";
    } return `/fedcon/content/images/tantalumCaps/${pic}.png`;
}
const showPopupM39006 = (function(){
    $("#specSheetM39006").click(function(){
        let specificationNumber = $("#specificationNumberM39006").val();
        if(specificationNumber===""){
            (function () {
                displayBool = false
                utilsM39006.showHideJs(true,"popupM39006");
                $('body').css("overflow", "hidden");
                const popupArea = document.getElementById("popupM39006");
                $(window).click(function (event) {
                    if (event.target == popupArea) {
                        utilsM39006.showHideJs(false,"popupM39006");
                        $('body').css("overflow", "visible");
                    }
                });
            })();
        }
    });
})();
window.onload = showPopupM39006;
const resetAppM39006 = (function(){
    $("#specificationNumberM39006").change(function(){
        let specificationNumber = $("#specificationNumberM39006 option:selected").val();
        if(specificationNumber==="") {
            utilsM39006.resetFedCon("formM39006","resetM39006");
            resetLink();
        }
    });
    $("#resetM39006").click(function(){
        utilsM39006.resetFedCon("formM39006","resetM39006");
        validateM39006("","");
        resetLink();
    });
})();
window.onload = resetAppM39006;
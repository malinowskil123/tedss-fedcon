const utilsMilF19207 = new Utils();
function validateMilF19207(partNumber) {
    partNumber = formatPartNumber(partNumber);
    let fuseHolderObject = utilsMilF19207.getObject("milFuseHolderArr", partNumber, "governmentDesignation");
    let displayBool;
    if (fuseHolderObject===null) {
        (function () {
            displayBool = false
            utilsMilF19207.showHideJs(true,"popupMilF19207");
            $("#popupText").text(function(){return (partNumber.length>=8)? "Part Number Too Long!" : `Incorrect Part Number "${partNumber}"`});
            $('body').css("overflow", "hidden");
            const popupArea = document.getElementById("popupMilF19207");
            $(window).click(function (event) {
                if (event.target == popupArea) {
                    utilsMilF19207.showHideJs(false,"popupMilF19207");
                    $('body').css("overflow", "visible");
                }
            });
        })();
    } else {
        displayBool = true;
        displayTableMilF19207(fuseHolderObject);
        displayPartNumberBreakdownMilF19207(partNumber);
        loadResourcesMilF19207(fuseHolderObject);
    }
    utilsMilF19207.showHideJs(displayBool,"resourcesMilF19207");
}
function formatPartNumber(partNumber){
    while(partNumber.includes("-")){
        partNumber = partNumber.replace('-','');
    }
    partNumber = partNumber.toUpperCase()
    $("#partNumberMilF19207").val(partNumber); 
    return partNumber;
};
function displayTableMilF19207(fuseHolderObject){
    const tableIdMilF19207 = [
        "#militarySpecification",
        "#governmentDesignation",
        "#commercialEquivalent",
        "#electricalRating",
        "#fuseFamily",
        "#knobType",
        "#numberOfPoles",
        "#maxPanelThickness"
    ];
    if($(tableIdMilF19207[0]).text()!="") utilsMilF19207.clearText(tableIdMilF19207);
    $("#resetMilF19207").click(function(){
       utilsMilF19207.clearText(tableIdMilF19207);
    });
    let counter = 0;
    for(let i in fuseHolderObject){
       $(tableIdMilF19207[counter++]).text(fuseHolderObject[i]);
    }  
}
function loadResourcesMilF19207(fuseHolderObject) {
    $("#diagramMilF19207").attr("href", function () {
        let imgFileName = utilsMilF19207.remove(fuseHolderObject.militarySpecification, 12);
        return `/fedcon/content/images/fuseHolders/${imgFileName}.jpg`;
    });
}
function displayPartNumberBreakdownMilF19207(partNumber) {
    const partNumberIdMilF19207 = ["#characteristic", "#construction", "#enclosure", "#style"]
    let pnbArr = [partNumber.substring(2,3),partNumber.substring(3,5),partNumber.substring(5,6),partNumber.substring(6)]
    for(let i in partNumberIdMilF19207){
        $(partNumberIdMilF19207[i]).text(pnbArr[i]);
        if(pnbArr[3]=="") $(partNumberIdMilF19207[3]).text("-");
    }
    const listIdMilF19207 = ["#L","#N","#U","#G","#W"];
    let pnbListOptions = [pnbArr[0],pnbArr[2]];
    const activateListItems = (function(){
        let counter = 0;
        for(let j in listIdMilF19207){
            $(listIdMilF19207[j]).removeClass("active");
            if(listIdMilF19207[j].substring(1)==pnbListOptions[counter]){
                $(listIdMilF19207[j]).toggleClass("active");
                if(counter<=0) counter++;
            }   
        }
    })();
}
const resetAppFH = (function () {
    $("#resetMilF19207").click(function () {
        utilsMilF19207.resetFedCon("formMilF19207", "resourcesMilF19207")
    });
})();
window.onload = resetAppFH;
const onEnterValidateFH = (function(){
    let input = document.getElementById("partNumberMilF19207");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode===13) {
            event.preventDefault();
            document.getElementById("submitMilF19207").click(validateMilF19207(partNumberMilF19207.value.replace('-','').toUpperCase()));
        }
    });    
})();
window.onload = onEnterValidateFH;

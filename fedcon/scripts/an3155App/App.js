const utilsAN3155 = new Utils();
function validateAN3155() {
    const dropDownIdArrAN3155 = ["#wattageAN3155", "#resistanceAN3155"];
    let valuesArrAN3155 = utilsAN3155.getSelectedFields(dropDownIdArrAN3155);
    let resourceBool;
    if (valuesArrAN3155.includes("")!=true) {
        let an3155Data = utilsAN3155.getObject(valuesArrAN3155[0], parseInt(valuesArrAN3155[1]), "resistance");
        resourceBool = true;
        loadResourcesAN3155(valuesArrAN3155[0]);
        showElectricalDataAN3155(valuesArrAN3155, an3155Data);
    } else resourceBool = false;
    utilsAN3155.showHideJs(resourceBool,"resourcesAN3155");
}
// onchange trigger
function populateResistanceAN3155(seriesWattage){
    const wattageList = document.getElementById("wattageAN3155");
    const resistanceList = document.getElementById("resistanceAN3155");
    let selectedValue =  wattageList.options[wattageList.selectedIndex].value;
    for(let j=resistanceList.options.length-1; j>=1; j--){
        resistanceList.remove(j);
    }
    let dropdownOptions = utilsAN3155.getDropDownValues(seriesWattage,"resistance");
    if(dropdownOptions){
        for(let i=0; i<dropdownOptions.length; i++){
            let value = new Option(dropdownOptions[i],dropdownOptions[i]);
            resistanceList.options.add(value);
        }
    }
}
function loadResourcesAN3155(model){
    let pictureLink = `/fedcon/content/images/rheostats/AN3155-${model.substring(7)}.png`;
    $("#diagramAN3155").attr('href',pictureLink);
}
function showElectricalDataAN3155(pnArr,an3155Data){
    const showIdArrAN3155 = ["#showResistanceAN3155","#showAmperageAN3155"];
    let counter = 0;
    for(let i in an3155Data){
        if(i==="resistance") $(showIdArrAN3155[counter++]).val(an3155Data[i]+"Ω");
        $(showIdArrAN3155[counter++]).val(an3155Data[i]);
    }
    let modelText = (pnArr[0].substring(6)==="25") ? "Model H = 25 Watts" : "Model J = 50 Watts";
    $("#showModelWattageAN3155").val(modelText);
    $("#showPartNumberAN3155").val(pnArr.join("-"));
}
const resetAppAN3155 = (function () {
    $("#wattageAN3155").change(function () {
        let resetDropDownVal = $("#wattageAN3155").val();
        if (resetDropDownVal == "") utilsAN3155.resetFedCon("formAN3155", "resourcesAN3155");
    });
    $("#resetAN3155").click(function () {
        utilsAN3155.resetFedCon("formAN3155", "resourcesAN3155");
    });
})();
window.onload = resetAppAN3155;
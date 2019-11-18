const utilsM39015 = new Utils();
//convert values table
// let dropDownValuesTerminalArrM39015 = [
//     ["RTR22","L","P|P","W|W","X|X"],
//     ["RTR24","P|P","W|W","X|X"]
// ];
// let dropDownValuesResistanceArrM39015 = [
//     ["RTR22","501|003","102|004","202|005","502|006","103|007","203|008"],
//     ["RTR24","501|006","102|007","202|008","502|009","103|101"],
// ];



function validateM39015(){
    const dropDownIdM39015 = ["#styleM39015","#terminalM39015","#resistanceM39015","#failureRateM39015"];
    let valuesArr = utilsM39015.getSelectedFields(dropDownIdM39015);
    hideFailureRate(valuesArr[0]);
    validateResistance(valuesArr[2]);
}
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
//onchange trigger
function populateResistanceM39015() {
    const styleList = document.getElementById("styleM39015");
    const terminalList = document.getElementById("terminalM39015");
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
function hideFailureRate(style){
    const divId = ["#divStyle","#divTerminal","#divResistance","#divFailureRate"];
    const styleRegEx = new RegExp(/(R[T,J][\d]{2})/);
    let displayBool = (styleRegEx.test(style))? false:true;
    utilsM39015.showHide(displayBool,"divFailureRate");
    const toggleBootstrapColumns = (function(){
        for(let i=0; i<divId.length-1; i++){
            let remove = (styleRegEx.test(style))? "col-md-3":"col-md-4";
            let add = (styleRegEx.test(style))? "col-md-4":"col-md-3";
            if($(divId[i]).attr("class")!=add){
                $(divId[i]).removeClass(remove); 
                $(divId[i]).toggleClass(add); 
            }
        }  
    })();
    return (styleRegEx.test(style))? true : false;       
}
function validateResistance(resistance){
    const resistanceInputTest = new RegExp(/^([\d]{3})$/);
    if(resistanceInputTest.test(resistance)!==true&&resistance!==""){
        const popup = (function(){
            $("#popupTextM39015").text(`Incorrect Resistance Code "${resistance}"`);
            utilsM39015.showHide(true,"popupM39015");
            $('body').css("overflow","hidden");
            const popupArea = document.getElementById("popupM39015");
            $(window).click(function(event){
                if(event.target==popupArea) {
                    utilsM39015.showHide(false,"popupM39015")
                    $('body').css("overflow","visible");
                }
            });
        })();
        $("#resistanceM39015").val("");
    } else return resistance;
}

let utilsM39015 = new Utils();
let globalJqueryM39015 = new GlobalJquery();

// let dropDownValuesTerminalArrM39015 = [
//     ["RTR22","L|L","P|P","W|W","X|X"],
//     ["RTR24","P|P","W|W","X|X"]
// ];
// let dropDownValuesResistanceArrM39015 = [
//     ["RTR22","501|003","102|004","202|005","502|006","103|007","203|008"],
//     ["RTR24","501|006","102|007","202|008","502|009","103|101"],
// ];
// let dropDownValuesRtrRjr = [
//     ["RT12","L|L","P|P","Y|Y"],
//     ["RT22/RTR22/RJ22/RJ24/RJR24","P|P","W|W","X|X","L|L"],
//     ["RT24/RTR24","X|X","P|P","W|W"],
//     ["RT26","X|X","W|W"],
//     ["RJ12","P|P","Y|Y"],
//     ["RJ26/RJR26","P|P","W|W","X|X","A|A","B|B"],
//     ["RJ50/RJR50","P|P"]
// ];


function validateM39015(){
    const dropDownIdM39015 = ["#styleM39015","#terminalM39015","#resistanceM39015","#failureRateM39015"];
    let valuesArr = utilsM39015.getSelectedFields(dropDownIdM39015);
    console.log(valuesArr)
    hideFailureRate(valuesArr[0]);
    populateTerminal(valuesArr[0]);
    // let resistanceInputTest = new RegExp(/^([0-9]{3})$/);
    // if(resistanceInputTest.test(valuesArr[2])==false){
    //     valuesArr[2]="";
    // }
}
function hideFailureRate(style){
    const divId = ["#divStyle","#divTerminal","#divResistance","#divFailureRate"];
    const styleRegEx = new RegExp(/(R[T,J][\d]{2})/);
    (styleRegEx.test(style))? $("#divFailureRate").hide():$("#divFailureRate").show();
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
}
function populateTerminal(style){
    const dropDownValues = [
        ["RT12","L|L","P|P","Y|Y"],
        ["RT22/RTR22/RJ22/RJ24/RJR24","P|P","W|W","X|X","L|L"],
        ["RT24/RTR24","X|X","P|P","W|W"],
        ["RT26","X|X","W|W"],
        ["RJ12","P|P","Y|Y"],
        ["RJ26/RJR26","P|P","W|W","X|X","A|A","B|B"],
        ["RJ50/RJR50","P|P"]
    ];
    utilsM39015.populateFromArray(style,"terminalM39015",dropDownValues);
}


class Utils{
    getSelectedFields(dropDownIdArr) {
        let selectedFieldsVal = [];
        for (let i = 0; i < dropDownIdArr.length; i++) {
            selectedFieldsVal[i] = $(dropDownIdArr[i]).val();
        }
        return selectedFieldsVal;
    }
    // make it work 
    // getSelectedFields(dropDownIdArr, attr) {
    //     let selectedFieldsVal = [];
    //     if(attr==="val"){
    //         for (let i = 0; i < dropDownIdArr.length; i++) {
    //             selectedFieldsVal[i] = $(dropDownIdArr[i]).val();
    //         }
    //     }else{
    //         for (let i = 0; i < dropDownIdArr.length; i++) {
    //             selectedFieldsVal[i] = $(dropDownIdArr[i]).text();
    //         }
    //     }
    //     return selectedFieldsVal;
    // }
    clearText(selectIdArr) {
        for (let a = 0; a < selectIdArr.length; a++) {
            $(selectIdArr[a]).text("");
        }
    }
    resetDynamicDropDown(id) {
        let select = $(id).get(0);
        select.options.length = 1;
    }
    insert(str, index, value) {
        return str.substr(0, index) + value + str.substr(index);
    }
    populateDropDown(specifier, htmlElementId, dropDownValuesArr){
        let optionArr = [];
        let dropDown = document.getElementById(htmlElementId.substr(1));
        let tempArr = (function(){
            for(let i = 0; i < dropDownValuesArr.length; i++){
                if((dropDownValuesArr[i][0]).includes(specifier)==true){
                    return dropDownValuesArr[i];
                }
            }
        })();
        let counter = 0, i=1
        if(tempArr.length==1){
            i=0;
        }
        for(i; i < tempArr.length; i++){
            optionArr[counter++] = tempArr[i];
        }
        for(let option in optionArr){
            let pair = optionArr[option].split("|");
            let newOption = document.createElement("option");
            newOption.value = pair[0];
            newOption.text = pair[1];
            dropDown.options.add(newOption);
        }
    }
    // work this in 
    // populateDropDown(idRowArr, objectProperty, htmlElementId) {
    //     let dataStorageFunctions = new DataStorageFunctions();
    //     try{
    //         let optionArr = dataStorageFunctions.getTable(idRowArr);
    //         let selectElement = document.getElementById(htmlElementId);
    //         for (let i = 0; i < optionArr.length; i++) {
    //             let option = document.createElement("OPTION");
    //             let displayedValue = document.createTextNode(optionArr[i][objectProperty]);
    //             option.appendChild(displayedValue);
    //             option.setAttribute("value", displayedValue.nodeValue);
    //             selectElement.insertBefore(option, option.lastElementChild);
    //         }
    //     }catch(err){
    //         console.log(err);
    //         console.log(`couldn't match a table to key = ${idRowArr}`)
    //     }
        
    // }
    setProductLink(partNumber,category){
        return `https://www.tedss.com/Catalog/Browse?pageNumber=1&searchString=${partNumber}&inCategory=${category}`;
    }
    threeDigitCodeCalculator(code,exponent,lowerValueSymbol,higherValueSymbol){
        let result =(function(){
            let loopControl = parseInt(code.substring(2));
            let value = code.substring(0,2);
            for(let i = 0; i<loopControl; i++){
                value = value + "0";
            }
            return value;
        })(); 
        if(result<=1000) result = result + lowerValueSymbol;
        else{
            result = (result * Math.pow(10,exponent));
            if(result<0.9) result = result.toFixed(3);
            result = result + higherValueSymbol;
        }
        return result;
    }
    returnFailureRate(failureRate){
        switch(failureRate){
            case "M" : failureRate +=" = 1.0%";
            break;
            case "P" : failureRate += " = 0.1%";
            break;
            case "R" : failureRate += " = 0.01%";
            break;
            default : failureRate = "";
            break;
        }
        return failureRate;
    }
    getItemFromDirectory(link,picId,fileFormat,fancyBoxLink) {
        if(fancyBoxLink==true&&picId==" ")return "javascript:void(0);";
        else{
            if(picId==" ")picId="default";
            return link+picId+fileFormat;
        }
    }
    getDataFromStorage(tableName,rowId,objectProperty) {
        let dataStorageFunctions = new DataStorageFunctions();
        //testing
        //dataStorageFunctions.showArr(tableName);
        return dataStorageFunctions.getObject(tableName,rowId,objectProperty);
    }
    //Trim Pot App--------------------------------------
    returnRtRtrPartNumber(valueArr){
        let partNumber = valueArr.join("");
        let checkStyle = partNumber.substring(0,3);
        let insertValue;
        let regexRT = new RegExp(/\b(\w*RT[0-9]\w*)\b/g);
        let regexRJ = new RegExp(/\b(\w*RJ[0-9]\w*)\b/g);
        if(regexRT.test(checkStyle)){
            insertValue="C2";
            partNumber = this.insert(partNumber,4,insertValue);
        }
        else if(regexRJ.test(checkStyle)){
            insertValue="F";
            partNumber = this.insert(partNumber,4,insertValue);
        }
        else if(checkStyle=="RTR"||checkStyle=="RJR"){
            (checkStyle=="RTR")? insertValue="D": insertValue="F";
            partNumber = this.insert(partNumber,5,insertValue);
        }
        else{
            partNumber="";
        }
        return partNumber;
    }
    returnTerminal(terminal){
        switch(terminal){
            case "L" : terminal += " = Insulated Flexible Leads";
            break;
            case "P" : terminal += " = Printed Circuit Pins Base Mounted";
            break;
            case "W" : terminal += " = Printed Circuit Pins Edge Mounted 180 degrees from screw";
            break;
            case "X" : terminal += " = Printed Circuit Pins Edge Mounted 90 degrees from screw";
            break;
            default : terminal = "";
            break;
        }
        return terminal;
    }
    showCharacteristic(style){
        let characteristic, checkStyle = style.substring(0,3);
        let regexRT = new RegExp(/^([R,T,0-9]{3})$/),regexRJ = new RegExp(/^([R,J,0-9]{3})$/);
        if(checkStyle=="RTR"){
            characteristic = "D = ±50ppm/°C Temp. Coeff. Max.";
        }
        else if(regexRT.test(checkStyle)==true){
            characteristic = "C = ±50ppm/°C Temp. Coeff. Max.\n2 = 85°C-150°C Operating Temp.";
        }
        else if(regexRJ.test(checkStyle)||checkStyle=="RJR"){
            characteristic = "F = ±100ppm/°C Temp. Coeff. Max.";
        }
        else{
            characteristic = "";        
        }
        return characteristic;
    }
    //Trim Pot App--------------------------------------
    //Metal Film Caps App-------------------------------
    returnToleranceMetalFilmCaps(tolerance){
        switch(tolerance){
            case "M" : tolerance += " = ±20%";
            break;
            case "K" : tolerance += " = ±10%";
            break;
            case "J" : tolerance += " = ±5%";
            break;
            case "G" : tolerance += " = ±2%";
            break;
            case "F" : tolerance += " = ±1%";
            break;    
            default : tolerance = "";
            break;            
        }
        return tolerance;
    }
    returnVoltage(type,voltage){
        if(type=="MC12"){
            switch(voltage){
                case "D" : voltage += " = 100 VDC";
                break;
                case "F" : voltage += " = 200 VDC";
                break;
                case "J" : voltage += " = 400 VDC";
                break;
                default : voltage = "";
                break;
            }
        }
        else{
            switch(voltage){
                case "A" : voltage += " = 50 VDC";
                break;
                case "B" : voltage += " = 100 VDC";
                break;
                case "C" : voltage += " = 200 VDC";
                break;
                case "D" : voltage += " = 300 VDC";
                break;
                case "E" : voltage += " = 400 VDC";
                break;
                case "F" : voltage += " = 600 VDC";
                break;
                default : voltage = "";
                break;
            }
        }
        return voltage;
    }
    returnMetalFilmCapsPartNumber(valueArr){
        let partNumber = valueArr.join("");
        return (valueArr[0]!="MC12")? partNumber = this.insert(partNumber,4,"1") : (valueArr[0]==" ")? "" : partNumber;
    }
    //Metal Film Caps App-------------------------------
    //Orange Drop Caps App------------------------------
    returnToleranceOrangeDropCaps(tolerance){
        switch(tolerance){
            case "0": tolerance += " = ±20%" ;
            break;
            case "9": tolerance += " = ±10%" ;
            break;
            case "5": tolerance += " = ±5%" ;
            break;
            case "2": tolerance += " = ±2%" ;
            break;
            default : tolerance = "";
            break;
        }
        return tolerance;
    }
    calculateVoltage(voltage){
        (voltage.length==2)? voltage = parseInt(voltage.substring(1,2)) * 10 : voltage = parseInt(voltage) * 100;
        return voltage + "VDC";
    }
    returnLeadLength(leadLength){
        switch(leadLength){
            case "3": leadLength = "1.250[31.750]";
            break; 
            case "2": leadLength = "0.250[6.350]";
            break;
            case "1": leadLength = "0.187[4.750]";
            break;
            default : leadLength = "";
            break;
        }
        return leadLength;
    }
    //Orange Drop Caps App------------------------------
}
class GlobalJquery{
    constructor(){};
    hideElement(object) {
        if(typeof object=="object"){
            for(var i in object){
                $(object[i]).hide();
            }
        }else{
            $(object).hide();
        }
    }
    fadeInFadeOut(reset, object) {
        if(typeof object=="object"){
            for(var i in object){
                (reset == true) ? $(object[i]).fadeIn(1500) : $(object[i]).fadeOut(1000);
            }
        }else{
            (reset == true) ? $(object).fadeIn(1500) : $(object).fadeOut(1000);
        }
    }
}
const enablePopover = (function (){
    $('[data-toggle="popover"]').popover()
});
window.onload = enablePopover;

class OrangeDropTerminal {
    constructor(typeCaseCode, length, terminalA, terminalB, terminalD) {
        this.typeCaseCode = typeCaseCode;
        this.length = length;
        this.terminalA = terminalA;
        this.terminalB = terminalB;
        this.terminalD = terminalD;
    }
}
class DataStorageFunctions {
    getObject(tableName,rowId,objectProperty) {
        let tempArr = this.getTable(tableName);
        for (let a = 0; a < tempArr.length; a++) {
            if (tempArr[a][objectProperty] == rowId) return tempArr[a];
        }
        return null;
    }
    getTable(tableName) {
        return tables[tableName];
    }
    //testing function
    showArr(tableName) {
        let tempArr = this.getTable(tableName);
        if(tempArr===undefined){
            console.log("Table Not Found");
        }else{
            for (let i = 0; i < tempArr.length; i++) {
                console.log(tempArr[i]);
            }    
        }
    }
}

// delete data tables path from all view!!!!!!!!!!!!!
tables = {
    "orangeDropTerminalArr" :  [
        new OrangeDropTerminal("418PJ", "0.70[17.78]", "0.500[12.700]", "0.500[12.700]", "0.375[9.525]"),
        new OrangeDropTerminal("418PK", "0.90[22.86]", "0.688[17.475]", "0.688[17.475]", "0.375[9.525]"),
        new OrangeDropTerminal("418PL", "1.20[30.48]", "0.969[24.613]", "0.969[24.613]", "0.719[18.263]"),
        new OrangeDropTerminal("418PM", "1.60[40.64]", "1.344[34.138]", "1.344[34.138]", "1.094[27.788]"),
        new OrangeDropTerminal("715PJ", "0.75[19.050]", "0.500[12.700]", "0.500[12.700]", "0.375[9.525]"),
        new OrangeDropTerminal("715PK", "0.95[24.130]", "0.688[17.475]", "0.688[17.475]", "0.375[9.525]"),
        new OrangeDropTerminal("715PL", "1.30[33.020]", "1.031[26.187]", "0.969[24.613]", "0.719[18.263]"),
        new OrangeDropTerminal("715PM", "1.70[43.180]", "1.406[35.712]", "1.344[34.138]", "1.094[27.788]"),
        new OrangeDropTerminal("715PJ", "0.75[19.050]", "0.500[12.700]", "0.500[12.700]", "0.375[9.525]"),
        new OrangeDropTerminal("715PK", "0.95[24.130]", "0.688[17.475]", "0.688[17.475]", "0.375[9.525]"),
        new OrangeDropTerminal("715PL", "1.30[33.020]", "1.031[26.187]", "0.969[24.613]", "0.719[18.263]"),
        new OrangeDropTerminal("715PM", "1.70[43.180]", "1.406[35.712]", "1.344[34.138]", "1.094[27.788]")
    ],
    "251/253" : {
        
    }
}

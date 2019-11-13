
// move this to respective app.js or turn into objects
class Utils{
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
}

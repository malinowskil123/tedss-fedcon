
// move this to respective app.js or turn into objects
class Utils{
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
        } return tolerance;
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
        } return leadLength;
    }
}

class Utils{
    constructor() {};
    getSelectedFields(dropDownIdArr,attr) {
        let selectedFieldsVal = [];
        for (let i = 0; i < dropDownIdArr.length; i++) {
            if(attr==="text")selectedFieldsVal[i] = $(dropDownIdArr[i]+" option:selected").text();
            else selectedFieldsVal[i] = $(dropDownIdArr[i]).val();
        } return selectedFieldsVal;
    }
    clearText(selectIdArr) {
        for (let a = 0; a < selectIdArr.length; a++) {
            $(selectIdArr[a]).text("");
        }
    }
    resetDynamicDropDown(id) {
        let select = $(id).get(0);
        select.options.length = 1;
    }
    insert(str,index,value) {return str.substr(0,index) + value+str.substr(index);}
    remove(str,index){return str.substring(0,index-1)+str.substring(index);}
    threeDigitCodeCalculator(code){
        let value = (function(){
            let loopControl = parseInt(code.substring(code.length-1));
            let value = code.substring(0,2);
            for(let i=0; i<loopControl; i++){
                value = value+"0";
            } return value;
        })(); return value;
    }
    roundValueLowerHigher(unit,value,exponent,decimal){
        const symbolArr = [["pf","µf"],["Ω","KΩ"]];
        unit = unit.toLowerCase();
        let lowerUnits = (unit==="farads")? symbolArr[0][0] : symbolArr[1][0];
        let higherUnits = (unit==="farads")? symbolArr[0][1] : symbolArr[1][1];
        if(value<=1000) return value+lowerUnits;
        else{
            value = (value*Math.pow(10,exponent));
            return((value - Math.floor(value))!==0)? value.toFixed(decimal)+higherUnits:value+higherUnits;
        }
    }
    roundValue(unit,value,exponent,decimal){
        const symbolArr = ["µf","KΩ"];
        unit = unit.toLowerCase();
        let valueUnits = (unit==="farads")?symbolArr[0]:symbolArr[1];
        value = (value*Math.pow(10,exponent));
        return((value - Math.floor(value))!==0)? value.toFixed(decimal)+valueUnits : value+valueUnits;
    }
    getObject(tableKey,rowKey,matchObjectProperty) {
        if(tableKey==="")return null;
        let tempArr = tables[tableKey];
        for (let i in tempArr) {
            if (tempArr[i][matchObjectProperty]===rowKey)return tempArr[i];
        }
        return null;
    }
    getDropDownValues(tableKey,matchObjectProperty) {
        if(tableKey==="") return null;
        let dropdownVal =[];
        let tempArr = tables[tableKey];
        try{
            for(let i=0; i<tempArr.length; i++){
                dropdownVal[i] = tempArr[i][matchObjectProperty];
            }
            return dropdownVal;
        } catch(err){
            throw err;
        }
    }
    // Tedss------------------------
    resetTedss(formId,elementId){
        $(formId)[0].reset();
        this.showHideJquery(false,elementId)
    }
    showHideJquery(reset,id) {(reset === true)? $(id).show("slow"):$(id).hide("slow");}
    // FedCon-----------------------
    resetFedCon(formId,elementId,cssDisplay){
        document.getElementById(formId).reset();
        this.showHideJs(false,elementId,cssDisplay)
    }
    showHideJs(reset,id,cssDisplay){
        let elm = document.getElementById(id);
        if(cssDisplay===undefined) cssDisplay = "inline";//default inline unless specified
        (reset===true)? elm.classList.remove("hidden"):elm.classList.add("hidden");
        elm.style.display = (reset === true)? cssDisplay:"none";
    }
    //add new code here-------------
}
// FedCon-----------------------
class M22DataSpecs {
    constructor(milType,rpNumber,resistance,maxAmperage) {
        this.milType = milType;
        this.rpNumber = rpNumber;
        this.resistance = resistance;
        this.maxAmperage = maxAmperage;
    }
}
class M22ShaftData {
    constructor(symbol,shaftStyle,bushingStyle,shaftLength,shaftDiameter) {
        this.symbol = symbol;
        this.shaftStyle = shaftStyle;
        this.bushingStyle = bushingStyle;
        this.shaftLength = shaftLength;
        this.shaftDiameter = shaftDiameter;
    }
}
class AN3155DataSpecs {
    constructor(resistance,amperageRating){
        this.resistance = resistance;
        this.amperageRating = amperageRating;
    }
}
class MilF19207{
    constructor(militarySpecification,governmentDesignation,commercialEquivalent,
        electricalRating,fuseFamily,knobType,numberOfPoles,maxPanelThickness){
        this.militarySpecification = militarySpecification;
        this.governmentDesignation = governmentDesignation;
        this.commercialEquivalent = commercialEquivalent;
        this.electricalRating  = electricalRating;
        this.fuseFamily = fuseFamily;
        this.knobType = knobType;
        this.numberOfPoles = numberOfPoles;
        this.maxPanelThickness = maxPanelThickness;
    }
}
// Tedss------------------------
class LittleFuse{
    constructor(amperageRating,ampCode,maxVoltage,interruptingRating,
        action,application,rcRating,csaRating,pseRating){
        this.amperageRating = amperageRating;
        this.ampCode = ampCode;
        this.maxVoltage = maxVoltage;
        this.interruptingRating = interruptingRating;
        this.action = action;
        this.application = application;
        this.rcRating = rcRating;
        this.csaRating = csaRating;
        this.pseRating = pseRating;
    }
}
class SubminiFuse{
    constructor(partNumber,amperageRating,maxVoltage,action){
        this.partNumber = partNumber;
        this.amperageRating = amperageRating;
        this.maxVoltage = maxVoltage;
        this.action = action;
    }
}
tables = {
    //fedcon
    "AN3155-25" : [
        new AN3155DataSpecs(10,"0.30A - 1.95A"),
        new AN3155DataSpecs(11,"1.25A - 1.25A"),
        new AN3155DataSpecs(15,"1.30A - 1.30A"),
        new AN3155DataSpecs(25,"1.00A - 1.00A"),
        new AN3155DataSpecs(50,"0.71A - 0.71A"),
        new AN3155DataSpecs(75,"0.58A - 0.58A"),
        new AN3155DataSpecs(100,"0.85A - 0.16A"),
        new AN3155DataSpecs(200,"0.35A - 0.35A")
    ],
    "AN3155-50" : [
        new AN3155DataSpecs(5,"1.82A - 5.50A"),
        new AN3155DataSpecs(8,"2.50A - 2.50A"),
        new AN3155DataSpecs(10,"1.60A - 2.50A"),
        new AN3155DataSpecs(25,"0.70A - 2.70A"),
        new AN3155DataSpecs(30,"0.90A - 1.70A"),
        new AN3155DataSpecs(50,"1.00A - 1.00A"),
        new AN3155DataSpecs(75,"0.82A - 0.82A"),
        new AN3155DataSpecs(100,"0.25A - 1.35A"),
        new AN3155DataSpecs(150,"0.17A - 0.69A"),
        new AN3155DataSpecs(250,"0.15A - 1.35A")
    ],
    "M22/05" :  [
        new M22DataSpecs("0001","RP151R0KK","1.0Ω",7.07),
        new M22DataSpecs("0002","RP152R0KK","2.0Ω",5.00),
        new M22DataSpecs("0003","RP152R5KK","2.5Ω",4.47),
        new M22DataSpecs("0004","RP153R0KK","3.0Ω",4.08),
        new M22DataSpecs("0005","RP154R0KK","4.0Ω",3.54),
        new M22DataSpecs("0006","RP155R0KK","5.0Ω",3.16),
        new M22DataSpecs("0007","RP156R0KK","6.0Ω",2.89),
        new M22DataSpecs("0008","RP158R0KK","8.0Ω",2.50),
        new M22DataSpecs("0009","RP15100KK","10Ω",2.24),
        new M22DataSpecs("0010","RP15120KK","12Ω",2.04),
        new M22DataSpecs("0011","RP15150KK","15Ω",1.83),
        new M22DataSpecs("0012","RP15250KK","25Ω",1.41),
        new M22DataSpecs("0013","RP15350KK","35Ω",1.19),
        new M22DataSpecs("0014","RP15500KK","50Ω",1.00),
        new M22DataSpecs("0015","RP15750KK","75Ω",0.82),
        new M22DataSpecs("0016","RP15101KK","100Ω",0.71),
        new M22DataSpecs("0017","RP15151KK","150Ω",0.58),
        new M22DataSpecs("0018","RP15201KK","200Ω",0.50),
        new M22DataSpecs("0019","RP15251KK","250Ω",0.45),
        new M22DataSpecs("0020","RP15351KK","350Ω",0.38),
        new M22DataSpecs("0021","RP15501KK","500Ω",0.32),
        new M22DataSpecs("0022","RP15751KK","750Ω",0.26),
        new M22DataSpecs("0023","RP15102KK","1000Ω",0.22),
        new M22DataSpecs("0024","RP15152KK","1500Ω",0.18),
        new M22DataSpecs("0025","RP15252KK","2500Ω",0.14),
        new M22DataSpecs("0026","RP15352KK","3500Ω",0.12),
        new M22DataSpecs("0027","RP15502KK","5000Ω",0.10),
        new M22DataSpecs("0028","RP15802KK","8000Ω",0.08),
        new M22DataSpecs("0029","RP15103KK","10000Ω",0.07)
    ],
    "M22/03" : [
        new M22DataSpecs("0001","RP102R0KK","2.0Ω",3.54),
        new M22DataSpecs("0002","RP102R5KK","2.5Ω",3.16),
        new M22DataSpecs("0003","RP103R0KK","3.0Ω",2.89),
        new M22DataSpecs("0004","RP105R0KK","5.0Ω",2.24),
        new M22DataSpecs("0005","RP106R0KK","6.0Ω",2.04),
        new M22DataSpecs("0006","RP108R0KK","8.0Ω",1.77),
        new M22DataSpecs("0008","RP10150KK","15Ω",1.29),
        new M22DataSpecs("0007","RP10100KK","10Ω",1.58),
        new M22DataSpecs("0009","RP10250KK","25Ω",1.00),
        new M22DataSpecs("0010","RP10350KK","35Ω",0.85),
        new M22DataSpecs("0011","RP10500KK","50Ω",0.71),
        new M22DataSpecs("0012","RP10750KK","75Ω",0.58),
        new M22DataSpecs("0013","RP10101KK","100Ω",0.50),
        new M22DataSpecs("0014","RP10151KK","150Ω",0.41),
        new M22DataSpecs("0015","RP10201KK","200Ω",0.35),
        new M22DataSpecs("0016","RP10251KK","250Ω",0.32),
        new M22DataSpecs("0017","RP10351KK","350Ω",0.27),
        new M22DataSpecs("0018","RP10501KK","500Ω",0.22),
        new M22DataSpecs("0019","RP10751KK","750Ω",0.18),
        new M22DataSpecs("0020","RP10102KK","1000Ω",0.16),
        new M22DataSpecs("0021","RP10152KK","1500Ω",0.13),
        new M22DataSpecs("0022","RP10252KK","2500Ω",0.10),
        new M22DataSpecs("0023","RP10352KK","3500Ω",0.08),
        new M22DataSpecs("0024","RP10502KK","5000Ω",0.07),
        new M22DataSpecs("0025","RP101R0KK","1.0Ω",5.0),
        new M22DataSpecs("0026","RP10301KK","300Ω",0.29)
    ],
    "shaftDataArr" : [
        new M22ShaftData("FD","Flatted","Standard",0.875,0.250),
        new M22ShaftData("FH","Flatted","Standard",1.50,0.250),
        new M22ShaftData("FJ","Flatted","Standard",2.00,0.250),
        new M22ShaftData("FK","Flatted","Standard",2.50,0.250),
        new M22ShaftData("FN","Flatted","Standard",4.00,0.250),
        new M22ShaftData("FR","Flatted","Standard",6.00,0.250),
        new M22ShaftData("TG","Flatted","Locking",1.25,0.250),
        new M22ShaftData("SA","Slotted","Standard",0.50,0.250),
        new M22ShaftData("SD","Slotted","Standard",0.875,0.250),
        new M22ShaftData("SH","Slotted","Standard",1.50,0.250),
        new M22ShaftData("SJ","Slotted","Standard",2.00,0.250),
        new M22ShaftData("SK","Slotted","Standard",2.50,0.250),
        new M22ShaftData("UB","Slotted","Locking",0.625,0.250),
        new M22ShaftData("UG","Slotted","Locking",1.250,0.250)
    ],
    "milFuseHolderArr" : [ 
        new MilF19207("MIL-F-19207/1","FHL10U","HGA-C","30A,90-250V","F02,F03","Clear,Neon,Flat-Sided Knob",2,"1/8\""),
        new MilF19207("MIL-F-19207/1","FHL10G","-","30A,90-250V","F02,F03","Clear,Neon,Flat-Sided Knob",2,"1/8\""),
        new MilF19207("MIL-F-19207/2","FHL11U","HGB-C","30A,90-250V","F02,F03","Clear,Neon,Flat-Sided Knob",1,"1/8\""),
        new MilF19207("MIL-F-19207/2","FHL11G","-","30A,90-250V","F02,F03","Clear,Neon,Flat-Sided Knob",1,"1/8\""),
        new MilF19207("MIL-F-19207/3","FHL12U","HGC Series","30A,90-250V","F60,F07,F09","Clear,Neon,Octagonal",1,"1/8\""),
        new MilF19207("MIL-F-19207/3","FHL12G","-","30A,90-250V","F60,F07,F09","Clear,Neon,Octagonal",1,"1/8\""),
        new MilF19207("MIL-F-19207/3","FHL17G1","HKL","20A,90-250V","F02,F03","Clear,Neon,Octagonal",1,"1/8\""),
        new MilF19207("MIL-F-19207/8","FHL17G1","20A,90-250V","F02,F03","Clear,Neon,Octagonal",1,"1/8\""),
        new MilF19207("MIL-F-19207/9","FHL18G1-1","HKX","20A,12-22V","F02,F03","Amber,incandescent,Flat-Sided Knob",1,"1/16\""),
        new MilF19207("MIL-F-19207/9","FHL18G1-2","HKX","20A,23-33V","F02,F03","Amber,incandescent,Flat-Sided Knob",1,"1/16\""),
        new MilF19207("MIL-F-19207/9","FHL18G1-3","HKX","20A,34-45V","F02,F03","Amber,incandescent,Flat-Sided Knob",1,"1/16\""),
        new MilF19207("MIL-F-19207/9","FHL18G1-4","HKX","20A,46-60V","F02,F03","Amber,incandescent,Flat-Sided Knob",1,"1/16\""),
        new MilF19207("MIL-F-19207/9","FHL18G1-5","HKX","20A,61-80V","F02,F03","Amber,incandescent,Flat-Sided Knob",1,"1/16\""),
        new MilF19207("MIL-F-19207/9","FHL18G1-6","HKX","20A,81-91V","F02,F03","Amber,incandescent,Flat-Sided Knob",1,"1/16\""),
        new MilF19207("MIL-F-19207/9","FHL18G1-7","HKX","20A,2.5-4V","F02,F03","Amber,incandescent,Flat-Sided Knob",1,"1/16\""),
        new MilF19207("MIL-F-19207/9","FHL18G1-8","HKX","20A,5-7V","F02,F03","Amber,incandescent,Flat-Sided Knob",1,"1/16\""),
        new MilF19207("MIL-F-19207/9","FHL18G1-9","HKX","20A,8-12V","F02,F03","Amber,incandescent,Flat-Sided Knob",1,"1/16\""),
        new MilF19207("MIL-F-19207/10","FHN19G","HCM","15A,250V","F05,F06","Bayonet",1,"1/16\""),
        new MilF19207("MIL-F-19207/11","FHN20G","HTA","20A,250V","F02,F03","Bayonet",1,"1/16\""),
        new MilF19207("MIL-F-19207/12","FHL22W","HPF-C","15A,250V","F10","Clear",1,"1/16\""),
        new MilF19207("MIL-F-19207/13","FHN23W","HPC-D","30A,500V","F60,F09","Screw",1,"1/16\""),
        new MilF19207("MIL-F-19207/16","FHN26G1","HKP","30A,250V","F02,F03","Bayonet",1,"1/16\""),
        new MilF19207("MIL-F-19207/18","FHL29G-1","HGN-CI","30A,12-22V","F02,F03","Amber,incandescent,Flat-Sided Knob",2,"1/8\""),
        new MilF19207("MIL-F-19207/18","FHL29G-2","HGN-CI","30A,23-33V","F02,F03","Amber,incandescent,Flat-Sided Knob",2,"1/8\""),
        new MilF19207("MIL-F-19207/18","FHL29G-3","HGN-CI","30A,34-45V","F02,F03","Amber,incandescent,Flat-Sided Knob",2,"1/8\""),
        new MilF19207("MIL-F-19207/18","FHL29G-4","HGN-CI","30A,46-60V","F02,F03","Amber,incandescent,Flat-Sided Knob",2,"1/8\""),
        new MilF19207("MIL-F-19207/18","FHL29G-5","HGN-CI","30A,61-80V","F02,F03","Amber,incandescent,Flat-Sided Knob",2,"1/8\""),
        new MilF19207("MIL-F-19207/18","FHL29G-6","HGN-CI","30A,81-90V","F02,F03","Amber,incandescent,Flat-Sided Knob",2,"1/8\""),
        new MilF19207("MIL-F-19207/19","FHL30G-1","HGF-C","30A,12-22V","F02,F03","Amber,incandescent,Flat-Sided Knob",1,"1/8\""),
        new MilF19207("MIL-F-19207/19","FHL30G-2","HGF-C","30A,23-33V","F02,F03","Amber,incandescent,Flat-Sided Knob",1,"1/8\""),
        new MilF19207("MIL-F-19207/19","FHL30G-3","HGF-C","30A,34-45V","F02,F03","Amber,incandescent,Flat-Sided Knob",1,"1/8\""),
        new MilF19207("MIL-F-19207/19","FHL30G-4","HGF-C","30A,46-60V","F02,F03","Amber,incandescent,Flat-Sided Knob",1,"1/8\""),
        new MilF19207("MIL-F-19207/19","FHL30G-5","HGF-C","30A,61-80V","F02,F03","Amber,incandescent,Flat-Sided Knob",1,"1/8\""),
        new MilF19207("MIL-F-19207/19","FHL30G-6","HGF-C","30A,81-90V","F02,F03","Amber,incandescent,Flat-Sided Knob",1,"1/8\""),
        new MilF19207("MIL-F-19207/20","FHN31G1","HJM","5A,250V","F01","Bayonet",1,"1/16\""),
        new MilF19207("MIL-F-19207/26","FHN42W","HWA-AF","5A,125V","FM01","-",1,"1/8\""),
        new MilF19207("MIL-F-19207/36","FHN55W","HKP/RFI","30A,250V","F02,F03","RFI Shield",1,"1/8\""),
        new MilF19207("MIL-F-19207/38","FHL57G","-","15A,125V","F77A","Clear,Neon,Flat-Sided Knob",2,"1/8\"")
    ],
    // tedss
    "251" : [
        new LittleFuse(.062,".062",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial" ,true,true,false),
        new LittleFuse(.125,".125",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial" ,true,true,false),
        new LittleFuse(.200,".200",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial" ,true,true,false),
        new LittleFuse(.250,".250",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial" ,true,true,false),
        new LittleFuse(.375,".375",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial" ,true,true,false),
        new LittleFuse(.500,".500",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial" ,true,true,false),
        new LittleFuse(.630,".630",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial" ,true,true,false),
        new LittleFuse(.750,".750",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial" ,true,true,false),
        new LittleFuse(1.0,"001.",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial",true,true,true),
        new LittleFuse(1.2,"1.25",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial",true,true,true),
        new LittleFuse(1.5,"01.5",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial",true,true,true),
        new LittleFuse(2.0,"002.",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial",true,true,true),
        new LittleFuse(2.5,"02.5",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial",true,true,true),
        new LittleFuse(3.0,"003.",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial",true,true,true),
        new LittleFuse(3.5,"03.5",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial",true,true,true),
        new LittleFuse(4.0,"004.",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial",true,true,true),
        new LittleFuse(5.0,"005.",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial",true,true,true),
        new LittleFuse(7.0,"007.",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial",true,true,false),
        new LittleFuse(10.0,"010.",125,"300A@125VDC \n 50A@125VAC","fast-acting","commercial",true,true,false),
        new LittleFuse(12.0,"012.",32,"300A @ 32VDC \n 50A @ 32VAC","fast-acting","commercial",true,true,false),
        new LittleFuse(15.0,"015.",32,"300A @ 32VDC \n 50A @ 32VAC","fast-acting","commercial",true,true,false)
    ],
    "253" : [
        new LittleFuse(0.062,".062",125,"300A@125VDC \n 50A@125VAC","fast-acting","military",true,true,false),
        new LittleFuse(0.125,".125",125,"300A@125VDC \n 50A@125VAC","fast-acting","military",true,true,false),
        new LittleFuse(0.250,".250",125,"300A@125VDC \n 50A@125VAC","fast-acting","military",true,true,false),
        new LittleFuse(0.375,".375",125,"300A@125VDC \n 50A@125VAC","fast-acting","military",true,true,false),
        new LittleFuse(0.500,".500",125,"300A@125VDC \n 50A@125VAC","fast-acting","military",true,true,false),
        new LittleFuse(0.750,".750",125,"300A@125VDC \n 50A@125VAC","fast-acting","military",true,true,true),
        new LittleFuse(1.0,"001.",125,"300A@125VDC \n 50A@125VAC","fast-acting","military",true,true,true),
        new LittleFuse(1.5,"01.5",125,"300A@125VDC \n 50A@125VAC","fast-acting","military",true,true,true),
        new LittleFuse(2.0,"002.",125,"300A@125VDC \n 50A@125VAC","fast-acting","military",true,true,true),
        new LittleFuse(3.0,"003.",125,"300A@125VDC \n 50A@125VAC","fast-acting","military",true,true,true),
        new LittleFuse(4.0,"004.",125,"300A@125VDC \n 50A@125VAC","fast-acting","military",true,true,true),
        new LittleFuse(5.0,"005.",125,"300A@125VDC \n 50A@125VAC","fast-acting","military",true,true,true),
        new LittleFuse(7.0,"007.",125,"300A@125VDC \n 50A@125VAC","fast-acting","military",true,true,false),
        new LittleFuse(10.0,"010.",125,"300A@125VDC \n 50A@125VAC","fast-acting","military",true,true,false),
        new LittleFuse(15.0,"015.",32,"300A @ 32VDC \n 50A @ 32VAC","fast-acting","military",true,true,false)
    ],
    "263" : [
        new LittleFuse(0.062,".062",250,"50A@250VDC \n PSE: 100A@125VAC","fast-acting","commercial",true,false,false),
        new LittleFuse(0.125,".125",250,"50A@250VDC \n PSE: 100A@125VAC","fast-acting","commercial",true,true,false),
        new LittleFuse(0.250,".250",250,"50A@250VDC \n PSE: 100A@125VAC","fast-acting","commercial",true,true,false),
        new LittleFuse(0.375,".375",250,"50A@250VDC \n PSE: 100A@125VAC","fast-acting","commercial",true,true,false),
        new LittleFuse(0.500,".500",250,"50A@250VDC \n PSE: 100A@125VAC","fast-acting","commercial",true,true,false),
        new LittleFuse(0.750,".750",250,"50A@250VDC \n PSE: 100A@125VAC","fast-acting","commercial",true,true,false),
        new LittleFuse(1.0,"001.",250,"50A@250VDC \n PSE: 100A@125VAC","fast-acting","commercial",true,true,true),
        new LittleFuse(1.5,"01.5",250,"50A@250VDC \n PSE: 100A@125VAC","fast-acting","commercial",true,true,true),
        new LittleFuse(2.0,"002.",250,"50A@250VDC \n PSE: 100A@125VAC","fast-acting","commercial",true,true,true),
        new LittleFuse(2.5,"02.5",250,"50A@250VDC \n PSE: 100A@125VAC","fast-acting","commercial",true,true,true),
        new LittleFuse(3.0,"003.",250,"50A@250VDC \n PSE: 100A@125VAC","fast-acting","commercial",true,true,true),
        new LittleFuse(3.5,"03.5",250,"50A@250VDC \n PSE: 100A@125VAC","fast-acting","commercial",true,true,true),
        new LittleFuse(4.0,"004.",250,"50A@250VDC \n PSE: 100A@125VAC","fast-acting","commercial",true,true,true),
        new LittleFuse(5.0,"005.",250,"50A@250VDC \n PSE: 100A@125VAC","fast-acting","commercial",true,true,true)
    ],
    "275" : [
        new LittleFuse(20.0,"020.",32,"300A@32VDC \n 100A@32VAC","fast-acting","commercial",true,false,false),
        new LittleFuse(25.0,"025.",32,"300A@32VDC \n 100A@32VAC","fast-acting","commercial",true,false,false),
        new LittleFuse(30.0,"030.",32,"300A@32VDC \n 100A@32VAC","fast-acting","commercial",true,false,false)
    ],
    "265" : [
        new LittleFuse(0.062,".062",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(0.125,".125",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(0.250,".250",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(0.375,".375",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(0.500,".500",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(0.750,".750",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(1.0,"001.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(1.5,"01.5",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(2.0,"002.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(2.5,"02.5",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(3.0,"003.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(4.0,"004.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(7.0,"007.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(10.0,"010.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(15.0,"015.",32,"300A@32VDC \n 50A@32VAC","fast-acting","commercial",false,true,false)
    ],
    "266" : [
        new LittleFuse(0.062,".062",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(0.125,".125",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(0.250,".250",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(0.375,".375",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(0.500,".500",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(0.750,".750",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(1.0,"001.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(1.5,"01.5",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(2.0,"002.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(2.5,"02.5",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(3.0,"003.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(4.0,"004.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(7.0,"007.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(10.0,"010.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","commercial",false,true,false),
        new LittleFuse(15.0,"015.",32,"300A @ 32VDC \n 50A @ 32VAC","fast-acting","commercial",false,true,false)
    ],
    "267" : [
        new LittleFuse(0.062,".062",125,"300A@1250VDC \n 50A@125VAC","fast-acting","military",false,true,false),
        new LittleFuse(0.125,".125",125,"300A@1250VDC \n 50A@125VAC","fast-acting","military",false,true,false),
        new LittleFuse(0.250,".250",125,"300A@1250VDC \n 50A@125VAC","fast-acting","military",false,true,false),
        new LittleFuse(0.375,".375",125,"300A@1250VDC \n 50A@125VAC","fast-acting","military",false,true,false),
        new LittleFuse(0.500,".500",125,"300A@1250VDC \n 50A@125VAC","fast-acting","military",false,true,false),
        new LittleFuse(0.750,".750",125,"300A@1250VDC \n 50A@125VAC","fast-acting","military",false,true,false),
        new LittleFuse(1.0,"001.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","military",false,true,false),
        new LittleFuse(1.5,"01.5",125,"300A@1250VDC \n 50A@125VAC","fast-acting","military",false,true,false),
        new LittleFuse(2.0,"002.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","military",false,true,false),
        new LittleFuse(2.5,"02.5",125,"300A@1250VDC \n 50A@125VAC","fast-acting","military",false,true,false),
        new LittleFuse(3.0,"003.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","military",false,true,false),
        new LittleFuse(4.0,"004.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","military",false,true,false),
        new LittleFuse(7.0,"007.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","military",false,true,false),
        new LittleFuse(10.0,"010.",125,"300A@1250VDC \n 50A@125VAC","fast-acting","military",false,true,false),
        new LittleFuse(15.0,"015.",32,"300A@32VDC \n 50A@32VAC","fast-acting","military",false,true,false)
    ],
    "471" : [
        new LittleFuse(0.500,".500",125,"50A@1250VAC/DC","slo-blo","commercial",false,true,false),
        new LittleFuse(1.0,"001.",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,true),
        new LittleFuse(1.5,"01.5",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,true),
        new LittleFuse(2.0,"002.",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,true),
        new LittleFuse(2.5,"02.5",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,true),
        new LittleFuse(3.0,"003.",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,true),
        new LittleFuse(3.5,"03.5",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,true),
        new LittleFuse(4.0,"004.",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,true),
        new LittleFuse(5.0,"005.",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,true)
    ],
    "472" : [
        new LittleFuse(0.500,".500",125,"50A@1250VAC/DC","slo-blo","commercial",true,false,false),
        new LittleFuse(1.0,"001.",125,"50A@1250VAC/DC","slo-blo","commercial",true,false,false),
        new LittleFuse(1.5,"01.5",125,"50A@1250VAC/DC","slo-blo","commercial",true,false,false),
        new LittleFuse(2.0,"002.",125,"50A@1250VAC/DC","slo-blo","commercial",true,false,false),
        new LittleFuse(2.5,"02.5",125,"50A@1250VAC/DC","slo-blo","commercial",true,false,false),
        new LittleFuse(3.0,"003.",125,"50A@1250VAC/DC","slo-blo","commercial",true,false,false),
        new LittleFuse(5.0,"005.",125,"50A@1250VAC/DC","slo-blo","commercial",true,false,false)
    ],
    "473" : [
        new LittleFuse(0.375,".375",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,false),
        new LittleFuse(0.500,".500",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,false),
        new LittleFuse(0.750,".750",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,false),
        new LittleFuse(1.0,"001.",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,true),
        new LittleFuse(1.5,"01.5",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,true),
        new LittleFuse(2.0,"002.",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,true),
        new LittleFuse(2.5,"02.5",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,true),
        new LittleFuse(3.0,"003.",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,true),
        new LittleFuse(4.0,"004.",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,true),
        new LittleFuse(5.0,"005.",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,true),
        new LittleFuse(7.0,"007.",125,"50A@1250VAC/DC","slo-blo","commercial",true,true,false)
    ],
    "MQ" : [
        new SubminiFuse("MQ250",0.250,125,"fast-acting"),
        new SubminiFuse("MQ300",0.300,125,"fast-acting"),
        new SubminiFuse("MQ375",0.375,125,"fast-acting"),
        new SubminiFuse("MQ500",0.500,125,"fast-acting"),
        new SubminiFuse("MQ750",0.750,125,"fast-acting"),
        new SubminiFuse("MQ1",1,125,"fast-acting"),
        new SubminiFuse("MQ1.5",1.5,125,"fast-acting"),
        new SubminiFuse("MQ2","2",125,"fast-acting"),
        new SubminiFuse("MQ2.5",2.5,125,"fast-acting"),
        new SubminiFuse("MQ3",3,125,"fast-acting"),
        new SubminiFuse("MQ4",4,125,"fast-acting"),
        new SubminiFuse("MQ5",5,125,"fast-acting"),
        new SubminiFuse("MQ7",7,125,"fast-acting"),
        new SubminiFuse("MQ10",10,125,"fast-acting"),
        new SubminiFuse("MQ12",12,125,"fast-acting"),
        new SubminiFuse("MQ15",15,125,"fast-acting")
    ],
    "MS" : [
        new SubminiFuse("MS250",0.250,125,"slo-blo"),
        new SubminiFuse("MS350",0.300,125,"slo-blo"),
        new SubminiFuse("MS375",0.375,125,"slo-blo"),
        new SubminiFuse("MS500",0.500,125,"slo-blo"),
        new SubminiFuse("MS750",0.750,125,"slo-blo"),
        new SubminiFuse("MS1",1,125,"slo-blo"),
        new SubminiFuse("MS1.25",1.25,125,"slo-blo"),
        new SubminiFuse("MS1.5",1.5,125,"slo-blo"),
        new SubminiFuse("MS2",2,125,"slo-blo"),
        new SubminiFuse("MS2.5",2.5,125,"slo-blo"),
        new SubminiFuse("MS3",3,125,"slo-blo"),
        new SubminiFuse("MS4",4,125,"slo-blo"),
        new SubminiFuse("MS5",5,125,"slo-blo"),
        new SubminiFuse("MS7",7,125,"slo-blo")
    ],
    "MCRW" : [
        new SubminiFuse("MCRW100mA",0.100,125,"fast-acting"),
        new SubminiFuse("MCRW15mA",0.125,125,"fast-acting"),
        new SubminiFuse("MCRW150mA",0.150,125,"fast-acting"),
        new SubminiFuse("MCRW200mA",0.200,125,"fast-acting"),
        new SubminiFuse("MCRW250mA",0.250,125,"fast-acting"),
        new SubminiFuse("MCRW300mA",0.300,125,"fast-acting"),
        new SubminiFuse("MCRW375mA",0.375,125,"fast-acting"),
        new SubminiFuse("MCRW500mA",0.500,125,"fast-acting"),
        new SubminiFuse("MCRW750mA",0.750,125,"fast-acting"),
        new SubminiFuse("MCRW1A",1,125,"fast-acting"),
        new SubminiFuse("MCRW1.5A",1.5,125,"fast-acting"),
        new SubminiFuse("MCRW2A",2,125,"fast-acting"),
        new SubminiFuse("MCRW2.5A",2.5,125,"fast-acting"),
        new SubminiFuse("MCRW3A",3,125,"fast-acting"),
        new SubminiFuse("MCRW4A",4,125,"fast-acting"),
        new SubminiFuse("MCRW5A",5,125,"fast-acting"),
        new SubminiFuse("MCRW7A",7,125,"fast-acting"),
        new SubminiFuse("MCRW10A",10,125,"fast-acting"),
        new SubminiFuse("MCRW12A",12,125,"fast-acting"),
        new SubminiFuse("MCRW15A",15,125,"fast-acting")
    ]
};
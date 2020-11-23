///////////////////////////////////////////////////////////////////////////////////////////////

var FomoPop = {
    fpValue: "",
    config : {
        "el": "#fomopop",
        "template": `New Member in:<br />&nbsp;&nbsp;&nbsp;fpValue`,//`New Member in:<br />&nbsp;&nbsp;&nbsp; + ${fpValue}`,
        "display": 5000,
        "start": 5000, 
        "interval": 30000 
    },
    intervalTimer: "",
    cityMap: [],
    cityList : [],

    show() {
        clearTimeout(FomoPop.intervalTimer);
        var pos = Math.floor(Math.random() * FomoPop.cityList.length-1); 
        var fpValue = FomoPop.cityList[pos];
        var message = FomoPop.config.template;
        message = message.replace("fpValue",fpValue);
        document.querySelector(FomoPop.config.el).innerHTML = message;
        console.log(document.querySelector(FomoPop.config.el).innerHTML);
        var x = document.querySelector(FomoPop.config.el);
        x.className = "show";
        setTimeout(function(){ 
            x.className = x.className.replace("show", ""); 
            FomoPop.intervalTimer = setTimeout(function(){ FomoPop.show() }, FomoPop.config.interval);
        }, FomoPop.config.display);
    },
    loadCityMap() {
        for (var state in FomoPop.config.cityMap) {
            for (var city in FomoPop.config.cityMap[state]) {
                FomoPop.cityList.push(FomoPop.config.cityMap[state][city].toLowerCase().fomoCapitalize() + ", " + state.toLowerCase().fomoCapitalize());
            }
        }
    },
    
    runCity() {
        FomoPop.show();
        //FomoPop.intervalTimer = setTimeout(function(){ FomoPop.runCity() }, FomoPop.config.interval);
    },

    stop() {
        FomoPop = null;
    },

    run(config = {"el": "#snackbar", "template": `New Member in:<br />&nbsp;&nbsp;&nbsp;fpValue`, "display": 5000, "start": 5000, "interval": 30000,"cityMap": cityMap } ) {
        FomoPop.config = config;
        FomoPop.loadCityMap();
        setTimeout(function(){ FomoPop.runCity() }, FomoPop.config.start);
    }
}



String.prototype.fomoCapitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

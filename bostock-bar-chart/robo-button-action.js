// button action code for smart robo investments
      function initElement() {
      
        // boolean switch for logging to console for debugging button actions
        var reportStatus = true;
        
        // set hard limits for min and max of each class of assets
        // these will vary with the type of investor
        var cashMin = 0;
        var reitMin = 0;
        var bondsMin = 0;
        var fundMin = 0;
        var selfMin = 0;
        
        var cashMax = 100;
        var reitMax = 100;
        var bondsMax = 100;
        var fundMax = 100;
        var selfMax = 100;
        
        // initialize asset values        
        var cashValue = 100;
        var reitValue = 0;
        var bondsValue = 0;
        var fundValue = 0;
        var selfValue = 0;
         
        var reitPlus = document.getElementById("reitPlus");
        var bondsPlus = document.getElementById("bondsPlus");
        var fundPlus = document.getElementById("fundPlus");
        var selfPlus = document.getElementById("selfPlus");
        var reitMinus = document.getElementById("reitMinus");
        var bondsMinus = document.getElementById("bondsMinus");
        var fundMinus = document.getElementById("fundMinus");
        var selfMinus = document.getElementById("selfMinus");

        // NOTE: showAlert(); or showAlert(param); will NOT work here.
        // Must be a reference to a function name, not a function call.
        reitPlus.onclick = function() {
            if (reportStatus) console.log("detected reitPlus event");
            if ((reitValue + 1 <= reitMax) && ((cashValue - 1) >= cashMin)) {
                reitValue ++;
                cashValue--; 
            };               
            if (reportStatus) listValues();    
        };
      
        bondsPlus.onclick = function() {
            if (reportStatus) console.log("detected bondsPlus event");
                if ((bondsValue + 1 <= bondsMax) && ((cashValue - 1) >= cashMin)) {
                bondsValue ++;
                cashValue--; 
            };               
            if (reportStatus) listValues();    
        };

        fundPlus.onclick = function() {
            if (reportStatus) console.log("detected fundPlus event");
            if ((fundValue + 1 <= fundMax) && ((cashValue - 1) >= cashMin)) {
                fundValue ++;
                cashValue--; 
            };               
            if (reportStatus) listValues();    
        };

        selfPlus.onclick = function() {
            if (reportStatus) console.log("detected var selfPlus event");
            if ((selfValue + 1 <= selfMax) && ((cashValue - 1) >= cashMin)) {
                selfValue ++;
                cashValue--; 
            };               
            if (reportStatus) listValues();    
        };

        reitMinus.onclick = function() {
            if (reportStatus) console.log("detected reitMinus event");
            if ((reitValue - 1 >= reitMin) && ((cashValue + 1) <= cashMax)) {
                cashValue ++;
                reitValue--; 
            };               
            if (reportStatus) listValues();    
        };
      
        bondsMinus.onclick = function() {
            if (reportStatus) console.log("detected bondsMinus event");
            
            if ((bondsValue - 1 >= bondsMin) && ((cashValue + 1) <= cashMax)) {
                cashValue ++;
                bondsValue--; 
            };               
            if (reportStatus) listValues();    
        }

        fundMinus.onclick = function() {
            if (reportStatus) console.log("detected fundMinus event");
            
            if ((fundValue - 1 >= fundMin) && ((cashValue + 1) <= cashMax)) {
                cashValue ++;
                fundValue--; 
            };               
            if (reportStatus) listValues();    
        };
      
        selfMinus.onclick = function() {
            if (reportStatus) console.log("detected selfMinus event");
            
            if ((selfValue - 1 >= selfMin) && ((cashValue + 1) <= cashMax)) {
                cashValue ++;
                selfValue--; 
            };               
            if (reportStatus) listValues();    
        };

        function listValues() {
            console.log("cashValue: ", cashValue);
            console.log("reitValue: ", reitValue);
            console.log("bondsValue: ", bondsValue);
            console.log("fundValue: ", fundValue);
            console.log("selfValue: ", selfValue);
        };    
                                        



};


    
  
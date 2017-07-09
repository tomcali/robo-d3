// ensure that d3 code executes only after the document is ready
$( document ).ready(function() {
// set the dimensions and margins of the graph
var margin = {top: 80, right: 20, bottom: 30, left: 60},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

 // define asset variable names       
        var cashValue;
        var reitValue;
        var bondsValue;
        var fundValue;
        var selfValue;
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#barchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// set the investment objective for this illustration
// the actual app will have a survey that determines 
// the initial investment objective
var objective = "Capital Preservation";
// var objective = "Total Return";
// var objective = "Aggressive Growth";
// var objective = "Tactical Momentum";
    
// initialize asset variable values/defaults to match investment objective    
if (objective === "Capital Preservation") {
    cashValue = 30;
    reitValue = 5;
    bondsValue = 15;
    fundValue = 40;
    selfValue = 10
    };
    
if (objective === "Total Return") {
    cashValue = 10;
    reitValue = 5;
    bondsValue = 35;
    fundValue = 40;
    selfValue = 10
    };    
    
if (objective === "Aggressive Growth") {
    cashValue = 10;
    reitValue = 15;
    bondsValue = 5;
    fundValue = 30;
    selfValue = 20
    };

if (objective === "Tactical Momentum") {
    cashValue = 10;
    reitValue = 25;
    bondsValue = 5;
    fundValue = 30;
    selfValue = 30
    };

// variables required for modifying asset positions 
// in response to user button activity
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
    
// data array object with default settings for investment objective
var data = [
  {asset: "Cash", amount: cashValue},
  {asset: "REIT (Real Estate Investment Trust)", amount: reitValue},
  {asset: "Bonds", amount: bondsValue},
  {asset: "Smart Fund (Smart Robo Investments)", amount: fundValue},
  {asset: "My Stocks (Personal Selections)", amount: selfValue}
];

// this function makes the figure... initially and with data updates
function makefigure() {

// clear out the previous bar chart
d3.selectAll('svg > g > *').remove();

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.asset; }));
  y.domain([0, d3.max(data, function(d) { return d.amount; })]);
  
  // make the title of the figure
  svg.append("text")
      .attr("class", "title")
      .attr("x", x(data[0].name))
      .attr("y", -26)
      .text("Investment Allocation across Asset Types");


  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
       .transition().duration(200).ease(d3.easeCircleIn)
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.asset); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.amount); })
      .attr("height", function(d) { return height - y(d.amount); });

// add asset value annotation at top of bars
			svg.selectAll(".labels")
			   .data(data)
			   .enter().append("text")
               .transition().delay(400).duration(200).ease(d3.easeCircleIn)
			   .text(function(d) {
			   		return d.amount;
			   })
			   .attr("text-anchor", "middle")
               .attr("x", function(d) { return x(d.asset) + 50; })
               .attr("y", function(d) { return y(d.amount) - 2; })               
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "20px")
			   .attr("fill", "black");

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll(".tick text")
      .call(wrap, x.bandwidth());

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

  // text label for the y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Investment Portfolio Percentage");      
};

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      };
    };
  });
};

makefigure();

// update data on user button activity when appropriate 
// (no values less than zero or greater than 100)
d3.selectAll("body").select("#reitPlus")
    .on("click", function() {
        if (reportStatus) console.log("detected reitPlus event");
        if ((reitValue + 1 <= reitMax) && ((cashValue - 1) >= cashMin)) {
                reitValue ++;
                cashValue--; 
        };               
        if (reportStatus) listValues();   
        
        data = [
  {asset: "Cash", amount: cashValue},
  {asset: "REIT (Real Estate Investment Trust)", amount: reitValue},
  {asset: "Bonds", amount: bondsValue},
  {asset: "Smart Fund (Smart Robo Investments)", amount: fundValue},
  {asset: "My Stocks (Personal Selections)", amount: selfValue}
];

if (reportStatus) console.log(data);  
makefigure();     
});

d3.selectAll("body").select("#bondsPlus")
    .on("click", function() {
            if (reportStatus) console.log("detected bondsPlus event");
                if ((bondsValue + 1 <= bondsMax) && ((cashValue - 1) >= cashMin)) {
                bondsValue ++;
                cashValue--; 
            };               
            if (reportStatus) listValues();    
});

d3.selectAll("body").select("#fundPlus")
    .on("click", function() {
            if (reportStatus) console.log("detected fundPlus event");
            if ((fundValue + 1 <= fundMax) && ((cashValue - 1) >= cashMin)) {
                fundValue ++;
                cashValue--; 
            };               
            if (reportStatus) listValues();    
});


d3.selectAll("body").select("#selfPlus")
    .on("click", function() {
            if (reportStatus) console.log("detected var selfPlus event");
            if ((selfValue + 1 <= selfMax) && ((cashValue - 1) >= cashMin)) {
                selfValue ++;
                cashValue--; 
            };               
            if (reportStatus) listValues();    
});


d3.selectAll("body").select("#reitMinus")
    .on("click", function() {
            if (reportStatus) console.log("detected reitMinus event");
            if ((reitValue - 1 >= reitMin) && ((cashValue + 1) <= cashMax)) {
                cashValue ++;
                reitValue--; 
            };               
            if (reportStatus) listValues();    
});


d3.selectAll("body").select("#bondsMinus")
    .on("click", function() {
            if (reportStatus) console.log("detected bondsMinus event");
            
            if ((bondsValue - 1 >= bondsMin) && ((cashValue + 1) <= cashMax)) {
                cashValue ++;
                bondsValue--; 
            };               
            if (reportStatus) listValues();    
});


d3.selectAll("body").select("#fundMinus")
    .on("click", function() {
            if (reportStatus) console.log("detected fundMinus event");
            
            if ((fundValue - 1 >= fundMin) && ((cashValue + 1) <= cashMax)) {
                cashValue ++;
                fundValue--; 
            };               
            if (reportStatus) listValues();    
});


d3.selectAll("body").select("#selfMinus")
    .on("click", function() {
            if (reportStatus) console.log("detected selfMinus event");
            
            if ((selfValue - 1 >= selfMin) && ((cashValue + 1) <= cashMax)) {
                cashValue ++;
                selfValue--; 
            };               
            if (reportStatus) listValues();    
});


// used for console reporting of results from button pressing when reportStatus is true
        function listValues() {
            console.log("cashValue: ", cashValue);
            console.log("reitValue: ", reitValue);
            console.log("bondsValue: ", bondsValue);
            console.log("fundValue: ", fundValue);
            console.log("selfValue: ", selfValue);
        };    

}); // end document ready function




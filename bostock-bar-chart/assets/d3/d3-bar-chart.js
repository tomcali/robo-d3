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
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#barchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// initial settings of data values for capital preservation objective
var data = [
  {asset: "Cash", amount: 30},
  {asset: "REIT (Real Estate Investment Trust)", amount: 5},
  {asset: "Bonds", amount: 15},
  {asset: "Smart Fund (Smart Robo Investments)", amount: 40},
  {asset: "My Stocks (Personal Selections)", amount: 10}
];

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.asset; }));
  y.domain([0, d3.max(data, function(d) { return d.amount; })]);
  
  svg.append("text")
      .attr("class", "title")
      .attr("x", x(data[0].name))
      .attr("y", -26)
      .text("Percentage Allocation of Assets across Investment Types");


  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.asset); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.amount); })
      .attr("height", function(d) { return height - y(d.amount); });

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll(".tick text")
      .call(wrap, x.bandwidth());

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

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
      }
    }
  });
}

}); // end document ready function




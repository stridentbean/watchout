// start slingin' some d3 here.

var gameBoard = d3.select('.gameBoard').node().getBoundingClientRect();

d3.select('.gameBoard')
  .append("svg")
  .attr({
    height: gameBoard.height - 10,
    width: gameBoard.width - 10
  });

d3.selectAll('svg')
  .append("circle")
  .attr("cx", 300)
  .attr("cy", 300)
  .attr("r", 50)
  .style("fill", "blue");

d3.selectAll("circle")
  .transition()
  .duration(4000)
  .attr("cx", 600)
  .attr("cy", 600);

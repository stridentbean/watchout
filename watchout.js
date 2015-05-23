// start slingin' some d3 here.

//declaring and instantiating variables
var gameBoard = d3.select('.gameBoard').node().getBoundingClientRect();

d3.select('.gameBoard')
  .append("svg")
  .attr({
    height: gameBoard.height - 10,
    width: gameBoard.width - 10
  });


var createAsteroid = function(x, y, diameter) {

  d3.selectAll('svg')
    .append("image")
    .attr("class", "asteroid")
    .attr("x", x)
    .attr("y", y)
    .attr("xlink:href", "asteroid.png")
    .attr("height", diameter)
    .attr("width", diameter);

};

var dragmove = function() {
  d3.select(this)
    .attr({
      x: d3.event.x - 35,
      y: d3.event.y - 35
    });
}

var drag = d3.behavior.drag().on("drag", dragmove);

var createPlayer = function() {
  d3.select("svg")
    .append("image")
    .attr({
      class: "player",
      x: gameBoard.width / 2,
      y: gameBoard.height / 2,
      "xlink:href": "falcon.png",
      height: 70,
      width: 70
    })
    .call(drag);
};

var generateRandomAsteroid = function(num) {
  for(var i = 0; i < num; i++) {
    var x = Math.floor(Math.random() * gameBoard.width);
    var y = Math.floor(Math.random() * gameBoard.height);
    var diameter = Math.floor(Math.random() * 50);
    createAsteroid(x, y, diameter);
  }
}

generateRandomAsteroid(50);
createPlayer();

// d3.selectAll("circle")
//   .transition()
//   .duration(4000)
//   .attr("cx", 100)
//   .attr("cy", 100);

/* Starting the simulation */
var randomGenerator = function(maxSize) {
  return function() {
    return Math.floor(Math.random() * maxSize);
  }
}

var randomlyMoveAsteroid = function() {
  //var x = Math.floor(Math.random() * gameBoard.width);
  //var y = Math.floor(Math.random() * gameBoard.height);
  d3.selectAll('.asteroid')
    .transition()
    .duration(2000)
    .attr('x', randomGenerator(gameBoard.width))
    .attr('y', randomGenerator(gameBoard.height));
};

setInterval(randomlyMoveAsteroid, 2000);

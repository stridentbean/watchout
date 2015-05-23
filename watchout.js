// start slingin' some d3 here.

//declaring and instantiating variables
var gameBoard = d3.select('.gameBoard').node().getBoundingClientRect();

d3.select('.gameBoard')
  .append("svg")
  .attr({
    height: gameBoard.height - 10,
    width: gameBoard.width - 10
  });


var createAsteroid = function(data) {

  d3.select('svg')
    .selectAll('.asteroid')
    .data(data)
    .enter()
    .append('image')
    .attr({
      x: function(d) {return d.x},
      y: function(d) {return d.y},
      "xlink:href": "asteroid.png",
      height: function(d) {return d.diameter},
      width: function(d) {return d.diameter},
      class: "asteroid"
    });



  // d3.selectAll('svg')
  //   .append("image")
  //   .attr("class", "asteroid")
  //   .attr("x", x)
  //   .attr("y", y)
  //   .attr("height", diameter)
  //   .attr("width", diameter);

};





var player = {
  x: gameBoard.width/2,
  y: gameBoard.height/2
};

var dragmove = function() {
  player.x = d3.event.x;
  player.y = d3.event.y;
  d3.select(this)
    .attr({
      x: d3.event.x - 35,
      y: d3.event.y - 35
    });
};

var drag = d3.behavior.drag().on("drag", dragmove);

var createPlayer = function() {
  d3.select("svg")
    .data([player])
    .append("image")
    .attr({
      class: "player",
      x: function(d) { return d.x },
      y: function(d) { return d.y },
      "xlink:href": "falcon.png",
      height: 70,
      width: 70
    })
    .call(drag);
};

var generateRandomAsteroid = function(num) {
  var data = [];
  for(var i = 0; i < num; i++) {
    data[i] = {};
    data[i].x = Math.floor(Math.random() * gameBoard.width);
    data[i].y = Math.floor(Math.random() * gameBoard.height);
    data[i].diameter = Math.floor(Math.random() * 50);
  }
  return data;
};

var asteroidData = generateRandomAsteroid(50);

var collisionCheck = function(player, asteroid) {
  var distance = Math.sqrt(Math.pow(2,(player.x - asteroid.x)) + Math.pow(2, (player.y- asteroid.y)));

  if(distance < 10) {
    return true;
  } else {
    return false;
  }
};

var detectAnyCollisions = function (player) {
  asteroidData.forEach(function(item) {
    if(collisionCheck(player, item)) {
      return true;
    }
  });
  return false;
};

var moveAsteroids = function() {
  asteroidData.forEach(function(item) {
    item.x = randomGenerator(gameBoard.width)();
    item.y = randomGenerator(gameBoard.height)();
  });
};

createAsteroid(asteroidData);
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
  };
};

var randomlyMoveAsteroid = function() {
  moveAsteroids(asteroidData);

  d3.selectAll('.asteroid')
    .data(asteroidData)
    .transition()
    .duration(2000)
    .attr({
      x: function(d) {return d.x},
      y: function(d) {return d.y}
    });

    console.log("called");

    if(detectAnyCollisions(player)) {
      console.log("collision!");
    }
};

//randomlyMoveAsteroid(asteroidData);

setInterval(randomlyMoveAsteroid, 2000);


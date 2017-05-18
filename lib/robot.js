'use strict';

function Robot(bearing, orient) {
  const directions = [ 'north', 'east', 'south', 'west' ]

  this.bearing = bearing
  this.orient = function (direction){
    if (directions.includes(direction)){
      this.bearing = direction
    } else {
      throw new Error('Invalid Robot Bearing');
    }
  }
  this.turnRight = function(){
    let currentBearingIndex = directions.indexOf(this.bearing)
    let newBearingIndex
    if (currentBearingIndex === 3){
      newBearingIndex = 0
    } else {
      newBearingIndex = currentBearingIndex+1
    }
    this.orient(directions[newBearingIndex])
  }
  this.turnLeft = function(){
    let currentBearingIndex = directions.indexOf(this.bearing)
    let newBearingIndex
    if (currentBearingIndex === 0){
      newBearingIndex = 3
    } else {
      newBearingIndex = currentBearingIndex-1
    }
    this.orient(directions[newBearingIndex])
  }
  this.at = function(x,y){
    this.coordinates = [x,y]
  }
  this.advance = function(){
    if (this.bearing === "north"){
      this.coordinates[1] += 1
    } else if (this.bearing === "east"){
      this.coordinates[0] += 1
    } else if (this.bearing === "south"){
      this.coordinates[1] -= 1
    } else if (this.bearing === "west"){
      this.coordinates[0] -= 1
    }
  }
  this.instructions = function(actions){
      let actionsArray = Array.prototype.slice.call(actions)
      let allActions = []
      actionsArray.forEach(function(action){
        if (action === "L") {
          allActions.push("turnLeft")
        } else if (action === "R") {
          allActions.push("turnRight")
        } else if (action === "A") {
          allActions.push("advance")
        }
      })
      return allActions
  }
  this.place = function(placement){
    this.at(placement.x, placement.y)
    this.bearing = placement.direction
  }
  this.evaluate = function(actions){
    let actionsArray = Array.prototype.slice.call(actions)
    actionsArray.forEach(function(action){
      if (action === "L") {
        this.turnLeft()
      } else if (action === "R") {
        this.turnRight()
      } else if (action === "A") {
        this.advance()
      }
    }, this)
  }

}

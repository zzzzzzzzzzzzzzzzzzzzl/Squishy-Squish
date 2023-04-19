
class cloud {
  constructor(pos) {
    this.colour=[0,0,0]
    pos[0] = [pos[0][0] * 50, pos[0][1] * 50]
    this.topCorner = pos[0]
    this.bottomCorner = pos[1]
    this.colour = [Math.random()*25+30,Math.random()*25+80,Math.random()*25+100]  


  }

  deleteOffCamera(y) {
    if (this.topCorner[1] > y) {
      return false
    }
    return true
  }
 
  draw(p5) {
    this.colour[0]+=.15
    const c =  [Math.random()*25+this.colour[0],Math.random()*25+this.colour[1],Math.random()*25+this.colour[2]]   //this.colour
    p5.fill(c)
    p5.stroke(c)
    p5.rect(
      this.topCorner[0],
      this.topCorner[1],
      this.bottomCorner[0],
      this.bottomCorner[1]
    )
  }

  updateCloud(p5, player) {
    this.draw(p5)
    this.collision(player)
  }
}

export default cloud

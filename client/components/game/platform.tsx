import checkCollision from './checkCollision'

class platform {//<3
  constructor(pos) {
    pos[0] = [pos[0][0] * 50, pos[0][1] * 50]
    this.topCorner = pos[0]
    this.bottomCorner = pos[1]
    this.colour = [Math.random()*25+30,Math.random()*25+80,Math.random()*25+100]  

    this.bounds = {
      tl: pos[0],
      tr: [pos[0][0] + pos[1][0], pos[0][1]],
      bl: [pos[0][0], pos[0][1] + pos[1][1]],
      br: [pos[0][0] + pos[1][0], pos[0][1] + pos[1][1]],
    }
  }

  deleteOffCamera(y) {
    if (this.topCorner[1] > y) {
      return false
    }
    return true
  }
  newcollision(player) {
    const col = checkCollision(player.bounds, this.bounds, player.velocity)

    if (col == 'tc') {
      player.velocity[1] = -player.velocity[1] * 0.5
      player.pos[1] = this.bounds.tl[1] - player.size
      player.grounded = true
      return player
    }
    if (col == 'bc') {
      player.pos[1] = this.bounds.bl[1]
      player.velocity[1] = -player.velocity[1]
      return player
    }
    if (col == 'slc') {
      player.pos[0] = player.pos[0] - 0.6
      player.velocity[0] = -player.velocity[0]
      return player
    }
    if (col == 'src') {
      player.pos[0] = player.pos[0] + 0.6
      player.velocity[0] = -player.velocity[0]
      return player
    }
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

  updatePlatform(p5, player) {
    this.newcollision(player)
    this.draw(p5)
  }
}

export default platform

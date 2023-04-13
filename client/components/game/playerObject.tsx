// import gravity from './gravity'

class playerObject {
  constructor(player) {
    this.pos = player.pos
    this.acceleration = player.acceleration
    this.velocity = player.velocity
    this.size = 20
  }
  sumForces() {
    //is there a better way of doing this???/
    this.pos[1] += this.velocity[1]
  }
  draw(p5) {
    p5.fill([25, 0, 100])
    p5.stroke([255, 255, 0])
    p5.rect(this.pos[0], this.pos[1], 20, 20)
  }
  jump() {
    if (this.velocity[1] == 0) {
      this.velocity[1] = -20
    }
  }
  playerInput(p5) {
    if (p5.keyIsDown(87)) {
      this.player.jump()
    }
    if (p5.keyIsDown(65)) {
      this.player.pos[0] -= this.player.velocity[0]
    }
    if (p5.keyIsDown(83)) {
      this.player.pos[1] -= this.player.velocity[1]
    }
    if (p5.keyIsDown(68)) {
      this.player.pos[0] += this.player.velocity[0]
    }
  }
  updatePlayer() {
    // this.velocity = gravity(this.velocity)
    this.playerInput()
    this.sumForces()
    this.draw()
  }
}

export default playerObject

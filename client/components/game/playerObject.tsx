import gravity from './gravity'

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
    // if (this.velocity[1] == 0) {
    this.velocity[1] = -12
  }
  playerInput(p5) {
    if (p5.keyIsDown(87)) {
      this.jump()
    }
    if (p5.keyIsDown(65)) {
      this.pos[0] -= this.velocity[0]
    }
    if (p5.keyIsDown(83)) {
      this.pos[1] -= this.velocity[1]
    }
    if (p5.keyIsDown(68)) {
      this.pos[0] += this.velocity[0]
    }
  }
  updatePlayer(p5) {
    this.velocity = gravity(this.velocity)
    this.playerInput(p5)
    this.sumForces()

    this.draw(p5)
  }
}

export default playerObject

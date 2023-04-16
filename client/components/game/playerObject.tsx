import gravity from './gravity'
import store from '../../store'
import { test } from '../../slices/gameSlice'

class playerObject {
  constructor(player) {
    this.pos = player.pos
    this.acceleration = player.acceleration
    this.velocity = player.velocity
    this.size = 20
    this.colour = [255, 255, 0]
    this.pBot = [this.pos[0] + this.size, this.pos[1] + this.size] //playerBottom
    this.updateColisionBoundries()
    this.snailTrail = Array(7).fill([...this.pos])
    this.velocityArr = Array(3).fill([0, 0])
    this.ded = false
    this.coins = 0
  }
  sumForces() {
    //is there a better way of doing this???/
    this.pos[1] = Number((this.velocity[1] + this.pos[1]).toFixed(1))

    this.pBot = [this.pos[0] + this.size, this.pos[1] + this.size]
    this.pos[0] = Number((this.velocity[0] + this.pos[0]).toFixed(1))
    this.velocity[0] *= 0.8
  }
  checkIfGrounded() {
    //get last 3 frames of velocity. and adds them all. if the total is less than .7 player is grounded
    //if we change acceloration then we will need to change this
    this.velocityArr.unshift([...this.velocity])
    this.velocityArr.pop()
    let count = 0
    this.velocityArr.map((i) => {
      count += Math.abs(i[1])
    })
    if (Math.abs(count) < 0.7) {
      this.grounded = true
    } else {
      this.grounded = false
    }
  }
  updateSnailTrail(p5) {
    //kind of cool visual effect
    let c = [0, 0, 0]
    this.snailTrail.unshift([...this.pos])
    this.snailTrail.pop()
    this.snailTrail.map((i, idx) => {
      const len = this.snailTrail.length - (idx + 1)
      c = [c[0] + 30, Math.random() * 55, Math.random() * 255]
      if (c[0] > 255) {
        c = [50, 50, 0]
      }
      p5.fill(c)
      p5.stroke(c)
      p5.rect(this.snailTrail[len][0], this.snailTrail[len][1], 20, 20)
    })
  }
  updateColisionBoundries() {
    this.bounds = {
      tl: this.pos,
      tr: [this.pos[0] + this.size, this.pos[1]],
      bl: [this.pos[0], this.pos[1] + this.size],
      br: [this.pos[0] + this.size, this.pos[1] + this.size],
    }
  }

  draw(p5) {
    p5.fill(this.colour)
    p5.stroke(this.colour)
    p5.rect(this.pos[0], this.pos[1], 20, 20)
  }
  jump() {
    if (this.grounded) {
      this.velocity[1] -= 8
    }
  }
  playerInput(p5) {
    if (p5.keyIsDown(87)) {
      //w
      this.jump()
    }
    if (p5.keyIsDown(65)) {
      //a
      this.velocity[0] -= this.acceleration
    }
    if (p5.keyIsDown(83)) {
      //s
    }
    if (p5.keyIsDown(68)) {
      //d
      this.velocity[0] += this.acceleration
    }
  }
  warpIfOffScreen() {
    if (this.pos[0] < 50) {
      this.pos[0] = 1100
    }
    if (this.pos[0] > 1100) {
      this.pos[0] = 50
    }
  }
  death(score) {
    if (this.pos[1] > 900) {
      this.ded = true
      store.dispatch(test(score))
    }
  }
  updatePlayer(p5, score) {
    if (!this.ded) {
      this.death(score)
      this.velocity = gravity(this.velocity)
      this.playerInput(p5)
      this.warpIfOffScreen()
      this.sumForces()
      this.updateSnailTrail(p5)
      this.checkIfGrounded()
      this.draw(p5)
      this.updateColisionBoundries()
    }
  }
}

export default playerObject

import gravity from './gravity'
import store from '../../store'
import { setDisplay, startGame, test } from '../../slices/gameSlice'
import score from './score'
import { useAppSelector } from '../../hooks'

class playerObject {
  constructor(player) {
    this.score = new score()
    this.coins=0
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
    this.lives = 3
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
    p5.fill([255,120,0])
    p5.stroke(this.colour)
    p5.rect(this.pos[0], this.pos[1], 20, 20)
  }
  jump() {
    if (this.grounded) {
      this.velocity[1] = -this.inventory.jumpHeight - 10
    }
  }
  playerInput(p5) {
    if (p5.keyIsDown(87)) {
      //w
      this.jump()
    }
    if (p5.keyIsDown(65)) {
      //a
      this.velocity[0] -= .9//this.inventory.speed
    }
    if (p5.keyIsDown(83)) {
      //s
    }
    if (p5.keyIsDown(68)) {
      //d
      this.velocity[0] += .9//this.inventory.speed
    }
  }
  warpIfOffScreen() {
    if (this.pos[0] < -20) {
      this.pos[0] = 999
    }
    if (this.pos[0] > 1000) {
      this.pos[0] = 19
    }
  }
  rebirth(score) {
    if (this.pos[1] > 1000 - score) {
      this.pos[1] = -score - 100
    }
  }
  async death(score, start) {
    if (!start) {
      this.rebirth(score)
    }
    console.log(this.lives,"here")
    if (this.lives > 0&&this.pos[1] > 1000 - score) {
      this.rebirth(score)
      this.lives--
    }
    if (this.pos[1] > 1000 - score) {
      store.dispatch(startGame())
      if (!(await this.score.newHighscore())) {
        store.dispatch(setDisplay('home'))
      }
      this.ded = true
      store.dispatch(test(score))
    }
  }
  updatePlayer(p5, score, start) {
    if (!this.ded) {
      this.inventory = store.getState().inventory
      this.score.updateScore(score)
      this.death(score, start)
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

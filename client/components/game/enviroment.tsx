import p5 from 'p5'
import platform from './platform'
import playerObject from './playerObject'

class enviroment {
  constructor(envSize) {
    this.platformArr = Array(10)
      .fill()
      .map(() => {
        const rand = Math.random() * 1000
        return new platform([
          [rand, rand],
          [50, 50],
        ])
      })
    this.groundHeight = 900
    const ground = [
      [0, this.groundHeight],
      [1000, 1000],
    ]
    this.platformArr.push(new platform(ground))

    this.draw(envSize)

    this.player = new playerObject({
      pos: [250, 250],
      acceleration: 0.6,
      velocity: [4, 1],
      grounded: false,
    })
  }
  //should gravity be a class object??
  gravity() {
    this.player.velocity[1] += this.player.acceleration
    if (this.player.pos[1] > this.groundHeight) {
      this.player.velocity[1] = 0
      this.player.pos[1] = this.groundHeight
    }
  }
  //this will check all object collisions in the enviroment
  collision() {
    this.platformArr.map((i) => {
      i.collision(this.player)
    })
  }
  //this will draw the enviroment
  drawAll() {
    this.platformArr.map((i) => {
      i.draw(this.p5)
    })
  }

  //not sure if this should go here
  sumForces() {
    this.player.pos[1] += this.player.velocity[1]
    // this.player.pos[0] += this.player.velocity[0]
  }
  //this is where our game will take place
  update() {
    this.player.updatePlayer(this.p5)
    this.drawAll()
    // this.gravity()
    this.collision()
    this.keyPressed()

    this.sumForces()
    // if (!this.ded) {
    // }
  }

  keyPressed() {
    if (this.p5.keyIsDown(87)) {
      // this.jump()
    }
    if (this.p5.keyIsDown(65)) {
      this.player.pos[0] -= this.player.velocity[0]
    }
    if (this.p5.keyIsDown(83)) {
      this.player.pos[1] -= this.player.velocity[1]
    }
    if (this.p5.keyIsDown(68)) {
      this.player.pos[0] += this.player.velocity[0]
    }
  }

  draw(envSize) {
    new p5((p5) => {
      this.p5 = p5
      this.p5.setup = () => {
        this.p5.createCanvas(envSize, envSize).parent('canvasParent')
        this.p5.background(0)
      }

      this.p5.draw = () => {
        this.p5.background(
          255,
          Math.random() * 5 + 100,
          Math.random() * 5 + 100
        )
        this.update()
      }
    })
  }
}

export default enviroment

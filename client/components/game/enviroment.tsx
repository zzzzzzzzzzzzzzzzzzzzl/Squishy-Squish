import p5 from 'p5'
import platform from './platform'

class enviroment {
  constructor(envSize) {
    this.platformArr = Array(10)
      .fill()
      .map(() => {
        return new platform([
          [Math.random() * 1000, Math.random() * 1000 - 200],
          [Math.random() * 1000, Math.random() * 1000 - 200],
        ])
      })

    console.log(this.platformArr)
    this.draw(envSize)

    this.player = {
      pos: [250, 250],
      acceleration: 0.6,
      velocity: [4, 1],
    }
  }

  drawPlayer() {
    this.p5.fill([25, 0, 100])
    this.p5.stroke([255, 255, 0])
    this.p5.rect(this.player.position[0], this.player.position[1], 20, 20)
  }

  gravity() {
    this.player.velocity[1] += this.player.acceleration
    this.player.position[1] += this.player.velocity[1]
    if (this.player.position[1] > 900) {
      // this.velocity[1]=-this.velocity[1]
      this.player.position[1] = 900
    }
  }
  drawPlatforms() {
    this.platformArr.map((i) => {
      this.p5.fill([25, Math.random() * 50, 100])
      this.p5.stroke([Math.random() * 25, 255, 0])
      this.p5.rect(
        i.topCorner[0],
        i.topCorner[1],
        i.bottomCorner[0],
        i.bottomCorner[1]
      )
    })
  }
  drawAll() {
    this.drawPlatforms()
    // this.drawPlayer()
  }
  update() {
    this.drawAll()
    // if (!this.ded) {
    //   this.gravity()
    // }
    // this.keyPressed()
  }

  jump() {
    this.player.velocity[1] = -20
    this.jumped = true
  }

  keyPressed() {
    if (this.p5.keyIsDown(87)) {
      this.jump()
    } else if (this.p5.keyIsDown(65)) {
      this.player[0] += this.velocity[0]
    } else if (this.p5.keyIsDown(83)) {
      this.player[1] -= this.velocity[1]
    } else if (this.p5.keyIsDown(68)) {
      this.player[0] -= this.velocity[0]
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
        if (this.p5.keyIsDown(87)) {
          // W key
          console.log('here')
        }
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

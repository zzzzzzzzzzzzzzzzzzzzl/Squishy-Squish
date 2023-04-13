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
      grounded:false
    }
  }

  drawPlayer() {
    this.p5.fill([25, 0, 100])
    this.p5.stroke([255, 255, 0])
    this.p5.rect(this.player.pos[0], this.player.pos[1], 20, 20)
  }

  gravity() {
    this.player.velocity[1] += this.player.acceleration
    if (this.player.pos[1] > 900) {
      this.player.velocity[1]=0
      this.player.pos[1] = 900
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
  platformCollision(){
    this.platformArr.map((i)=>{
    i.collision(this.player)
    })

  }
  collision(){
    this.platformCollision()

  }
  drawAll() {
    this.drawPlatforms()
    this.drawPlayer()
  }
  sumForces(){
    this.player.pos[1] += this.player.velocity[1]
    // this.player.pos[0] += this.player.velocity[0]
  }
  update() {
    this.drawAll()
    this.gravity()
    this.collision()
    this.keyPressed()
    this.sumForces()
    // if (!this.ded) {
    // }
  }

  jump() {
    if(this.player.velocity[1]==0){

      this.player.velocity[1] = -20

    }
  }

  keyPressed() {
    if (this.p5.keyIsDown(87)) {
      this.jump()
    } if (this.p5.keyIsDown(65)) {
      this.player.pos[0] -= this.player.velocity[0]
    }  if (this.p5.keyIsDown(83)) {
      this.player.pos[1] -= this.player.velocity[1]
    }  if (this.p5.keyIsDown(68)) {
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
        if (this.p5.keyIsDown(87)) {
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

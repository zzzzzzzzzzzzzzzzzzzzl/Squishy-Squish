import p5 from 'p5'
import platform from './platform'
import playerObject from './playerObject'
import score from './score'
import store from '../../store'
import { setDisplay } from '../../slices/gameSlice'
// import store from '../../store'

class enviroment {
  constructor(envSize) {
    //array of platform objects//look at platform.tsx
    this.platforms = 150
    this.platformArr = Array(15)
      .fill()
      .map(() => {
        return new platform([
          [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)],
          [250, 50],
        ])
      })
    this.groundHeight = 900 //some grass for sue// just a platform bottom so we have somthing to stand on :)
    const ground = [
      [0, this.groundHeight],
      [1000, 1000],
    ]
    this.platformArr.push(new platform(ground))
    this.camera = [100, 0]

    //playerObject look at playerObject.tsx
    this.player = new playerObject({
      pos: [250, 250],
      acceleration: 0.6,
      velocity: [0, 0],
      grounded: false,
    })
    this.height = 0
    this.draw(envSize) //this will set up our canvas <--- and will setup our game loop <3
  }

  startGame() {
    return store.getState().game.start
  }

  //this is where our game will take place
  update() {
    this.startGame()
    this.drawScore()
    if (this.startGame()) {
      this.createObjects()
      this.deleteObjects()
      this.panCamera()
    }
    this.player.playerInput(this.p5)
    this.platformArr.map((i) => {
      i.updatePlatform(this.p5, this.player)
    })
    this.player.updatePlayer(this.p5, -this.height)
  }
  panCamera() {
    if (!this.player.ded) {
      this.height--
    }
    this.camera[1] = this.height
    this.p5.translate(-this.camera[0] + 100, -this.camera[1])
  }
  drawScore() {
    const c = [225, Math.random() * 50, 100]
    this.p5.fill(c)
    this.p5.stroke(c)

    // Set the text size
    this.p5.textSize(64)

    // Draw the text at position (50, 50)
    this.p5.text(-this.height, 50, 50)
  }
  deleteObjects() {
    this.platformArr = this.platformArr.filter((i) => {
      return i.deleteOffCamera(this.height + 1000)
    })
  }
  createObjects() {
    if (Math.random() > 0.92 && !this.player.ded)
      this.platformArr.push(
        new platform([
          [
            Math.floor(Math.random() * 40),
            Math.floor((this.height - 100) / 25),
          ],
          [50, 50],
        ])
      )
    if (Math.random() > 0.95 && !this.player.ded)
      this.platformArr.push(
        new platform([
          [Math.floor(Math.random() * 40), Math.floor(this.height / 25)],
          [200, 50],
        ])
      )

    // = Array(100)
    //   .fill()
    //   .map(() => {
    //     return new platform([
    //       [Math.floor(Math.random() * 20),Math.floor(Math.random() * 20)],
    //       [50, 50],
    //     ])
    //   })
  }
  draw(envSize) {
    new p5((p5) => {
      this.p5 = p5
      this.p5.setup = () => {
        this.p5.createCanvas(envSize, envSize).parent('canvasParent')
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

import p5 from 'p5'
import platform from './platform'
import playerObject from './playerObject'
import score from './score'
import store from '../../store'
import { setDisplay } from '../../slices/gameSlice'
import coin from './coin'
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
    this.coinsArr = []
    this.colour=[0,0,0]
  }

  reset() {
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
    this.coinArr =[]
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
  }

  startGame() {
    this.start = store.getState().game.start
  }
  

  //this is where our game will take place
  update() {
    this.startGame()
    if (this.player.ded) {
      this.reset()
    }

    this.drawScore()
    if (this.start) {
      this.createObjects()
      this.deleteObjects()
      this.panCamera()
    }
    this.player.playerInput(this.p5)



    this.coinsArr.map((i) => {
      i.updateCoin(this.p5,this.player)
    })
    let newArr
    this.coinsArr.map((i) => {
      newArr=i.collision(this.player,this.coinArr)
    })
    
    this.platformArr.map((i) => {
      i.updatePlatform(this.p5, this.player)
    })

    this.player.updatePlayer(this.p5, -this.height, this.start)
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
    this.p5.textSize(64)
    this.p5.text(-this.height, 50, 50)
  }
  deleteObjects() {
    this.platformArr = this.platformArr.filter((i) => {
      return i.deleteOffCamera(this.height + 1000)
    })
    this.coinsArr = this.coinsArr.filter((i) => {
      return i.deleteOffCamera(this.height + 1000)
    })
  }
  createObjects() {
    if (Math.random() > 0.9 && !this.player.ded){
      this.platformArr.push(
        new platform([
          [
            Math.floor(Math.random() * 40),
            Math.floor((this.height - 100) / 25),
          ],
          [50, 50],
        ])
      )
    }
    if (Math.random() > 0.95 && !this.player.ded){
      this.platformArr.push(
        new platform([
          [Math.floor(Math.random() * 40), Math.floor(this.height / 25)],
          [100, 50],
        ])
      )
    }
    if (Math.random() > 0.96 && !this.player.ded){
      this.platformArr.push(
        new platform([
          [Math.floor(Math.random() * 40), Math.floor(this.height / 25)],
          [200, 50],
        ])
      )
    }
    if (Math.random() > 0.95 && !this.player.ded){
      this.coinsArr.push(
        new coin([
          [Math.floor(Math.random() * 1000), Math.floor(this.height )],
          
        ])
      )
    }
    
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
          Math.random() * 10 + 200,
          Math.random() * 10 + 100
        )
        // this.p5.background(this.colour)
        this.update()
      }
    })
  }
}

export default enviroment

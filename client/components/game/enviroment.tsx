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
    this.height = 0//this is camera position//it also will double as our game score
    this.coinsArr = []
    this.platforms = 150
    this.camera = [100, 0]
    this.platformArr = Array(5)//generates platforms for the begining
      .fill()
      .map(() => {
        return new platform([
          [Math.floor(Math.random() * 20), Math.floor(Math.random() * 5+15)],
          [500, 50],
        ])
      })
      Array(15)//generates platforms for the begining
      .fill()
      .map(() => {
        this.platformArr.push(new platform([
          [Math.floor(Math.random() * 20), Math.floor(Math.random() * 25-10)],
          [50, 50],
        ]))
      })
      Array(15)//generates platforms for the begining
      .fill()
      .map(() => {
        this.platformArr.push(new platform([
          [Math.floor(Math.random() * 20), Math.floor(Math.random() * 25-10)],
          [50, 50],
        ]))
      })

    //playerObject look at playerObject.tsx
    this.player = new playerObject({
      pos: [Math.random()*1000, 0],
      acceleration: 0.6,
      velocity: [0, 0],
      grounded: false,
    })
   
    this.draw(envSize) //this will set up our canvas <--- and will setup our game loop <3
  }

  reset() {//this will reset the enviroment class essentialy as if we created a new one//except for our draw function which will create another p5 canvas
    this.platforms = 150
    this.platformArr = Array(15)
      .fill()
      .map(() => {
        return new platform([
          [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)],
          [250, 50],
        ])
      })
    this.groundHeight = 900 
    this.coinArr =[]
    const ground = [
      [0, this.groundHeight],
      [1000, 1000],
    ]
    this.platformArr.push(new platform(ground))
    this.camera = [100, 0]

    this.player = new playerObject({
      pos: [250, 250],
      acceleration: 0.6,
      velocity: [0, 0],
      grounded: false,
    })
    this.height = 0
  }

  startGame() {//checks the redux state every frame to see if the game start has changed// this is dumb//verry dumb if we had more time i would like to change this// 
    this.start = store.getState().game.start
  }
  

  update() {//this is where our game will take place
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
    this.coinsArr=this.coinsArr.filter((i)=>{
      return !i.contact
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
    this.p5.text(-this.height, 190, 50)
    this.p5.text(this.player.coins, 190, 150)
    this.p5.text('score', 20, 50)
    this.p5.text('coin', 20, 150)
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
    if(this.height<-500){

      if (Math.random() > 0.95 && !this.player.ded){
        this.platformArr.push(
          new platform([
            [
              Math.floor(Math.random() * 40),
              Math.floor((this.height - 100) / 50)-2,
            ],
            [50, 50],
          ])
        )
      }
    }
    if (Math.random() > 0.98 && !this.player.ded){
      this.platformArr.push(
        new platform([
          [Math.floor(Math.random() * 40), Math.floor(this.height / 50)-2],
          [100, 50],
        ])
      )
    }
    if (Math.random() > 0.98 && !this.player.ded){
      this.platformArr.push(
        new platform([
          [Math.floor(Math.random() * 40), Math.floor(this.height / 50)-2],
          [200, 50],
        ])
      )
    }
    if (Math.random() > .995 && !this.player.ded){
      this.coinsArr.push(
        new coin([
          [Math.floor(Math.random() * 1000), Math.floor(this.height )-2],
          
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

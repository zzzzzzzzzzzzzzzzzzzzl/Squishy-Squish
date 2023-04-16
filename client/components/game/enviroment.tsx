import p5 from 'p5'
import platform from './platform'
import playerObject from './playerObject'

class enviroment {
  constructor(envSize) {
    //array of platform objects//look at platform.tsx
    this.platformArr = Array(100)
      .fill()
      .map(() => {
        return new platform([
          [Math.floor(Math.random() * 20),Math.floor(Math.random() * 20)],
          [50, 50],
        ])
      })
    this.groundHeight = 900 //some grass for sue// just a platform bottom so we have somthing to stand on :)
    const ground = [
      [0, this.groundHeight],
      [1000, 1000],
    ]
    this.platformArr.push(new platform(ground))
    this.camera=[100,0]

    //playerObject look at playerObject.tsx
    this.player = new playerObject({
      pos: [250, 250],
      acceleration: 0.6,
      velocity: [0, 0],
      grounded: false,
    })
    this.height=0
    this.draw(envSize) //this will set up our canvas <--- and will setup our game loop <3
  }

  //this is where our game will take place
  update() {
    this.createObjects()
    this.deleteObjects()
    this.panCamera()
    this.player.playerInput(this.p5)
    this.platformArr.map((i) => {
      i.updatePlatform(this.p5, this.player)
    })
    this.player.updatePlayer(this.p5)
  }
  panCamera() {
    this.height--
    this.camera[1] = this.height
    
    // Translate the canvas to the camera position
    this.p5.translate(-this.camera[0], -this.camera[1]);
  }
  drawScore(){
    this.p5.fill(0);
  
    // Set the text size
    this.p5.textSize(32);
    
    // Draw the text at position (50, 50)
    this.p5.text("Hello, world!", 50, 50);
  }
  deleteObjects(){
    this.platformArr=this.platformArr.filter((i)=>{
      return i.deleteOffCamera(this.height+800)
    })

  }
  createObjects(){
    if(Math.random()>.9)
    (this.platformArr.push(new platform([
      [Math.floor(Math.random() * 20),(Math.floor((this.height+50)/50))],
      [50, 50]
    ])))
    
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

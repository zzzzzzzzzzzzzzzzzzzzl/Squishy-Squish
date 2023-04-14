import p5 from 'p5'
import platform from './platform'
import playerObject from './playerObject'

class enviroment {
  constructor(envSize) {
    //array of platform objects//look at platform.tsx
    this.platformArr = Array(50)
      .fill()
      .map(() => {
        return new platform([
          [Math.random() * 1000, Math.random() * 1000],
          [50, 50],
        ])
      })
    this.groundHeight = 900 //some grass for sue// just a platform bottom so we have somthing to stand on :)
    const ground = [
      [0, this.groundHeight],
      [1000, 1000],
    ]
    this.platformArr.push(new platform(ground))

    //playerObject look at playerObject.tsx
    this.player = new playerObject({
      pos: [250, 250],
      acceleration: 0.6,
      velocity: [0, 0],
      grounded: false,
    })

    this.draw(envSize) //this will set up our canvas <--- and will setup our game loop <3
  }

  //this is where our game will take place
  update() {
    this.player.playerInput(this.p5)
    this.platformArr.map((i) => {
      i.updatePlatform(this.p5, this.player)
    })
    this.player.updatePlayer(this.p5)
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

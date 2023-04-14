import gravity from './gravity'

class playerObject {
  constructor(player) {
    this.pos = player.pos
    this.acceleration = player.acceleration
    this.velocity = player.velocity
    this.size = 20
    this.pBot= [this.pos[0]+this.size,this.pos[1]+this.size]//playerBottom
    this.updateColisionBoundries()
    console.log(this.bounds)
  }
  sumForces() {
    //is there a better way of doing this???/
    this.pos[1] += this.velocity[1]
    this.pBot= [this.pos[0]+this.size,this.pos[1]+this.size]

    this.pos[0]+=this.velocity[0]
    this.velocity[0]*=.8
  }
  updateColisionBoundries(){
    this.bounds={
      tl:this.pos,
      tr:[this.pos[0]+this.size,this.pos[1]],
      bl:[this.pos[0],this.pos[1]+this.size],
      br:[this.pos[0]+this.size,this.pos[1]+this.size]
    }
  }
  drawBoundries(p5){

    p5.stroke([250, 25, 25])
    const bounds=this.bounds
    p5.line(bounds.tl[0], bounds.tl[1], bounds.tr[0], bounds.tr[1]);
    p5.line(bounds.tl[0], bounds.tl[1], bounds.bl[0], bounds.bl[1]);
    p5.line(bounds.tr[0], bounds.tr[1], bounds.br[0], bounds.br[1]);
    p5.line(bounds.bl[0], bounds.bl[1], bounds.br[0], bounds.br[1]);
  }
  draw(p5) {
    p5.fill([25, 0, 100])
    p5.stroke([255, 255, 0])
    p5.rect(this.pos[0], this.pos[1], 20, 20)
  }
  jump() {
    this.velocity[1] = -12
  }
  playerInput(p5) {
    if (p5.keyIsDown(87)) {//w
      this.jump()
    }
    if (p5.keyIsDown(65)) {//a
       this.velocity[0]-=this.acceleration
    }
    if (p5.keyIsDown(83)) {//s
      //  this.velocity[1]+=this.acceleration
    }
    if (p5.keyIsDown(68)) {//d
       this.velocity[0]+=this.acceleration
    }
  }
  updatePlayer(p5) {
    this.velocity = gravity(this.velocity)
    this.playerInput(p5)
    this.sumForces()
    
    this.draw(p5)
    this.updateColisionBoundries()
    this.drawBoundries(p5)
  }
}

export default playerObject

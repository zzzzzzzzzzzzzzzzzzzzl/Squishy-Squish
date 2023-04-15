class platform {
  constructor(pos) {
    this.topCorner = pos[0]
    this.bottomCorner = pos[1]

    this.bounds={
      tl:pos[0],
      tr:[pos[0][0]+pos[1][0],pos[0][1]],
      bl:[pos[0][0],pos[0][1]+pos[1][1]],
      br:[pos[0][0]+pos[1][0],pos[0][1]+pos[1][1]]
    }
  }
  drawBoundries(p5){
    p5.stroke([25, 250, 205])
    const bounds=this.bounds
    p5.line(bounds.tl[0], bounds.tl[1], bounds.tr[0], bounds.tr[1]);
    p5.line(bounds.tl[0], bounds.tl[1], bounds.bl[0], bounds.bl[1]);
    p5.line(bounds.tr[0], bounds.tr[1], bounds.br[0], bounds.br[1]);
    p5.line(bounds.bl[0], bounds.bl[1], bounds.br[0], bounds.br[1]);
  }
  collision(player) {
    if (
      this.topCorner[0] < player.pos[0] &&
      this.topCorner[0] + this.bottomCorner[0] > player.pos[0]
    ) {
      if (
        this.topCorner[1] < player.pos[1] &&
        this.topCorner[1] + this.bottomCorner[1] > player.pos[1]
      ) {
        if (player.velocity < 0.2) {
          player.velocity = 0
  
        } else {
          player.pos[1] -= player.velocity[1]
          player.velocity[1] = -player.velocity[1] / 4
        }
        return player
      }
    }
    return player
  }
   collision2(player) {
  
     if (
      this.bounds.tl[0]<player.bounds.bl[0]&&//this handles top collision// there is probably a better way to do this.
      player.bounds.bl[0]<this.bounds.tr[0]&&
     this.bounds.tr[1]< player.bounds.bl[1]&&
     this.bounds.tr[1]+this.bottomCorner[1]/2> player.bounds.bl[1]
    ) {
      player.velocity[1] = -player.velocity[1]*.5
      player.pos[1] =this.bounds.tl[1]-player.size
      player.grounded=true
      return player
    }

    if (
      this.bounds.bl[0]<player.bounds.tl[0]&&//this handles top collision// there is probably a better way to do this.
      player.bounds.tl[0]<this.bounds.br[0]&&
     this.bounds.br[1]-this.bottomCorner[1]/2< player.bounds.tl[1]&&
     this.bounds.br[1]>player.bounds.tl[1]
    ) {
      player.pos[1] =this.bounds.bl[1]
      player.velocity[1] = -player.velocity[1]
      return player
    }
    return player
  }
  draw(p5) {
    p5.fill([25, Math.random() * 50, 100])
    p5.stroke([Math.random() * 25, 255, 0])
    p5.rect(
      this.topCorner[0],
      this.topCorner[1],
      this.bottomCorner[0],
      this.bottomCorner[1]
    )
  }

  updatePlatform(p5, player) {
    this.draw(p5)
    this.drawBoundries(p5)
    this.collision2(player)
  }
}

export default platform

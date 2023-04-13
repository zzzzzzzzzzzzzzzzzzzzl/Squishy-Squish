class platform {
  constructor(pos) {
    //pos=[[x,y],[x,y]]
    this.topCorner = pos[0]
    this.bottomCorner = [50,50]
  }
  collision(player) {
    console.log(player)
    if (this.topCorner[0] < player.pos[0]+10&&this.topCorner[0]+this.bottomCorner[0]>player.pos[0]-10 ) {
      if (this.topCorner[1] < player.pos[1]+20&&this.topCorner[1]+this.bottomCorner[1]>player.pos[1] ){
        player.pos[1]-=player.velocity[1]
        player.velocity[1]=0
        console.log("colision")
        return player
      }
    }
    return player
  }
}

export default platform

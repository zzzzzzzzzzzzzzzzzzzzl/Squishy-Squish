class platform {
  constructor(pos) {
    //pos=[[x,y],[x,y]]
    this.topCorner = pos[0]
    this.bottomCorner = pos[1]
  }
  collision(player) {
    if (this.topCorner[0] > player[0]) {
      this.veloity[1] = 0
    }
  }
}

export default platform

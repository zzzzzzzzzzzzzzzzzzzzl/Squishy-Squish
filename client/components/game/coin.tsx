import checkCollision, { checkCollisionCoin } from "./checkCollision"


class coin {
  constructor(pos) {
    this.topCorner = pos[0]
    this.bottomCorner = [10, 10]

    this.bounds = {
      tl: pos[0],
      tr: [pos[0][0] + this.bottomCorner[0], pos[0][1]],
      bl: [pos[0][0], pos[0][1] + this.bottomCorner[1]],
      br: [pos[0][0] + this.bottomCorner[0], pos[0][1] + this.bottomCorner[1]],
    }
  }

  deleteOffCamera(y) {
    if (this.topCorner[1] > y) {
      return false
    }
    return true
  }
  collision(player,coinArr){
    const collision=checkCollisionCoin(player.bounds,this.bounds)
    if(collision){
      console.log('eatCoins',collision)
      console.log(coinArr)
      console.log(
         coinArr.filter((i)=>{return collision})
      )
    }
  }
  eatCoin(coinArr,player){
  }

  draw(p5) {
    const c = [Math.random() *225, Math.random() * 50 + 100,  Math.random() * 150]
    p5.fill(c)
    p5.stroke(c)
    p5.rect(
      this.topCorner[0],
      this.topCorner[1],
      this.bottomCorner[0],
      this.bottomCorner[1]
    )
  }

  updateCoin(p5, player) {
    this.draw(p5)
  }
}

export default coin

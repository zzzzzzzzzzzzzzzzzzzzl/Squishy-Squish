class coin {
  constructor(pos) {
    this.topCorner = [Math.random() * 100, Math.random() * 100]
    this.bottomCorner = [20, 20]

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

  draw(p5) {
    const c = [225, Math.random() * 50 + 100, 50]
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

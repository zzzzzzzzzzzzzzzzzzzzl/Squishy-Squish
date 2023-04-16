class coin {
  constructor(pos) {
    this.topCorner = pos
    this.bottomCorner = [20, 20]

    this.bounds = {
      tl: pos[0],
      tr: [pos[0][0] + bottomCorner[0], pos[0][1]],
      bl: [pos[0][0], pos[0][1] + bottomCorner[1]],
      br: [pos[0][0] + bottomCorner[0], pos[0][1] + bottomCorner[1]],
    }
  }

  deleteOffCamera(y) {
    if (this.topCorner[1] > y) {
      return false
    }
    return true
  }
  collision(player) {
    if (
      player.bounds.tl[0] < this.bounds.tr[0] &&
      this.bounds.tr[1] < player.bounds.tl[1] &&
      player.bounds.tl[1] < this.bounds.br[1] &&
      player.bounds.tl[0] > this.bounds.br[0] - 20
    ) {
      player.coins++
      return player
    }
    if (
      player.bounds.tr[0] > this.bounds.tl[0] &&
      this.bounds.tl[1] < player.bounds.tr[1] &&
      player.bounds.tr[1] < this.bounds.bl[1] &&
      player.bounds.tr[0] < this.bounds.bl[0] + 20
    ) {
      player.coins++
      return player
    }

    if (
      (this.bounds.tl[0] < player.bounds.bl[0] && //this handles top collision// there is probably a better way to do this.
        player.bounds.bl[0] < this.bounds.tr[0] && //chunkey if stat,ems
        this.bounds.tr[1] < player.bounds.bl[1] &&
        this.bounds.tr[1] + this.bottomCorner[1] / 2 > player.bounds.bl[1]) ||
      (this.bounds.tl[0] < player.bounds.br[0] &&
        player.bounds.br[0] < this.bounds.tr[0] &&
        this.bounds.tr[1] < player.bounds.br[1] &&
        this.bounds.tr[1] + this.bottomCorner[1] / 2 > player.bounds.br[1])
    ) {
      player.coins++
      return player
    }

    if (
      (this.bounds.bl[0] < player.bounds.tl[0] && //this handles top collision// there is probably a better way to do this.
        player.bounds.tl[0] < this.bounds.br[0] &&
        this.bounds.br[1] - this.bottomCorner[1] / 2 < player.bounds.tl[1] &&
        this.bounds.br[1] > player.bounds.tl[1]) ||
      (this.bounds.bl[0] < player.bounds.tr[0] &&
        player.bounds.tr[0] < this.bounds.br[0] &&
        this.bounds.br[1] - this.bottomCorner[1] / 2 < player.bounds.tr[1] &&
        this.bounds.br[1] > player.bounds.tr[1])
    ) {
      player.coins++
      return player
    }
    return player
  }
  draw(p5) {
    const c = [25, Math.random() * 50 + 100, 250]
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
    this.collision(player)
  }
}

export default platform

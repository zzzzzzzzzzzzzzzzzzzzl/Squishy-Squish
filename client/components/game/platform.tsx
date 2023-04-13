class platform {
  constructor(pos) {
    this.topCorner = pos[0]
    this.bottomCorner = [50, 50]
  }
  collision(player) {
    if (
      this.topCorner[0] < player.pos[0] + 10 &&
      this.topCorner[0] + this.bottomCorner[0] > player.pos[0] - 10
    ) {
      if (
        this.topCorner[1] < player.pos[1] + 20 &&
        this.topCorner[1] + this.bottomCorner[1] > player.pos[1]
      ) {
        player.pos[1] -= player.velocity[1]
        player.velocity[1] = 0
        return player
      }
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
}

export default platform

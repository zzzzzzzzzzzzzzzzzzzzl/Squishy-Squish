class platform {
  constructor(pos) {
    this.topCorner = pos[0]
    this.bottomCorner = pos[1]
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
    this.collision(player)
  }
}

export default platform

function checkCollision(bounds1, bounds2, v) {
  const keys = Object.keys(bounds1)

  const c = keys.map((i) => {
    return checkPoint(bounds2, bounds1[i])
  })

  let collision = null
  if (c[0] && c[1] && c[2] && c[3]) {
    collision = 'tc'
  }
  if (!c[0] && !c[1] && !c[2] && c[3]) {
    if (v[1] > -0.7) {
      collision = 'tc'
    } else {
      collision = 'slc'
    }
  }
  if (!c[0] && !c[1] && c[2] && c[3]) {
    collision = 'tc'
  }
  if (!c[0] && !c[1] && c[2] && !c[3]) {
    if (v[1] > -0.7) {
      collision = 'tc'
    } else {
      collision = 'src'
    }
  }
  if (!c[0] && c[1] && !c[2] && c[3]) {
    collision = 'slc'
  }
  if (c[0] && !c[1] && c[2] && !c[3]) {
    collision = 'src'
  }
  if (c[0] && !c[1] && !c[2] && !c[3]) {
    if (v[1] < -0.7) {
      collision = 'bc'
    } else {
      collision = 'src'
    }
  }
  if (c[0] && c[1] && !c[2] && !c[3]) {
    collision = 'bc'
  }
  if (!c[0] && c[1] && !c[2] && !c[3]) {
    collision = 'blc'
    if (v[1] < -0.7) {
      collision = 'bc'
    } else {
      collision = 'slc'
    }
  }
  return collision
}
function checkPoint(bounds, p) {
  if (
    bounds.tl[0] < p[0] &&
    bounds.tl[1] < p[1] &&
    p[0] < bounds.br[0] &&
    p[1] < bounds.br[1]
  ) {
    return true
  }
  return false
}

export function checkCollisionCoin(bounds1, bounds2) {
  const keys = Object.keys(bounds1)

  const c = keys.map((i) => {
    return checkPoint(bounds2, bounds1[i])
  })
  for(let i=0;i<c.length;i++){
    if(c[i]){
      return true
    }
  }
  return false
}

export default checkCollision

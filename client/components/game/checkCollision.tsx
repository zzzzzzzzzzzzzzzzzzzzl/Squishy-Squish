//holly fuck this actually works
//this is not being used anywhere
function compare(line1, line2) {
  const vector1 = [
    { x: line1[0][0], y: line1[0][1] },
    { x: line1[1][0], y: line1[1][1] },
  ]
  const vector2 = [
    { x: line2[0][0], y: line2[0][1] },
    { x: line2[1][0], y: line2[1][1] },
  ]
  return doIntersect(vector1[0], vector1[1], vector2[0], vector2[1])
}

function onSegment(p, q, r) {
  if (
    q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y)
  )
    return true
  return false
}

function orientation(p, q, r) {
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)
  if (val === 0) return 0
  return val > 0 ? 1 : 2
}

function doIntersect(p1, q1, p2, q2) {
  const o1 = orientation(p1, q1, p2)
  const o2 = orientation(p1, q1, q2)
  const o3 = orientation(p2, q2, p1)
  const o4 = orientation(p2, q2, q1)

  if (o1 !== o2 && o3 !== o4) return true

  if (o1 === 0 && onSegment(p1, p2, q1)) return true
  if (o2 === 0 && onSegment(p1, q2, q1)) return true
  if (o3 === 0 && onSegment(p2, p1, q2)) return true
  if (o4 === 0 && onSegment(p2, q1, q2)) return true

  return false
}

function checkCollision(bounds1, bounds2) {
  const lines1 = [
    [bounds1.tl, bounds1.tr],
    [bounds1.tl, bounds1.bl],
    [bounds1.bl, bounds1.br],
    [bounds1.br, bounds1.tr],
  ]

  const lines2 = [
    [bounds2.tl, bounds2.tr],
    [bounds2.tl, bounds2.bl],
    [bounds2.bl, bounds2.br],
    [bounds2.br, bounds2.tr],
  ]

  const intersections = []

  for (let i = 0; i < lines1.length; i++) {
    for (let j = 0; j < lines2.length; j++) {
      if (compare(lines1[i], lines2[j])) {
        intersections.push([lines1[i], lines2[j]])
      }
    }
  }

  return intersections
}

export default checkCollision

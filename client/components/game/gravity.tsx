function gravity(velocity) {
  if (velocity[1] < 20) {
    velocity[1] += 0.6
  }
  return velocity
}
export default gravity

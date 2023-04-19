function gravity(velocity) {//<3
  if (velocity[1] < 40) {
    velocity[1] += 0.6
  }
  return velocity
}
export default gravity

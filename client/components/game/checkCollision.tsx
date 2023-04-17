function checkCollision(bounds1,bounds2){

  const keys=Object.keys(bounds1)

  return keys.map((i)=>{
    console.log(i)
    return checkPoint(bounds2,bounds1[i])
  })


}
function checkPoint(bounds,p){
  if(
    bounds.tl[0]<p[0]&&
    bounds.tl[1]<p[1]&&
    p[0]<bounds.br[0]&&
    p[1]<bounds.br[1]
  ){
    return true
  }
  return false
}

export default checkCollision

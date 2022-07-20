export default function RecenlyViewed({viewed}) {
  // const uniqueNames = viewed.filter((val,id,array) => array.indexOf(val) == id);
  // console.log("***", ...new Set(viewed))
  return viewed.length > 0 ? (<>
    {
      viewed.map((product) => {
        return <p key={product.id}>{product.title}</p>
      })
    }
  </>) : null
}
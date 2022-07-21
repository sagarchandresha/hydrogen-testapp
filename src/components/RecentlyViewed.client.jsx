import HomeProductCard from "./HomeProductCard.client";

export default function RecenlyViewed({viewed}) {
  const uniqueItems = viewed;
  const uniqueItemsKeys = Object.keys(uniqueItems);
  console.log(uniqueItemsKeys);
  return uniqueItemsKeys.length > 0 ? (<>
    {
      uniqueItemsKeys.map((key) => {
        return <HomeProductCard product={uniqueItems[key]} />
      })
    }
  </>) : null
}
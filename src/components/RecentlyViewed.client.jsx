import HomeProductCard from "./HomeProductCard.client";

export default function RecenlyViewed({viewed}) {
  const uniqueItems = viewed;
  const uniqueItemsKeys = Object.keys(uniqueItems);
  return uniqueItemsKeys.length > 0 ? (<>
    {
      uniqueItemsKeys.map((key, index) => {
        return index < 4 && <HomeProductCard product={uniqueItems[key]} />
      })
    }
  </>) : null
}
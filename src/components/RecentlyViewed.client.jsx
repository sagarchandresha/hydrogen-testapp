import HomeProductCard from "./HomeProductCard.client";
import ProductGridNoHover from "./Product/ProductGridNoHover.client";

export default function RecenlyViewed({ viewed, productId }) {
  const uniqueItems = viewed;
  const arr = Object.keys(uniqueItems)
  const index = arr.indexOf(productId);
  const newArry = arr.splice(index, 1)
  const uniqueItemsKeys = arr.slice(Math.max(arr.length - 4, 0)).reverse();
  return uniqueItemsKeys.length > 0 ? (
    <>
      <h2 className="text-3xl px-6 md:px-8 lg:px-12 mt-5">Recently Viewed :</h2>
      <div className="grid-flow-row grid gap-2 gap-y-6 px-6 md:px-8 lg:px-12 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {uniqueItemsKeys.map((key) => {
          // return <HomeProductCard product={uniqueItems[key]} />;
          return <ProductGridNoHover product={uniqueItems[key]} />;
        })}
      </div>
    </>
  ) : null;
}

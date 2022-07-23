import HomeProductCard from "./HomeProductCard.client";

export default function RecenlyViewed({ viewed }) {
  const uniqueItems = viewed;
  const uniqueItemsKeys = Object.keys(uniqueItems).slice(-4);
  console.log(Object.keys(uniqueItems));
  return uniqueItemsKeys.length > 0 ? (
    <>
      <h2 className="text-3xl px-6 md:px-8 lg:px-12 mt-5">Recently Viewed :</h2>
      <div className="grid-flow-row grid gap-2 gap-y-6 px-6 md:px-8 lg:px-12 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {uniqueItemsKeys.map((key, index) => {
          return index < 4 && <HomeProductCard product={uniqueItems[key]} />;
        })}
      </div>
    </>
  ) : null;
}

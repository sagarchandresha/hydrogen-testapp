import { Image, Link } from "@shopify/hydrogen";

export default function LandingFeatureCollection({ collection }) {
  return (
    <>
      <div className="grid grid-cols-2 items-center gap-3 mx-auto">
        <div className="text-end">
          {collection?.image && (
            <Image
              className="rounded shadow-border inline-block max-w-2xl"
              alt={`Image of ${collection.title}`}
              data={collection.image}
            />
          )}
        </div>
        <div className="max-w-2xl mr-auto text-start pl-5">
          <h2 className="text-5xl font-bold uppercase">{collection.title}</h2>
          <div
            className="text-xl my-5"
          >
            {collection.description}
          </div>
          <Link key={collection.id} to={`/collections/${collection.handle}`} className="inline-block text-white uppercase px-6 py-3 bg-rose-600 rounded-lg hover:bg-rose-800 transition-all ease-in-out duration-500 font-semibold">
            GET {collection.title}
          </Link>
        </div>
      </div>
    </>
  );
}

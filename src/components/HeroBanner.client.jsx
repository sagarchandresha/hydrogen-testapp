import { Link } from "@shopify/hydrogen";
import logo from "/assets/images/ring.jpg";
export default function HeroBanner() {
  return (
    <>
      <div
        style={{ backgroundImage: "url(" + logo + ")" }}
        className="py-64 bg-cover bg-center bg-no-repeat relative after:content[''] after:absolute after:w-full after:h-full after:bg-black after:top-0 after:left-0 after:opacity-30"
      >
        <h1 className="text-white text-4xl font-bold uppercase z-10 relative max-w-2xl mx-auto font-mono">
        We make your dreams become more valuable than ever before.
        </h1>
        <Link
          to="/collections"
          className="inline-block z-10 relative bg-cyan-500 py-3 px-20 mt-4 rounded-md text-white uppercase font-bold text-xl hover:bg-cyan-800 transition-all ease-in-out duration-500"
        >
          Buy now
        </Link>
      </div>
    </>
  );
}

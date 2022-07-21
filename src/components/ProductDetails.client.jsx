import {
  ProductOptionsProvider,
  MediaFile,
  useProductOptions,
  ProductPrice,
  BuyNowButton,
  AddToCartButton,
  CartLineQuantityAdjustButton,
  CartLineQuantity,
} from "@shopify/hydrogen";
import { useEffect, useState } from "react";
import Accordion from "./Accordion.client";
import { CartDetails } from "./CartDetails.client";
import { Drawer, useDrawer } from "./Drawer.client";
import RecenlyViewed from "./RecentlyViewed.client";
// import AwesomeSlider from "react-awesome-slider";
// import "react-awesome-slider/dist/styles.css";

export default function ProductDetails({ product }) {
  const [viewed, setViewed] = useState({});
  const recentlyViewed = {};
  recentlyViewed[product.id] = product;
  console.log(product);
  useEffect(() => {
    var viewedProducts = sessionStorage.getItem("viewedProducts");
    if (viewedProducts == null) {
      sessionStorage.setItem("viewedProducts", JSON.stringify(recentlyViewed));
      setViewed(recentlyViewed);
    } else {
      viewedProducts = JSON.parse(viewedProducts);
      viewedProducts[product.id] = product;
      sessionStorage.setItem("viewedProducts", JSON.stringify(viewedProducts));
      setViewed(viewedProducts);
    }
  }, []);

  const parts = product.descriptionHtml.split("<h2>").filter((item) => item);
  return (
    <ProductOptionsProvider data={product}>
      <section className="w-full overflow-x-hidden gap-4 md:gap-8 grid px-6 md:px-8 lg:px-12">
        <div className="grid items-start gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
          <div className="mt-5 grid md:grid-flow-row  md:p-0 md:grid-cols-2 md:w-full lg:col-span-2">
            <div className="md:col-span-2 snap-center card-image aspect-square md:w-full w-[80vw]">
              <ProductGallery media={product.media.nodes} />
            </div>
          </div>
          <div className="sticky w-full md:mx-auto grid gap-8 p-0 md:p-6 md:px-0 top-[6rem] lg:top-[8rem] xl:top-[10rem]">
            <div className="grid gap-2">
              <h1 className="text-4xl font-bold leading-10 whitespace-normal">
                {product.title}
              </h1>
              <span className="max-w-prose whitespace-pre-wrap inherit text-copy opacity-50 font-medium">
                {product.vendor}
              </span>
            </div>
            <ProductForm product={product} />
            <div className="mt-8">
              {product.descriptionHtml.search("<h2>") !== -1 ? (
                <div
                  className="prose border-t border-gray-200 text-black text-md"
                  // dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                >
                  {parts.map((item) => {
                    return (
                      <>
                        <Accordion
                          title={item.split("</h2>")[0]}
                          content={item.split("</h2>")[1]}
                        />
                        <br />
                      </>
                    );
                  })}
                </div>
              ) : (
                <div
                  className="prose border-t border-gray-200 pt-6 text-black text-md 1"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* <section>
        <RecenlyViewed viewed={viewed} />
      </section> */}
    </ProductOptionsProvider>
  );
}

function ProductForm({ product }) {
  const { options, selectedVariant } = useProductOptions();
  const [quantity, setQuantity] = useState(1);

  const handlePlusQuantity = (e) => {
    e.preventDefault();
    let qty = quantity;
    setQuantity(parseInt(qty) + 1);
  };
  const handleMinusQuantity = (e) => {
    e.preventDefault();
    let qty = quantity;
    quantity != 1 && setQuantity(parseInt(qty) - 1);
  };
  return (
    <form className="grid gap-10">
      {
        <div className="grid gap-4">
          {options.map(({ name, values }) => {
            if (values.length === 1) {
              return null;
            }
            return (
              <div
                key={name}
                className="flex flex-wrap items-baseline justify-start gap-6"
              >
                <legend className="whitespace-pre-wrap max-w-prose font-bold text-lead min-w-[4rem]">
                  {name}
                </legend>
                <div className="flex flex-wrap items-baseline gap-4">
                  <OptionRadio name={name} values={values} />
                </div>
              </div>
            );
          })}
        </div>
      }
      <div>
        <ProductPrice
          className="text-gray-500 line-through text-sm font-semibold inline-block"
          priceType="compareAt"
          variantId={selectedVariant.id}
          data={product}
        />
        <ProductPrice
          className="text-gray-900 text-xl font-semibold inline-block ml-2"
          variantId={selectedVariant.id}
          data={product}
          quantity={2}
        />
      </div>
      <div className="quantitySelector flex gap-5">
        <span onClick={handleMinusQuantity} className="cursor-pointer selection:bg-transparent">
          &#8722;
        </span>
        <input
          type="number"
          min={1}
          value={quantity}
          defaultValue={1}
          className="col-span-2 bg-transparent text-center focus:border-0 focus:outline-none"
          style={{ maxWidth: "25px;" }}
        />
        <span onClick={handlePlusQuantity} className="cursor-pointer selection:bg-transparent">
          &#43;
        </span>
      </div>
      <div className="grid grid-cols-2 items-stretch gap-4">
        <PurchaseMarkup quantity={quantity} />
      </div>
    </form>
  );
}

function PurchaseMarkup({ quantity }) {
  const { selectedVariant } = useProductOptions();
  const isOutOfStock = !selectedVariant?.availableForSale || false;
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  return (
    <>
      <Drawer open={isOpen} onClose={closeDrawer}>
        <div className="grid">
          <Drawer.Title>
            <h2 className="sr-only">Cart Drawer</h2>
          </Drawer.Title>
          <CartDetails onClose={closeDrawer} />
        </div>
      </Drawer>

      <AddToCartButton
        variantId={selectedVariant.id}
        quantity={quantity}
        accessibleAddingToCartLabel="Adding item to your cart"
        disabled={isOutOfStock}
        // onClick={openDrawer}
        onClick={
          !isOutOfStock &&
          (() => {
            setTimeout(() => openDrawer(), 1000);
          })
        }
      >
        <span className="uppercase bg-cyan-500 rounded-md text-white inline-block font-medium text-center py-3 px-6 max-w-xl leading-none w-full hover:bg-cyan-800 transition-all ease-in-out duration-500">
          {isOutOfStock ? "Sold out" : "Add to cart"}
        </span>
      </AddToCartButton>
      {isOutOfStock ? (
        <span className="text-black text-center py-3 px-6 border rounded-sm leading-none ">
          Available in 2-3 weeks
        </span>
      ) : (
        <BuyNowButton variantId={selectedVariant.id}>
          <span className="uppercase inline-block rounded-md font-medium text-center py-3 px-6 max-w-xl leading-none border w-full text-cyan-500 border-cyan-500 hover:text-cyan-800 hover:border-cyan-800 transition-all ease-in-out duration-500">
            Buy it now
          </span>
        </BuyNowButton>
      )}
    </>
  );
}

function OptionRadio({ values, name }) {
  const { selectedOptions, setSelectedOption } = useProductOptions();

  return name != "Color" ? (
    <>
      {values.map((value) => {
        const checked = selectedOptions[name] === value;
        const id = `option-${name}-${value}`;

        return (
          <label key={id} htmlFor={id}>
            <input
              className="sr-only"
              type="radio"
              id={id}
              name={`option[${name}]`}
              value={value}
              checked={checked}
              onChange={() => setSelectedOption(name, value)}
            />
            <div
              className={`relative leading-none border-b-[2px] cursor-pointer transition-all duration-200 rounded-full border ${
                checked
                  ? "bg-black text-white border-transparent"
                  : "text-black bg-transparent border-black"
              }`}
              style={{ width: "35px", height: "35px" }}
            >
              <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                {value[0]}
              </span>
            </div>
          </label>
        );
      })}
    </>
  ) : (
    <>
      {values.map((value) => {
        const checked = selectedOptions[name] === value;
        const id = `option-${name}-${value}`;
        return (
          <label key={id} htmlFor={id} className="inline-block">
            <input
              className="sr-only w-auto"
              type="radio"
              id={id}
              name={`option[${name}]`}
              value={value}
              checked={checked}
              onChange={() => setSelectedOption(name, value)}
            />
            <div
              className={`rounded-full leading-none border-b-[2px] py-1 cursor-pointer transition-all duration-200 border-2 ${
                checked ? "border-black" : "border-transparent"
              }`}
              style={{ backgroundColor: value, width: "35px", height: "35px" }}
            ></div>
          </label>
        );
      })}
    </>
  );
}

function ProductGallery({ media }) {
  if (!media.length) {
    return null;
  }

  return (
    <div className={`grid gap-2 grid-cols-2 md:p-0 w-screen md:w-full`}>
      {/* <AwesomeSlider> */}
      {media.map((med, i) => {
        let extraProps = {};

        if (med.mediaContentType === "MODEL_3D") {
          extraProps = {
            interactionPromptThreshold: "0",
            ar: true,
            loading: "eager",
            disableZoom: true,
          };
        }

        const data = {
          ...med,
          image: {
            ...med.image,
            altText: med.alt || "Product image",
          },
        };

        return (
          <div
            className={`snap-center card-image bg-white md:w-full w-[80vw] shadow-sm rounded`}
            key={med.id || med.image.id}
          >
            <MediaFile
              tabIndex="0"
              className={`w-full h-full aspect-square`}
              data={data}
              options={{
                crop: "center",
              }}
              {...extraProps}
            />
          </div>
        );
      })}
      {/* </AwesomeSlider> */}
    </div>
  );
}

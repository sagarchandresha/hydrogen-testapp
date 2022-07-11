import {
  Link,
  Image,
  Money,
  AddToCartButton,
  ProductOptionsProvider,
  useProductOptions,
} from "@shopify/hydrogen";
import { useState } from "react";
import { useDrawer } from "./Drawer.client";

export default function HomeProductCard({ product }) {
  const { openDrawer } = useDrawer();
  const { options, selectedVariant } = useProductOptions();
  const isOutOfStock = !selectedVariant?.availableForSale || false;
  const { priceV2: price, compareAtPriceV2: compareAtPrice } =
    product.variants?.nodes[0] || {};

  const isDiscounted = compareAtPrice?.amount > price?.amount;
  const [isProductHover, setIsProductHover] = useState(false);
  // console.log("--", product.variants);
  return (
    <div>
      <Link
        to={`/products/${product.handle}`}
        onMouseEnter={() => setIsProductHover(true)}
        onMouseLeave={() => setIsProductHover(false)}
      >
        <div className="grid gap-6">
          <div className="shadow-sm rounded relative">
            {isDiscounted && (
              <label className="subpixel-antialiased absolute top-0 right-0 m-4 text-right text-notice text-red-600 text-xs font-bold">
                SALE
              </label>
            )}
            {/* Product Secondary Image on hover */}
            <Image
              className={`aspect-[5/5] ${
                product.images.nodes[1] && isProductHover && "hidden"
              }`}
              data={product.images.nodes[0]}
              alt="Alt Tag"
            />
            {product.images.nodes[1] && (
              <Image
                className={`secondaryImage aspect-[5/5] ${
                  !isProductHover && "hidden"
                } `}
                data={product.images.nodes[1]}
                alt="Alt Tag"
              />
            )}
            {/* End Product Secondary Image on hover */}
          </div>
          <div className="grid gap-1">
            <h3 className="max-w-prose text-copy w-max overflow-hidden whitespace-nowrap text-ellipsis ">
              {product.title}
            </h3>
            <div className="flex gap-4">
              <span className="max-w-prose whitespace-pre-wrap inherit text-copy flex gap-4">
                <Money withoutTrailingZeros data={price} />
                {isDiscounted && (
                  <Money
                    className="line-through opacity-50"
                    withoutTrailingZeros
                    data={compareAtPrice}
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <form>
        {options.map(({ name, values }) => {
          // console.log(values.length);
          return values.length == 1 ? null : (
            <ProductGridOptions name={name} values={values} />
          );
        })}

        <AddToCartButton
          variantId={selectedVariant.id}
          quantity={1}
          accessibleAddingToCartLabel="Adding item to your cart"
          className="bg-rose-600 text-white inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none w-full uppercase"
          onClick={!isOutOfStock && openDrawer}
        >
          {isOutOfStock ? "Sold out" : "add to cart"}
        </AddToCartButton>
      </form>
    </div>
  );
}
function ProductGridOptions({ name, values }) {
  // console.log("====", values);
  const { selectedOptions, setSelectedOption } = useProductOptions();
  return (
    <select name={name} onChange={(e) => setSelectedOption(name, e.target.value)}>
      {values.map(function (value) {
        const selected = selectedOptions[name] === value;
        const id = `option-${name}-${value}`;
        return (
          <option value={value} selected={selected} id={id}>
            {value}
          </option>
        );
      })}
    </select>
  );
}

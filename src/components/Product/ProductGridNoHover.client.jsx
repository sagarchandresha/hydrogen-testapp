import {
  Link,
  Image,
  Money,
  AddToCartButton,
  useProductOptions,
  ProductPrice,
  useCart,
  useUrl,
} from "@shopify/hydrogen";
import { useEffect, useRef, useState } from "react";
import { Drawer, useDrawer } from "../Drawer.client";
import { CartDetails } from "../CartDetails.client";
import Modal from "../Modal.client";
// import 'react-awesome-slider/dist/styles.css';

export default function ProductGridNoHover({ product }) {
  
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const { selectedVariant } = useProductOptions();
  const { priceV2: price, compareAtPriceV2: compareAtPrice } =
    product.variants?.nodes[0] || {};
  const isDiscounted = compareAtPrice?.amount > price?.amount;
  
  return (
    <div className="flex flex-col">
      <Drawer open={isOpen} onClose={closeDrawer}>
        <div className="grid">
          <Drawer.Title>
            <h2 className="sr-only">Cart Drawer</h2>
          </Drawer.Title>
          <CartDetails onClose={closeDrawer} />
        </div>
      </Drawer>
      <Link
        key={product.id}
        to={`/products/${product.handle}`}
        onMouseEnter={() => setIsProductHover(true)}
        onMouseLeave={() => setIsProductHover(false)}
      >
        <div className="grid gap-6">
          <div className="shadow-sm rounded relative">
            {isDiscounted && (
              <label className="subpixel-antialiased absolute top-0 right-0 p-2 bg-red-600 text-right text-notice text-white text-xs font-bold">
                SALE
              </label>
            )}
            {/* Product Secondary Image on hover */}
            <Image
              className={`aspect-[5/5]`}
              data={product.images.nodes[0]}
              alt="Alt Tag"
            />

            {/* End Product Secondary Image on hover */}
          </div>
          <div className="grid gap-1">
            <h3 className="max-w-prose text-copy w-max overflow-hidden whitespace-nowrap text-ellipsis ">
              {product.title}
            </h3>
            <div className="flex gap-4">
              <span className="max-w-prose whitespace-pre-wrap inherit text-copy flex gap-4">
                <ProductPrice
                  className="text-gray-900 text-lg font-semibold"
                  variantId={selectedVariant.id}
                  data={product}
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

import { Dialog, Transition } from "@headlessui/react";
import {
  AddToCartButton,
  MediaFile,
  ProductPrice,
  useCart,
  useProductOptions,
} from "@shopify/hydrogen";

import Slider from '@ant-design/react-slick';

import { Fragment, useEffect, useRef, useState } from "react";

export default function Modal({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const { options, selectedVariant } = useProductOptions();
  const isOutOfStock = !selectedVariant?.availableForSale || false;
  const [addingItem, setAddingItem] = useState(false);
  const buttonRef = useRef();
  const { status } = useCart();
  useEffect(() => {
    if (addingItem && status === "idle") {
      setAddingItem(false);
      setIsOpen(false);
      buttonRef.current.innerHTML = isOutOfStock ? "sold out" : "add to cart";
    }
  }, [status, addingItem]);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    console.log("openModal");
    setIsOpen(true);
  }

  return (
    <>
      <div className="relative inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="bg-cyan-500 text-white inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none w-full uppercase mt-3"
        >
          Quick View
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="absolute h-3/3 w-full max-w-md transform overflow-y-auto overflow-x-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {product.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <ProductGallery media={product.media.nodes} />
                    <form className="mt-7">
                      <div className="flex items-center my-2">
                        {options.map(({ name, values }) => {
                          return values.length == 1 ? null : (
                            <ProductGridOptions
                              name={name}
                              values={values}
                              openModal={openModal}
                            />
                          );
                        })}
                        <p className="text-sm text-gray-500">
                          <span className="max-w-prose whitespace-pre-wrap inherit text-copy flex gap-4">
                            <ProductPrice
                              className="text-gray-900 text-lg font-semibold"
                              variantId={selectedVariant.id}
                              data={product}
                            />
                          </span>
                        </p>
                      </div>
                      <AddToCartButton
                        variantId={selectedVariant.id}
                        quantity={1}
                        accessibleAddingToCartLabel="adding to cart"
                        className={`bg-rose-600 text-white inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none w-full uppercase ${
                          isOutOfStock && "opacity-50"
                        }`}
                        onClick={
                          !isOutOfStock &&
                          (() => {
                            setAddingItem(true);
                            buttonRef.current.innerHTML = "Adding...";
                          })
                        }
                        disabled={isOutOfStock}
                        buttonRef={buttonRef}
                      >
                        {isOutOfStock ? "sold out" : "add to cart"}
                      </AddToCartButton>
                    </form>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="absolute top-6 right-6 inline-flex justify-center rounded-md border border-transparent bg-transparent text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function CloseIcon() {
  return (
    <svg
      height="25px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      width="25px"
    >
      <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
    </svg>
  );
}
function ProductGallery({ media }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  if (!media.length) {
    return null;
  }

  return (
    <div
      className={`grid grid-flow-col md:p-0 w-screen md:w-full grid-cols-3 gap-2`}
    >
      <Slider {...settings}>
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
            className={`product-slider snap-center card-image bg-white aspect-square md:w-full w-[80vw] shadow-sm rounded`}
            key={med.id || med.image.id}
          >
            <MediaFile
              tabIndex="0"
              className={`w-full h-full aspect-square object-cover`}
              data={data}
              options={{
                crop: "center",
              }}
              {...extraProps}
            />
          </div>
        );
      })}
     </Slider>
    </div>
  );
}
function ProductGridOptions({ name, values, openModal }) {
  const { selectedOptions, setSelectedOption } = useProductOptions();
  console.log(openModal);
  return (
    <select
      name={name}
      onChange={(e) => setSelectedOption(name, e.target.value)}
      style={{ height: "35px" }}
      defaultValue={selectedOptions[name]}
      className="inline-block mx-3 bg-transparent text-sm"
    >
      {values.map(function (value) {
        const selected = selectedOptions[name] === value;
        const id = `option-${name}-${value}`;
        return (
          <option value={value} id={id}>
            {value}
          </option>
        );
      })}
    </select>
  );
}

import { Image, useUrl } from "@shopify/hydrogen";

export default function NewFooter({ shop }) {
  const { pathname } = useUrl();
  const isHome = pathname === "/";
  return (
    <div
      className={`flex items-center justify-between px-6 py-4 md:px-8 md:py-3 lg:px-12 lg:py-8 ${
        isHome ? "bg-black text-white" : "bg-white"
      }`}
    >
      <div>
        COPYRIGHT © 2022{" "}
        <span className="font-bold text-rose-600">{shop.name}</span>
      </div>
      <div>
        <ul className="flex items-center gap-3">
          <li>
            <Image
              src="/assets/images/amax.svg"
              width="auto"
              height="auto"
              alt="amax"
            />
          </li>
          <li>
            <Image
              src="/assets/images/amazon.svg"
              width="auto"
              height="auto"
              alt="amazon"
            />
          </li>
          <li>
            <Image
              src="/assets/images/applePay.svg"
              width="auto"
              height="auto"
              alt="apple pay"
            />
          </li>
          <li>
            <Image
              src="/assets/images/payPal.svg"
              width="auto"
              height="auto"
              alt="paypal"
            />
          </li>
          <li>
            <Image
              src="/assets/images/shopPay.svg"
              width="auto"
              height="auto"
              alt="shop pay"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

import { useUrl } from "@shopify/hydrogen";

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
        COPYRIGHT © 2022 <span className="font-bold text-rose-600">{shop.name}</span>
      </div>
      <div>
        <ul className="flex items-center gap-3">
          <li>
            <img
              src="https://cdn.shopify.com/s/files/1/0652/5829/1412/files/shoPay.svg?v=1658404950"
              alt="shopPay"
            />
          </li>
          <li>
            <img
              src="https://cdn.shopify.com/s/files/1/0652/5829/1412/files/payPal.svg?v=1658404950"
              alt="payPal"
            />
          </li>
          <li>
            <img
              src="https://cdn.shopify.com/s/files/1/0652/5829/1412/files/applePay.svg?v=1658404950"
              alt="applePay"
            />
          </li>
          <li>
            <img
              src="https://cdn.shopify.com/s/files/1/0652/5829/1412/files/amax.svg?v=1658404950"
              alt="amax"
            />
          </li>
          <li>
            <img
              src="https://cdn.shopify.com/s/files/1/0652/5829/1412/files/amazon.svg?v=1658404950"
              alt="amazon"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

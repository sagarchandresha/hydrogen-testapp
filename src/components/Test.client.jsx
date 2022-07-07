import {
  useLoadScript,
  useRouteParams,
  useShop,
  useUrl,
  useCart,
  CartProvider,
} from "@shopify/hydrogen";

// Client component
export default function Test() {
  const { handle } = useRouteParams();
  return (
    <>
      <h1>useRouteParams() = {handle}</h1>
      useLoadScript() = <LoadScript />
      <MyPage />
      <CurrentPage />
      <Cart />
    </>
  );
}

export function LoadScript() {
  const scriptStatus = useLoadScript(
    "https://cdn.shopify.com/shopifycloud/shop-js/v0.1/client.js"
  );

  if (scriptStatus === "loading") {
    return <div>loading...</div>;
  }

  if (scriptStatus === "error") {
    return <div>error...</div>;
  }

  // shop-pay-button custom element is available to use
  return <shop-pay-button />;
}

export function MyPage() {
  const { storeDomain } = useShop();

  return <h1>useShop() = {storeDomain}</h1>;
}
export function CurrentPage() {
  const url = useUrl();
  console.log(url);
  return <>Current Page is : {url.href}</>;
}

export function Cart() {
  return (
    <CartProvider>
      <CartLineItems />
    </CartProvider>
  );
}

export function CartLineItems() {
  const cart = useCart();
  console.log("=", cart);

  return (
    <>
      {/* {lines.map((line) => {
        return <p></p>;
      })} */}
    </>
  );
}

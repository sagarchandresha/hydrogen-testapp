import {
  gql,
  ShopifyProvider,
  useShop,
  useShopQuery,
  fetchSync,
  useSession,
  Seo,
  ProductOptionsProvider,
} from "@shopify/hydrogen";
import { Suspense } from "react";
import HomeProductCard from "../components/HomeProductCard.client";
import Modal from "../components/Modal.client";

export default function ServerTest() {
  const {
    data: { products },
  } = useShopQuery({
    query: QUERY,
  });
  const { countryCode } = useSession();
  return (
    <>
      <p>--------------- Below is Server Component ------------------</p>
      <div>useSession() = {countryCode}</div>
      <MyComponent />
      <MyPage />
      <ShopifyProvider>
        <Suspense>
          <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
            <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.nodes.map((product) => (
                <ProductOptionsProvider data={product}>
                  <HomeProductCard key={product.id} product={product} />
                </ProductOptionsProvider>
              ))}
            </div>
          </section>
        </Suspense>
      </ShopifyProvider>
      <Modal />
    </>
  );
}
// Use `Suspense` boundaries to define where you want your app to display a loading indicator while your data is being accessed.
export function MyComponent() {
  return (
    <Suspense fallback="Loading...">
      <MyThings />
    </Suspense>
  );
}
function MyThings() {
  // To request data from a third-party API, pass the URL to `fetchSync` along with any arguments.
  const things = fetchSync("https://jsonplaceholder.typicode.com/todos/1", {
    method: "GET",
  }).json();
  return <h2>{things.title}</h2>;
}

export function MyPage() {
  const { storeDomain } = useShop();

  return <h1>useShop() = {storeDomain}</h1>;
}

const QUERY = gql`
  query ProductConnection {
    products(first: 8) {
      nodes {
        id
        title
        publishedAt
        handle
        images(first: 2) {
          nodes {
            url
            altText
            width
            height
          }
        }
        variants(first: 100) {
          nodes {
            id
            availableForSale
            selectedOptions {
              name
              value
            }

            image {
              url
              altText
              width
              height
            }
            priceV2 {
              amount
              currencyCode
            }
            compareAtPriceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

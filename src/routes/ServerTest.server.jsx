import {
  gql,
  ShopifyProvider,
  useShop,
  useShopQuery,
  fetchSync,
  useSession,
  Seo,
} from "@shopify/hydrogen";
import { Suspense } from "react";

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
          <Products products={products} />
        </Suspense>
      </ShopifyProvider>
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

export function Products({ products }) {
  return (
    <>
      <p className="text-3xl text-red-800">All Products</p>
      <ul className="list-decimal">
        {products.nodes.map((product) => {
          return <li key={product.id}>{product.title}</li>;
        })}
      </ul>
    </>
  );
}
const QUERY = gql`
  query ProductConnection {
    products(first: 10) {
      nodes {
        id
        title
        handle
      }
    }
  }
`;

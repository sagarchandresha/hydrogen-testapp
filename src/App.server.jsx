import renderHydrogen from "@shopify/hydrogen/entry-server";
import {
  Router,
  FileRoutes,
  ShopifyProvider,
  CartProvider,
  ShopifyAnalytics,
} from "@shopify/hydrogen";
import { Suspense } from "react";

function App({ routes }) {
  return (
    <Suspense fallback={null}>
      <ShopifyProvider>
          <CartProvider>
            <Router>
              <FileRoutes routes={routes} />
            </Router>
          </CartProvider>
          <ShopifyAnalytics cookieDomain="hydrogen-testapp.netlify.app"/>
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);

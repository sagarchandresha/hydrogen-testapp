import {
  gql,
  ShopifyProvider,
  useShopQuery,
  ProductOptionsProvider,
} from "@shopify/hydrogen";
import { Suspense } from "react";
import HomeProductCard from "../components/HomeProductCard.client";
import LandingFeatureCollection from "../components/LandingFeatureCollection.client]";

export default function ServerTest() {
  const handle = "earring";
  const {
    data: { products },
  } = useShopQuery({
    query: QUERY,
  });
  const {
    data: { collection },
  } = useShopQuery({
    query: COLLECTION_QUERY,
    variables: {
      handle,
    },
  });
  return (
    <>
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
          <section className="md:px-8 lg:px-12 mb-5">
            <LandingFeatureCollection collection={collection}/>
          </section>
        </Suspense>
      </ShopifyProvider>
    </>
  );
}

const QUERY = gql`
  fragment MediaFields on Media {
    mediaContentType
    alt
    previewImage {
      url
    }
    ... on MediaImage {
      id
      image {
        url
        width
        height
      }
    }
    ... on Video {
      id
      sources {
        mimeType
        url
      }
    }
    ... on Model3d {
      id
      sources {
        mimeType
        url
      }
    }
    ... on ExternalVideo {
      id
      embedUrl
      host
    }
  }
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
        media(first: 7) {
          nodes {
            ...MediaFields
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
const COLLECTION_QUERY = gql`
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: 8, sortKey: TITLE) {
        nodes {
          id
          title
          publishedAt
          handle
          variants(first: 1) {
            nodes {
              id
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
  }
`;

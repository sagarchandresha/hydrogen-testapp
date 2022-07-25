import { ClientAnalytics } from "@shopify/hydrogen";
import { useEffect } from "react";

let init = false;
export default function AnalyticsListener() {
  useEffect(() => {
    // Set up common page-specific data
    ClientAnalytics.pushToPageAnalyticsData({
      userLocale: navigator.language,
    });

    if (!init) {
      // One-time initialization
      init = true;
      ClientAnalytics.subscribe(
        ClientAnalytics.eventNames.PAGE_VIEW,
        (payload) => {
          try {
            ClientAnalytics.pushToServer({
              method: "post",
              headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });
          } catch (e) {
            // Error handling
          }
        }
      );
    }
  });

  return null;
}

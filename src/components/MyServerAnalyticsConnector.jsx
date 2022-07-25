export const MyServerAnalyticsConnector = {
  request(requestUrl, requestHeader, data, contentType) {
    // Send your analytics request to third-party analytics
    // Make sure to return a promise, for example
    //
    // return fetch('your_analytic_endpoint')
    return Promise.resolve();
  },
};

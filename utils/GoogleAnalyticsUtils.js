const GoogleAnalyticsUtils = () => {};

GoogleAnalyticsUtils.changeRouteGtag = (url) => {
  window.gtag("config", process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
    page_path: url,
  });
};

export default GoogleAnalyticsUtils;

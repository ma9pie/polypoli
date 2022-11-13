const GoogleAnalyticsUtils = () => {};

GoogleAnalyticsUtils.changeRouteGtag = (url) => {
  console.log(process.env.NEXT_PUBLIC_GA_TRACKING_ID);
  window.gtag("config", process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
    page_path: url,
  });
};

export default GoogleAnalyticsUtils;

const GoogleAnalyticsUtils = () => {};

// 페이지 이동 감지
GoogleAnalyticsUtils.changeRouteGtag = (url) => {
  window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  });
};

export default GoogleAnalyticsUtils;

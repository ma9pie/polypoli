/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["www.assembly.go.kr"],
  },
};

module.exports = nextConfig;

//번들파일 분석
// module.exports = withBundleAnalyzer({
//   webpack(nextConfig, options) {
//     return nextConfig;
//   },
// });

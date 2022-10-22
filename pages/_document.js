import { Head, Html, Main, NextScript } from "next/document";

function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="폴리폴리" />
        <link rel="icon" href="/public/favicon.ico" />
        {/* 다크모드 시 화면 깜빡임 제거 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const theme = localStorage.getItem("theme");
              document.documentElement.setAttribute("data-theme", theme); 
            `,
          }}
        ></script>
        {/* 구글 애널리틱스 */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      <body>
        <div id="popup-modal"></div>
        <div id="info-modal"></div>
        <div id="confirm-modal"></div>
        <div id="alert-modal"></div>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;

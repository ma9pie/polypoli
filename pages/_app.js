import COMMIT_ID from "../COMMIT_ID.json";
import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { userActions } from "@/redux/modules/user";
import { wrapper } from "@/redux/store";
import Styles from "@/common/Styles";
import GoogleAnalyticsUtils from "@/utils/GoogleAnalyticsUtils";
import "@/styles/reset.scss";
import "@/styles/fonts.scss";
import "@/styles/globals.scss";

function App({ Component, pageProps }) {
  const dispatch = useDispatch();
  const store = useStore();
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);

  // 배포 후 Cache busting
  useEffect(() => {
    const shortCommitId = COMMIT_ID.commitId?.slice(0, 6);
    let version = localStorage.getItem("version");
    if (shortCommitId && version != shortCommitId) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
      localStorage.clear();
      localStorage.setItem("version", shortCommitId);
      console.log(`🧹웹캐시를 지웠습니다. (v${shortCommitId})`);
    }
  }, []);

  // 테마 설정
  useEffect(() => {
    dispatch(userActions.setTheme(localStorage.getItem("theme")));
  }, []);

  // 구글 애널리틱스 조회수 측정
  useEffect(() => {
    const handleRouteChange = (url) => {
      GoogleAnalyticsUtils.changeRouteGtag(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <PersistGate persistor={store.__persistor}>
      <Global styles={Styles} />
      <Background>
        <Wrapper>{getLayout(<Component {...pageProps} />)}</Wrapper>
      </Background>
    </PersistGate>
  );
}

export default wrapper.withRedux(App);

const Background = styled.div`
  background-color: var(--bg20);
`;

const Wrapper = styled.div`
  min-width: var(--minWidth);
  max-width: var(--maxWidth);
  min-height: 635px;
  height: 100vh;
  margin: 0px auto;
`;

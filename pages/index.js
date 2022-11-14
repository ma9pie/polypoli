import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { isBrowser, isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "@/redux/modules/page";
import Feed from "@/components/page/Feed";
import HotBills from "@/components/page/HotBills";
import MyPage from "@/components/page/MyPage";
import ProfileList from "@/components/page/ProfileList";
import Ranking from "@/components/page/Ranking";
import DefaultLayout from "@/layouts/DefaultLayout";

function pageFrame() {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const pageRef = useRef(null);
  const router = useRouter();

  const userState = useSelector((state) => state.user);
  const pageState = useSelector((state) => state.page);

  const [offsetWidth, setOffsetWidth] = useState(428);
  const [scrollTop, setScrollTop] = useState(0);

  const [startTime, setStartTime] = useState();
  const [startX, setStartX] = useState();

  // useEffect(() => {
  // if (!isLogin()) {
  //   dispatch(pageActions.setTabNum(0));
  // }
  // }, []);

  // useEffect(() => {
  //   if (containerRef.current) {
  //     setOffsetWidth(containerRef.current.offsetWidth);
  //   }
  // }, [pageState.tabNum]);

  let resizeWindow = () => {
    setOffsetWidth(containerRef.current.offsetWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  const isLogin = () => {
    return userState.userKey !== -1;
  };

  const onTouchStart = (e) => {
    let startX;
    if (isMobile && e.changedTouches) {
      startX = e.changedTouches[0].pageX + containerRef.current.scrollLeft;
    } else if (isBrowser) {
      startX = e.pageX + containerRef.current.scrollLeft;
    } else {
      return;
    }
    setStartTime(new Date());
    setStartX(startX);
  };

  const onTouchEnd = (e) => {
    let endX;
    if (isMobile && e.changedTouches) {
      endX = e.changedTouches[0].pageX + containerRef.current.scrollLeft;
    } else if (isBrowser) {
      endX = e.pageX + containerRef.current.scrollLeft;
    } else {
      return;
    }
    const endTime = new Date();
    const criticalTime = 200;
    const criticalWidth = offsetWidth * 0.2;

    // if (userState.userKey === -1) return;

    switch (pageState.tabNum) {
      case 0:
        if (startX - endX > criticalWidth) {
          dispatch(pageActions.setTabNum(1));
        }
        break;
      case 1:
        if (endX - startX > criticalWidth) {
          dispatch(pageActions.setTabNum(0));
        }
        if (startX - endX > criticalWidth) {
          dispatch(pageActions.setTabNum(2));
        }
        break;
      case 2:
        if (endX - startX > criticalWidth) {
          dispatch(pageActions.setTabNum(1));
        }
        if (startX - endX > criticalWidth) {
          dispatch(pageActions.setTabNum(3));
        }
        break;
      case 3:
        if (endX - startX > criticalWidth) {
          dispatch(pageActions.setTabNum(2));
        }
        if (startX - endX > criticalWidth) {
          dispatch(pageActions.setTabNum(4));
        }
        break;
      case 4:
        if (endX - startX > criticalWidth) {
          dispatch(pageActions.setTabNum(3));
        }
        break;
      default:
        break;
    }
  };

  return (
    <View width={`${offsetWidth}px`}>
      <Container
        ref={containerRef}
        left={`${-offsetWidth * pageState.tabNum}px`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onTouchStart}
        onMouseUp={onTouchEnd}
      >
        <Page
          ref={pageRef}
          width={`${offsetWidth}px`}
          left={`${offsetWidth * 0}px`}
          onScroll={() => setScrollTop(parseInt(pageRef.current?.scrollTop))}
        >
          <Feed scrollTop={scrollTop}></Feed>
        </Page>
        {isLogin() ||
          (true && (
            <>
              <Page width={`${offsetWidth}px`} left={`${offsetWidth * 1}px`}>
                <Ranking></Ranking>
              </Page>
              <Page width={`${offsetWidth}px`} left={`${offsetWidth * 2}px`}>
                <HotBills></HotBills>
              </Page>
              <Page width={`${offsetWidth}px`} left={`${offsetWidth * 3}px`}>
                <ProfileList></ProfileList>
              </Page>
              <Page width={`${offsetWidth}px`} left={`${offsetWidth * 4}px`}>
                <MyPage></MyPage>
              </Page>
            </>
          ))}
      </Container>
    </View>
  );
}

export default pageFrame;

pageFrame.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

const View = styled.div`
  position: fixed;
  top: 0px;
  overflow-x: hidden;
  margin-top: 60px;
  width: 100%;
  min-width: var(--minWidth);
  max-width: var(--maxWidth);
  height: calc(100vh - 115px);
`;
const Container = styled.div`
  position: relative;
  display: flex;
  left: ${(props) => props.left};
  transition: left 0.3s ease-in-out;
  will-change: left;
`;
const Page = styled.div`
  position: absolute;
  top: 0px;
  left: ${(props) => props.left};
  width: ${(props) => props.width};
  height: calc(100vh - 117px);
  min-width: var(--minWidth);
  max-width: var(--maxWidth);
  background-color: transparent;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
    display: none;
  }
  &::-webkit-scrollbar:horizontal {
    display: none;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #4f0d92;
    border-radius: 5px;
  }
`;

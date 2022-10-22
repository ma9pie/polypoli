import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { isBrowser, isMobile } from "react-device-detect";

function PageDrag({ children }) {
  const router = useRouter();
  const dragRef = useRef(null);
  const [startTime, setStartTime] = useState();
  const [startX, setStartX] = useState();

  const onTouchStart = (e) => {
    let startX;
    if (isMobile && e.changedTouches) {
      startX = e.changedTouches[0].pageX + dragRef.current.scrollLeft;
    } else if (isBrowser) {
      startX = e.pageX + dragRef.current.scrollLeft;
    } else {
      return;
    }
    setStartTime(new Date());
    setStartX(startX);
  };

  const onTouchEnd = (e) => {
    let endX;
    if (isMobile && e.changedTouches) {
      endX = e.changedTouches[0].pageX + dragRef.current.scrollLeft;
    } else if (isBrowser) {
      endX = e.pageX + dragRef.current.scrollLeft;
    } else {
      return;
    }
    const { offsetWidth } = dragRef.current;
    const endTime = new Date();
    const criticalTime = 200;
    const criticalWidth = offsetWidth * 0.2;

    if (endTime - startTime > criticalTime) return;
    switch (router.pathname) {
      case "/":
        if (startX - endX > criticalWidth) {
          router.push("/ranking");
        }
        break;
      case "/ranking":
        if (endX - startX > criticalWidth) {
          router.push("/");
        }
        if (startX - endX > criticalWidth) {
          router.push("/hotbills");
        }
        break;
      case "/hotbills":
        if (endX - startX > criticalWidth) {
          router.push("/ranking");
        }
        if (startX - endX > criticalWidth) {
          router.push("/profileList");
        }
        break;
      case "/profileList":
        if (endX - startX > criticalWidth) {
          router.push("/hotbills");
        }
        if (startX - endX > criticalWidth) {
          router.push("/mypage");
        }
        break;
      case "/mypage":
        if (endX - startX > criticalWidth) {
          router.push("/profileList");
        }
        break;
      default:
        break;
    }
  };
  return (
    <Wrapper
      ref={dragRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onTouchStart}
      onMouseUp={onTouchEnd}
    >
      {children}
    </Wrapper>
  );
}

export default PageDrag;

const Wrapper = styled.div`
  height: calc(100vh - 60px);
`;

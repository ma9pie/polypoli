import styled from "@emotion/styled";
import { debounce, throttle } from "lodash";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import Button from "@/common/Button";
import Loading from "@/common/Loading";
import Styles from "@/common/Styles";
import TestLayout from "@/layouts/TestLayout";
import ControlUtils from "@/utils/ControlUtils";
import ModalUtils from "@/utils/ModalUtils";

function Test() {
  const dispatch = useDispatch();
  const typeList = [
    "blank",
    "balls",
    "bars",
    "bubbles",
    "cubes",
    "cylon",
    "spin",
    "spinningBubbles",
    "spokes",
  ];

  const onClickConfirm = () => {
    setIsOpenConfirm(false);
  };

  useEffect(() => {
    console.log(process.env);
    console.log(process.env.NEXT_PUBLIC_GA_TRACKING_ID);
    localStorage.setItem("test", process.env.NEXT_PUBLIC_GA_TRACKING_ID);
  }, []);

  // 복사 속도 테스트
  useEffect(() => {
    return;
    const a = clone((arr) => {
      console.log("=== Object.values(arr) 속도 ===");
      Object.values(arr);
    });
    clone((arr) => {
      console.log("=== [].concat(arr) 속도 ===");
      [].concat(arr);
    });
    clone((arr) => {
      console.log("=== arr.slice() 속도 ===");
      arr.slice();
    });
    clone((arr) => {
      console.log("=== arr.push() 속도 ===");
      const a = [];
      for (let val of arr) {
        a.push(val);
      }
      return a;
    });
    clone((arr) => {
      console.log("=== [...arr] 속도 ===");
      [...arr];
    });
    clone((arr) => {
      console.log("=== JSON.parse(JSON.stringify(arr) 속도 ===");
      JSON.parse(JSON.stringify(arr));
    });
    clone((arr) => {
      console.log("=== arr.map((i) => i) 속도 ===");
      arr.map((i) => i);
    });
    clone((arr) => {
      console.log("=== clonedeep(arr) 속도 ===");
      clonedeep(arr);
    });
    clone((arr) => {
      console.log("=== Object.assign([], arr) 속도 ===");
      Object.assign([], arr);
    });
    // RangeError: Maximum call stack size exceeded
    // clone((arr) => {
    //   console.log("===  Array.of(...arr) 속도 ===");
    //   Array.of(...arr);
    // });
  }, []);

  const clone = (fn) => {
    const arr = [...Array(1000000)];
    console.time("timer");
    fn(arr);
    console.timeEnd("timer");
    console.log("\n");
  };

  const TestComponent = () => {
    return (
      <TextBox>
        <Body>내용1</Body>
        <Body>내용2</Body>
        <Body>내용3</Body>
      </TextBox>
    );
  };

  if (process.env.NEXT_PUBLIC_MODE === "production") {
    return <></>;
  }

  return (
    <Container>
      <Div>{process.env.NEXT_PUBLIC_MODE}</Div>
      <Section>
        <Button
          onClick={() => {
            ControlUtils.doubleClickPrevention(() => {
              console.log("doubleClickPrevention");
            });
          }}
        >
          doubleClickPrevention
        </Button>
      </Section>

      <Section>
        <Title>Modal Utils</Title>
        <Grid>
          <ButtonBox>
            <Button
              onClick={() => {
                ModalUtils.openAlert({
                  message:
                    "Alert Modal Util\nAlert Modal Util\nAlert Modal Util\nAlert Modal Util",
                  confirmBtnText: "완료",
                  component: TestComponent,
                  onAfterOpen: () => {
                    console.log("onAfterOpen() 함수 실행");
                  },
                  onAfterClose: () => {
                    console.log("onAfterClose() 함수 실행");
                  },
                });
              }}
            >
              Alert
            </Button>
          </ButtonBox>

          <ButtonBox>
            <Button
              onClick={() => {
                ModalUtils.openConfirm({
                  message:
                    "Confirm Modal Util\nConfirm Modal Util\nConfirm Modal Util\nConfirm Modal Util",
                  cancleBtnText: "닫기",
                  confirmBtnText: "계정잠금 진행",
                  component: TestComponent,
                  onAfterOpen: () => {
                    console.log("onAfterOpen() 함수 실행");
                  },
                  onAfterClose: () => {
                    console.log("onAfterClose() 함수 실행");
                  },
                  onRequestConfirm: () => {
                    console.log("onRequestConfirm() 함수 실행");
                  },
                  onRequestCancle: () => {
                    console.log("onRequestCancle() 함수 실행");
                  },
                });
              }}
            >
              Confirm
            </Button>
          </ButtonBox>

          <ButtonBox>
            <Button
              onClick={() => {
                ModalUtils.openInfo({
                  title: "제목",
                  message:
                    "Info Modal UtilInfo Modal UtilInfo Modal UtilInfo Modal Util",
                  component: TestComponent,
                  onAfterOpen: () => {
                    console.log("onAfterOpen() 함수 실행");
                  },
                  onAfterClose: () => {
                    console.log("onAfterClose() 함수 실행");
                  },
                });
              }}
            >
              Info
            </Button>
          </ButtonBox>

          <ButtonBox>
            <Button
              onClick={() => {
                {
                  ModalUtils.openPopup({
                    title: "Popup",
                    message:
                      "Popup Modal Util\nPopup Modal Util\nPopup Modal Util\nPopup Modal Util",
                    doNotSeeText: "5초 동안 보지 않기",
                    confirmBtnText: "읽음",
                    cookieName: "test",
                    maxAge: 5,
                    component: TestComponent,
                    onAfterOpen: () => {
                      console.log("onAfterOpen() 함수 실행");
                    },
                    onAfterClose: () => {
                      console.log("onAfterClose() 함수 실행");
                    },
                    onRequestDoNotSee: () => {
                      console.log("onRequestDoNotSee() 함수 실행");
                    },
                  });
                }
              }}
            >
              Popup
            </Button>
          </ButtonBox>
        </Grid>
      </Section>
      <Section>
        <Title>로딩바 리스트</Title>
        <Grid>
          {typeList.map((type, key) => (
            <Div key={key}>
              <ReactLoading
                type={type}
                color="var(--text)"
                height={30}
                width={30}
              />
              <Description>{type}</Description>
            </Div>
          ))}
        </Grid>
      </Section>
    </Container>
  );
}

export default Test;

Test.getLayout = function getLayout(page) {
  return <TestLayout>{page}</TestLayout>;
};

const Container = styled.div`
  margin: 0px 20px;
  height: calc(100vh - 60px);
`;

const Section = styled.div``;

const Grid = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 20px;
  margin: 20px 0px;
`;

const Div = styled.div``;

const Title = styled.h1`
  ${Styles.large_m}
`;

const Description = styled.h1`
  ${Styles.small_r}
`;

const ButtonBox = styled.div`
  width: 80px;
  height: 45px;
`;

const Box = styled.div`
  margin: 20px 0px;
`;

const Body = styled.div`
  ${Styles.base_r}
`;

const TextBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--bg60);
  & * {
    background-color: inherit;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 20px;
  height: 30px;
  background: ${(props) => props.background};
  border-radius: 15px;
`;

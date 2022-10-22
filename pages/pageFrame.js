import styled from "@emotion/styled";
import clonedeep from "lodash.clonedeep";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/redux/modules/user";
import Button from "@/common/Button";
import Loading from "@/common/Loading";
import Styles from "@/common/Styles";
import DefaultLayout from "@/layouts/DefaultLayout";
import SessionLayout from "@/layouts/SessionLayout";
import TestLayout from "@/layouts/TestLayout";
import ModalUtils from "@/utils/ModalUtils";
import CongressmanAPI from "@/api/CongressmanAPI";
import UserAPI from "@/api/UserAPI";
import ArrowLeftSvg from "@/svg/ArrowLeft";
import StampSvg from "@/svg/Stamp";

function pageFrame() {
  const router = useRouter();
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [tmp, set] = useState();

  useEffect(() => {}, []);

  const onClick = () => {
    setTmp();
  };

  return <Container>페이지 보일러 플레이트</Container>;
}

export default pageFrame;

pageFrame.getLayout = function getLayout(page) {
  return <TestLayout>{page}</TestLayout>;
};

const Container = styled.div`
  ${Styles.base_r}
  text-align:center;
`;

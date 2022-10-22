import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "@/redux/modules/user";
import MoonSvg from "@/svg/Moon";
import SunSvg from "@/svg/Sun";

const Theme = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("Light");

  const setDark = useCallback(() => {
    localStorage.setItem("theme", "Dark");
    document.documentElement.setAttribute("data-theme", "Dark");
    setTheme("Dark");
    dispatch(userActions.setTheme("Dark"));
  }, []);

  const setLight = () => {
    localStorage.setItem("theme", "Light");
    document.documentElement.setAttribute("data-theme", "Light");
    setTheme("Light");
    dispatch(userActions.setTheme("Light"));
  };

  const toggleTheme = (e) => {
    if (theme === "Light") {
      setDark();
    } else {
      setLight();
    }
  };
  const storedTheme = localStorage.getItem("theme");

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: Dark)").matches;

  const defaultDark =
    storedTheme === "Dark" || (storedTheme === null && prefersDark);

  useEffect(() => {
    if (defaultDark) {
      setDark();
    }
  }, [defaultDark, setDark]);

  return (
    <Container onClick={toggleTheme}>
      <Icon>{theme === "Dark" ? <MoonSvg></MoonSvg> : <SunSvg></SunSvg>}</Icon>
      <Subtitle>테마 변경</Subtitle>
    </Container>
  );
};

export default Theme;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  margin: 20px 0px;
`;

const Icon = styled.div`
  margin-right: 20px;
`;
const Subtitle = styled.div`
  ${Styles.base_r}
`;

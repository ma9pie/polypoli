import Button from "@/common/Button";
import Chevron from "@/common/Chevron";
import Dropdown from "@/common/Dropdown";
import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/redux/modules/user";
import SettingLayout from "@/layouts/SettingLayout";
import ModalUtils from "@/utils/ModalUtils";
import UserAPI from "@/api/UserAPI";
import ProfileIcon from "@/svg/ProfileIcon";
import checked from "@/images/checked.svg";
import unchecked from "@/images/unchecked.svg";

function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const colorList = [
    "#E3E3E3",
    "#E5523E",
    "#A4F028",
    "#FFAB5E",
    "#A4F028",
    "#6BECFE",
  ];

  const yearOfBirthList = [...Array(73)].map((v, i) => 2022 - i);
  const [userImg, setUserImg] = useState(0);
  const [userName, setUserName] = useState("");
  const [userYearOfBirth, setUserYearOfBirth] = useState("");
  const [userGender, setUserGender] = useState("");
  const [isUserNameUnusable, setIsUserNameUnusable] = useState(false);
  const [activeBtn, setActiveBtn] = useState(false);

  // 입력 초기 세팅
  useEffect(() => {
    setUserImg(userState.userImg);
    setUserName(userState.userName);
    setUserYearOfBirth(userState.userYearOfBirth);
    setUserGender(userState.userGender);
  }, []);

  // validation check
  useEffect(() => {
    let check = true;
    if (userImg < 0 || colorList.length <= userImg) check = false;
    if (userName === "") check = false;
    if (userYearOfBirth === "") check = false;
    if (userGender === "") check = false;
    if (isUserNameUnusable) check = false;

    setActiveBtn(check);
  }, [userImg, userName, userYearOfBirth, userGender, isUserNameUnusable]);

  // 프로필 이미지 변경
  const changeProfileImage = (d) => {
    let tmpImgNum = userImg;
    tmpImgNum += d;

    if (tmpImgNum < 0) {
      tmpImgNum = colorList.length - 1;
    } else if (tmpImgNum >= colorList.length) {
      tmpImgNum = 0;
    }
    setUserImg(tmpImgNum);
  };

  // 별명 중복체크
  const handleUserName = throttle((e) => {
    const { value } = e.target;
    setUserName(value);
    if (value !== userState.userName) {
      UserAPI.getUserByUserName(value).then((res) => {
        if (res.data === "") {
          setIsUserNameUnusable(false);
        } else {
          setIsUserNameUnusable(true);
        }
      });
    }
  }, 100);

  // 마이페이지 프로필 설정
  const setUserProfile = () => {
    const userProfileData = {
      userKey: userState.userKey,
      userName: userName,
      userGender: userGender,
      userYearOfBirth: userYearOfBirth,
      userImg: userImg,
    };
    UserAPI.updateUserProfile(userProfileData);
    dispatch(userActions.setProfile(userProfileData));
    ModalUtils.openAlert({
      message: "프로필 변경이 완료되었습니다.",
      onAfterClose: () => {
        router.push("/");
      },
    });
  };

  return (
    <Container>
      {/* 프로필 이미지 */}
      <ImageContainer>
        <ArrowButtonBox onClick={() => changeProfileImage(-1)}>
          <Chevron type="left"></Chevron>
        </ArrowButtonBox>
        <ImageBox>
          <ProfileIcon fill={colorList[userImg]}></ProfileIcon>
        </ImageBox>
        <ArrowButtonBox onClick={() => changeProfileImage(1)}>
          <Chevron type="right"></Chevron>
        </ArrowButtonBox>
      </ImageContainer>

      {/* 지역 */}
      <ItemContainer>
        <Subtitle>지역</Subtitle>
        <InputBox>
          <Input readOnly value={userState.userArea}></Input>
        </InputBox>
      </ItemContainer>
      <InfoMsg>지역 선택 이후에는 3개월 간 변경이 불가능합니다.</InfoMsg>

      {/* 별명 */}
      <ItemContainer>
        <Subtitle>별명</Subtitle>
        <InputBox>
          <Input
            placeholder="별명을 입력하세요."
            value={userName}
            onChange={handleUserName}
          ></Input>
        </InputBox>
      </ItemContainer>
      <ErrorMsg visibility={isUserNameUnusable ? "" : "hidden"}>
        이미 사용중인 별명입니다.
      </ErrorMsg>

      {/* 출생년도 */}
      <ItemContainer>
        <Subtitle>출생년도</Subtitle>
        <DropdownWrapper>
          <Dropdown
            placeholder="출생년도를 입력하세요"
            list={yearOfBirthList}
            value={userYearOfBirth}
            setValue={setUserYearOfBirth}
          ></Dropdown>
        </DropdownWrapper>
      </ItemContainer>
      <ErrorMsg></ErrorMsg>

      {/* 성별 */}
      <ItemContainer>
        <Subtitle>성별</Subtitle>
        <RadioButtonContainer>
          <RadioButtonBox onClick={() => setUserGender("male")}>
            {userGender === "male" ? (
              <Image src={checked} alt="radio_button"></Image>
            ) : (
              <Image src={unchecked} alt="radio_button"></Image>
            )}
            {"  남성"}
          </RadioButtonBox>
          <RadioButtonBox onClick={() => setUserGender("female")}>
            {userGender === "female" ? (
              <Image src={checked} alt="radio_button"></Image>
            ) : (
              <Image src={unchecked} alt="radio_button"></Image>
            )}
            {"  여성"}
          </RadioButtonBox>
        </RadioButtonContainer>
      </ItemContainer>
      <ErrorMsg></ErrorMsg>

      {/* 완료하기 버튼 */}
      <ButtonBox>
        {activeBtn ? (
          <Button onClick={setUserProfile}>완료하기</Button>
        ) : (
          <Button disabled={true}>완료하기</Button>
        )}
      </ButtonBox>
    </Container>
  );
}

export default Profile;

Profile.getLayout = function getLayout(page) {
  return <SettingLayout>{page}</SettingLayout>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 84px);
  margin: 0px 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 0px 25px 0px;
`;

const ArrowButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 60px;
  cursor: pointer;
`;

const ImageBox = styled.div`
  width: 80px;
  height: 80px;
  margin: 0px 20px;
  user-select: none;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 40px;
  height: 40px;
  margin-bottom: 8px;
`;

const Subtitle = styled.div`
  ${Styles.base_m};
  user-select: none;
  width: 20%;
`;
const InputBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #c7c8ce;
  border-radius: 10px;
  width: 80%;
  height: 100%;
  padding: 0px 16px;
`;

const Input = styled.input`
  ${Styles.base_r};
  width: 100%;
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #888e95;
  }
`;

const DropdownWrapper = styled.div`
  width: 80%;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
  height: 100%;
`;
const RadioButtonBox = styled.div`
  user-select: none;
  cursor: pointer;
`;

const InfoMsg = styled.div`
  ${Styles.tiny_r};
  color: var(--bg80);
  min-height: 32px;
  height: 32px;
  margin-left: 20%;
  margin-bottom: 8px;
`;
const ErrorMsg = styled.div`
  ${Styles.tiny_r};
  color: var(--negative100);
  min-height: 32px;
  height: 32px;
  margin-left: 20%;
  margin-bottom: 8px;
  visibility: ${(props) => props.visibility};
`;
const ButtonBox = styled.div`
  padding-top: 75px;
  margin-top: auto;
  margin-bottom: 60px;
`;

import Button from "@/common/Button";
import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import debounce from "lodash/debounce";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/redux/modules/user";
import SettingLayout from "@/layouts/SettingLayout";
import ModalUtils from "@/utils/ModalUtils";
import CongressmanAPI from "@/api/CongressmanAPI";
import RegionListAPI from "@/api/RegionListAPI";
import UserAPI from "@/api/UserAPI";
import SearchIconSvg from "@/svg/SearchIcon";

const areaList = [
  { id: "강원도", value: "강원" },
  { id: "경기도", value: "경기" },
  { id: "경상남도", value: "경남" },
  { id: "경상북도", value: "경북" },
  { id: "광주광역시", value: "광주" },
  { id: "대구광역시", value: "대구" },
  { id: "대전광역시", value: "대전" },
  { id: "부산광역시", value: "부산" },
  { id: "서울특별시", value: "서울" },
  { id: "세종특별자치시", value: "세종" },
  { id: "울산광역시", value: "울산" },
  { id: "인천광역시", value: "인천" },
  { id: "전라남도", value: "전남" },
  { id: "전라북도", value: "전북" },
  { id: "제주특별자치도", value: "제주" },
  { id: "충청남도", value: "충남" },
  { id: "충청북도", value: "충북" },
];

function Region() {
  const router = useRouter();
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);

  const [progress, setProgress] = useState(1);
  const [search, setSearch] = useState("");
  const [regionList, setRegionList] = useState([]);
  const [congressmanData, setCongressmanData] = useState({
    area: "",
    region: "",
    city: "",
    electoralDistrict: "",
    congressmanId: "",
    name: "",
    party: "",
    img: "",
  });

  // 주소 데이터 호출
  useEffect(() => {
    RegionListAPI.getRegionList().then((res) => {
      let regionList = [];
      for (let i = 0; i < res.data.length; i++) {
        const city = res.data[i].city;
        const town = res.data[i].town;
        const townShip = res.data[i].townShip;
        const electoralDistrict = res.data[i].electoralDistrict;
        const address = city + " " + town + " " + townShip;
        regionList.push([address, electoralDistrict]);
      }
      setRegionList(regionList);
    });
  }, []);

  // 주소 검색 (디바운스 적용)
  const handleInput = debounce((e) => {
    setSearch(e.target.value);
  }, 100);

  // 검색결과 지역 클릭
  const onClickRegion = (data) => {
    const area = data[0].trim();
    const city = areaList.find((obj) => obj.id === area.split(" ")[0]).value;
    const electoralDistrict = data[1].trim();
    const region = city + " " + electoralDistrict;

    CongressmanAPI.getCongressmanByRegion(region).then((res) => {
      setCongressmanData({
        area: area,
        region: region,
        city: city,
        electoralDistrict: electoralDistrict,
        congressmanId: res.data.congressmanId,
        name: res.data.name,
        party: res.data.party,
        img: res.data.profileImage,
      });
      setProgress(2);
    });
  };

  // 지역 설정
  const setRegion = () => {
    const userRegionData = {
      userKey: userState.userKey,
      userArea: congressmanData.area,
      userRegion: congressmanData.region,
      regionCongressmanId: congressmanData.congressmanId,
    };
    UserAPI.updateUserRegion(userRegionData);
    dispatch(userActions.setRegion(userRegionData));
    ModalUtils.openAlert({
      message: `내 지역 변경이 완료되었습니다.`,
      onAfterClose: () => {
        router.push("/");
      },
    });
  };

  return (
    <Container>
      {progress === 1 ? (
        <>
          <TextBox>
            <Text>자신의 지역구 국회의원을 등록하기 위해</Text>
            <Text>
              <HighlightText>본인의 주민등록상 주소</HighlightText>를 기준으로
            </Text>
            <Text>지역을 검색해주세요.</Text>
          </TextBox>
          <InputBox>
            <SearchIconSvg></SearchIconSvg>
            <Input
              placeholder="동명(읍,면)으로 검색 (ex. 서초동)"
              onChange={handleInput}
            ></Input>
          </InputBox>
          {search === "" ? (
            <ResultTitle>
              지역 선택 이후에는 3개월 간 변경이 불가능합니다.
            </ResultTitle>
          ) : (
            <>
              <ResultTitle>'{search}' 검색결과</ResultTitle>
              <ListContainer>
                {regionList
                  .filter((item) => item[0].includes(search))
                  .map((item, key) => (
                    <List key={key}>
                      <ResultText onClick={() => onClickRegion(item)}>
                        {item[0]}
                      </ResultText>
                      <Bar></Bar>
                    </List>
                  ))}
              </ListContainer>
            </>
          )}
        </>
      ) : (
        <>
          <TextBox>
            <Text>
              지역 선택 이후에는
              <HighlightText>3개월</HighlightText> 간 변경이 불가능합니다.
            </Text>
            <Text>지역 설정을 완료하시겠습니까?</Text>
          </TextBox>
          <CongressmanContainer>
            <Text>내 지역 국회의원</Text>
            <CongressmanProfileBox>
              <ProfileImg>
                <Image
                  src={congressmanData.img}
                  alt="congressman_img"
                  width={65}
                  height={78}
                ></Image>
              </ProfileImg>
              <Box>
                <Name>{congressmanData.name}</Name>
                <Party>{congressmanData.party}</Party>
                <ElectoralDistrict>
                  {congressmanData.electoralDistrict}
                </ElectoralDistrict>
              </Box>
            </CongressmanProfileBox>
          </CongressmanContainer>
          <ButtonBox>
            <Button onClick={setRegion}>지역 설정하기</Button>
          </ButtonBox>
        </>
      )}
    </Container>
  );
}

export default Region;

Region.getLayout = function getLayout(page) {
  return <SettingLayout>{page}</SettingLayout>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
  height: calc(100vh - 84px);
`;
const TextBox = styled.div`
  margin: 56px 0px 37px 0px;
`;
const Text = styled.div`
  ${Styles.base_m}
  line-height:28px;
`;
const HighlightText = styled.span`
  color: var(--brand100);
  font-weight: 700;
`;
const InputBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #c7c8ce;
  border-radius: 10px;
  padding: 11px 12px;
  height: 45px;
`;
const Input = styled.input`
  width: 90%;
  border: none;
  margin-left: 8px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #888e95;
  }
`;
const ResultTitle = styled.div`
  ${Styles.small_m};
  margin: 26px 12px 0px 12px;
`;
const ListContainer = styled.div`
  overflow: auto;
  margin-top: 34px;
  margin-bottom: 30px;
  height: calc(100%);

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar:horizontal {
    display: none;
  }
  &::-webkit-scrollbar-track {
    background: var(--bg20);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #4f0d92;
    border-radius: 5px;
  }
`;
const List = styled.div`
  margin-top: 15px;
  cursor: pointer;
`;
const ResultText = styled.div`
  ${Styles.base_r}
`;
const Bar = styled.div`
  border: 1px solid #e1e6e8;
  margin-top: 15px;
`;
const CongressmanContainer = styled.div`
  margin-top: 70px;
`;
const CongressmanProfileBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 35px;
  padding-bottom: 128px;
`;
const ProfileImg = styled.div`
  top: 10px;
  width: 65px;
  height: 78px;
  border-radius: 15px;
  overflow: hidden;
  img {
    object-fit: cover;
    object-position: center top;
  }
`;
const Box = styled.div`
  margin-left: 11px;
`;
const Name = styled.div`
  ${Styles.large_m}
`;
const Party = styled.div`
  ${Styles.small_m}
  margin-top: 9px;
`;
const ElectoralDistrict = styled.div`
  ${Styles.small_m}
  margin-top: 2px;
`;
const ButtonBox = styled.div`
  margin-top: auto;
  margin-bottom: 60px;
`;

import Button from "@/common/Button";
import Dropdown from "@/common/Dropdown";
import Input from "@/common/Input";
import Loading from "@/common/Loading";
import ProfileImage from "@/common/ProfileImage";
import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import clonedeep from "lodash.clonedeep";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/redux/modules/user";
import CongressmanAPI from "@/api/CongressmanAPI";
import UserAPI from "@/api/UserAPI";

function SearchCongressman() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const regionList = [
    "전체",
    "강원",
    "경기",
    "경남",
    "경북",
    "광주",
    "대구",
    "대전",
    "부산",
    "서울",
    "세종",
    "울산",
    "인천",
    "전남",
    "전북",
    "제주",
    "충남",
    "충북",
    "비례대표",
  ];
  const partyList = [
    "전체",
    "국민의당",
    "국민의힘",
    "기본소득당",
    "더불어민주당",
    "무소속",
    "시대전환",
    "정의당",
  ];

  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [party, setParty] = useState("");
  const [totalCongressmanNum, setTotalCongressmanNum] = useState(0);
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  // 총 국회의원 수 조회
  useEffect(() => {
    CongressmanAPI.searchCongressmanList("%", "%", "%").then((res) => {
      setTotalCongressmanNum(res.data.length);
    });
  }, []);

  // 검색하기
  const onClickSearch = () => {
    let tmpName = name;
    let tmpRegion = region;
    let tmpParty = party;

    if (tmpName === "") {
      tmpName = "%";
    } else {
      tmpName = `%${name}%`;
    }

    if (tmpRegion === "" || tmpRegion === "전체") {
      tmpRegion = "%";
    } else {
      tmpRegion = `%${region}%`;
    }

    if (tmpParty === "" || tmpParty === "전체") {
      tmpParty = "%";
    } else {
      tmpParty = `%${party}%`;
    }

    setIsLoading(true);
    CongressmanAPI.searchCongressmanList(tmpName, tmpRegion, tmpParty).then(
      (res) => {
        const tmpSearchResult = res.data;
        const followingList = userState.userFollowings.split(",");
        for (let i = 0; i < tmpSearchResult.length; i++) {
          const congressmanId = tmpSearchResult[i].congressmanId;
          const isIncluded = followingList.find(
            (id) => String(congressmanId) === id
          );
          if (isIncluded !== undefined) {
            tmpSearchResult[i].follow = true;
          }
        }
        setSearchResult(tmpSearchResult);
        setSearchCompleted(true);
        setIsLoading(false);
      }
    );
  };

  // 팔로잉 & 언팔로잉
  const onChangeFollow = (key) => {
    let tmpSearchResult = clonedeep(searchResult);
    tmpSearchResult[key].follow = !tmpSearchResult[key].follow;

    setSearchResult(tmpSearchResult);

    UserAPI.updateUserFollowings(
      userState.userKey,
      tmpSearchResult[key].congressmanId
    );
    dispatch(
      userActions.setUserFollowings({
        congressmanId: tmpSearchResult[key].congressmanId,
        follow: tmpSearchResult[key].follow,
      })
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  return (
    <Container>
      <Content>
        <Title>이름</Title>
        <Input
          placeholder="이름 입력"
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
        ></Input>
      </Content>
      <Content>
        <Title>지역</Title>
        <Dropdown
          height="45px"
          placeholder="전체"
          list={regionList}
          value={region}
          setValue={setRegion}
        ></Dropdown>
      </Content>
      <Content>
        <Title>소속 정당</Title>
        <Dropdown
          height="45px"
          placeholder="전체"
          list={partyList}
          value={party}
          setValue={setParty}
        ></Dropdown>
      </Content>
      <ButtonBox>
        <Button onClick={onClickSearch}>검색하기</Button>
      </ButtonBox>

      {isLoading && <Loading top="75%"></Loading>}

      {searchCompleted && (
        <ResultText>
          {`총 ${totalCongressmanNum}명의 의원 중/ 검색결과 ${searchResult.length}명`}
        </ResultText>
      )}

      {searchResult.length !== 0 && (
        <CongressmanListContainer>
          <Divider></Divider>
          {searchResult.map((item, key) => (
            <CongressmanBox key={key}>
              <ProfileBox
                onClick={() => router.push("/profile/" + item.congressmanId)}
              >
                <ProfileImage src={item.profile_image}></ProfileImage>
                <NamePartyBox>
                  <Name>{item.name}</Name>
                  <Party>{item.party}</Party>
                </NamePartyBox>
              </ProfileBox>
              <FollowButton
                backgroundColor={
                  item.follow ? "var(--bg60)" : "var(--brand100)"
                }
                onClick={() => {
                  onChangeFollow(key);
                }}
              >
                {item.follow ? "팔로잉" : "팔로우"}
              </FollowButton>
            </CongressmanBox>
          ))}
        </CongressmanListContainer>
      )}
    </Container>
  );
}

export default SearchCongressman;

const Container = styled.div`
  padding-bottom: 80px;
`;

const Content = styled.div`
  margin-bottom: 25px;
  padding: 0px 20px;
`;

const Title = styled.h3`
  ${Styles.base_m};
  margin-bottom: 7px;
`;

const ButtonBox = styled.div`
  margin: 17px 20px 45px 20px;
`;

const ResultText = styled.div`
  ${Styles.base_m};
  padding: 0px 20px 54px 20px;
`;
const Divider = styled.div`
  border-bottom: 1px solid var(--bg40);
`;

const CongressmanListContainer = styled.div``;

const CongressmanBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 93px;
  padding: 0px 20px;
  border-bottom: 1px solid var(--bg40);
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const NamePartyBox = styled.div`
  margin-left: 10px;
`;

const Name = styled.div`
  ${Styles.base_m};
  margin-bottom: 2px;
`;
const Party = styled.div`
  ${Styles.small_r};
`;

const FollowButton = styled.div`
  ${Styles.tiny_m};
  width: 70px;
  height: 24px;
  line-height: 24px;
  color: white;
  text-align: center;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 5px;
  cursor: pointer;
`;

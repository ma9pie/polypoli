import styled from "@emotion/styled";
import clonedeep from "lodash.clonedeep";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/redux/modules/user";
import FollowButton from "@/common/FollowButton";
import Loading from "@/common/Loading";
import Styles from "@/common/Styles";
import SessionLayout from "@/layouts/SessionLayout";
import CongressmanAPI from "@/api/CongressmanAPI";
import UserAPI from "@/api/UserAPI";
import StampSvg from "@/svg/Stamp";

function ProfileList() {
  const router = useRouter();
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [userStamp, setUserStamp] = useState(false);
  const [regionCongressmanProfile, setRegionCongressmanProfile] = useState({});
  const [interestCongressmanProfiles, setInterestCongressmanProfiles] =
    useState([]);
  const [
    totalNumberOfInterestCongressman,
    setTotalNumberOfInterestCongressman,
  ] = useState(0);

  useEffect(() => {
    const { userId, regionCongressmanId, userStamp } = userState;
    // 도장 정보
    setUserStamp(userStamp);

    // 지역구의원 정보
    CongressmanAPI.getCongressman(regionCongressmanId).then((res) => {
      setRegionCongressmanProfile(res.data);
      setIsLoading(false);
    });

    // 관심 국회의원 정보 가져오기
    CongressmanAPI.getInterestCongressmenByUserId(userId).then((res) => {
      let tmpInterestCongressmanProfiles = [];

      res.data.map((item) => {
        item.follow = true;
        tmpInterestCongressmanProfiles.push(item);
      });

      setInterestCongressmanProfiles(tmpInterestCongressmanProfiles);
      setTotalNumberOfInterestCongressman(
        tmpInterestCongressmanProfiles.length
      );
    });
  }, []);

  // 선거도장
  const onChangeStamp = () => {
    setUserStamp(!userStamp);
    dispatch(userActions.setUserStamp(!userStamp));
    UserAPI.updateUserStamp(userState.userKey, !userStamp);
  };

  // 팔로잉&팔로우
  const onChangeFollow = (idx) => {
    const follow = !interestCongressmanProfiles[idx].follow;
    // 해당 인덱스의 국회의원 팔로우 state 변경
    let tmpInterestCongressmanProfiles = clonedeep(interestCongressmanProfiles);
    tmpInterestCongressmanProfiles[idx].follow = follow;

    // state 업데이트
    setInterestCongressmanProfiles(tmpInterestCongressmanProfiles);
    setTotalNumberOfInterestCongressman(
      tmpInterestCongressmanProfiles.filter((item) => item.follow).length
    );

    // API 호출
    UserAPI.updateUserFollowings(
      userState.userKey,
      interestCongressmanProfiles[idx].congressmanId
    );

    // 리덕스 업데이트
    dispatch(
      userActions.setUserFollowings({
        congressmanId: interestCongressmanProfiles[idx].congressmanId,
        follow: follow,
      })
    );
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <Container>
      <ProfileContainer>
        <Title>
          <Text>내 지역구 국회의원</Text>
        </Title>
        <Description>
          <SubText>
            내일이 투표일이라면 {regionCongressmanProfile.name} 의원을 다시 뽑을
            건가요?
          </SubText>
        </Description>

        {/* 지역구 국회의원 프로필 */}
        <RegionCongressmanProgileBox>
          <ProfileBox
            onClick={() =>
              router.push("/profile/" + regionCongressmanProfile.congressmanId)
            }
          >
            <Span>
              <ProfileImg width="80px" height="90px">
                {regionCongressmanProfile.profileImage && (
                  <Image
                    src={regionCongressmanProfile.profileImage}
                    alt="profile_img"
                    width={80}
                    height={90}
                  ></Image>
                )}
              </ProfileImg>
            </Span>
            <Span>
              <Name marginBottom="10px">
                <Text> {regionCongressmanProfile.name}</Text>
              </Name>
              <Party>
                <SubText>{regionCongressmanProfile.party}</SubText>
              </Party>
              <Region>
                <SubText>{regionCongressmanProfile.region}</SubText>
              </Region>
            </Span>
          </ProfileBox>
          <StampIcon onClick={onChangeStamp}>
            <StampSvg
              fill={userStamp ? "var(--negative100)" : "var(--bg60)"}
            ></StampSvg>
          </StampIcon>
        </RegionCongressmanProgileBox>
      </ProfileContainer>

      {/* 관심 국회의원 목록 */}
      <ListContainer>
        <Title>
          <Text>관심 국회의원</Text>
          <Text>{totalNumberOfInterestCongressman}명</Text>
        </Title>
        {interestCongressmanProfiles.map((item, key) => (
          <ListBox key={key}>
            <ProfileBox
              onClick={() => router.push("/profile/" + item.congressmanId)}
            >
              <Span>
                <ProfileImg width="60px" height="60px">
                  {item.profileImage && (
                    <Image
                      src={item.profileImage}
                      alt="profile_img"
                      width={60}
                      height={60}
                    ></Image>
                  )}
                </ProfileImg>
              </Span>
              <Span>
                <Name marginBottom="2px">
                  <Text> {item.name}</Text>
                </Name>
                <Party>
                  <SubText>{item.party}</SubText>
                </Party>
              </Span>
            </ProfileBox>
            <FollowButton
              text={item.follow ? "팔로잉" : "팔로우"}
              backgroundColor={item.follow ? "var(--bg60)" : "var(--brand100)"}
              onClick={() => {
                onChangeFollow(key);
              }}
            ></FollowButton>
          </ListBox>
        ))}
      </ListContainer>
    </Container>
  );
}

export default React.memo(ProfileList);

ProfileList.getLayout = function getLayout(page) {
  return <SessionLayout>{page}</SessionLayout>;
};

const Container = styled.div``;
const Text = styled.div`
  ${Styles.base_m}
`;
const SubText = styled.div`
  ${Styles.small_r}
`;
const Div = styled.div`
  display: flex;
`;
const ProfileBox = styled.div`
  display: flex;
  cursor: pointer;
`;
const Span = styled.span``;
const ProfileContainer = styled.div`
  padding: 20px 20px 40px 20px;
  margin-bottom: 10px;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const Description = styled.div``;

const RegionCongressmanProgileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;
const ProfileImg = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 10px;
  margin-right: 10px;
  overflow: hidden;
  cursor: pointer;
  img {
    object-fit: cover;
    object-position: center top;
  }
`;
const Name = styled.div`
  margin-top: 5px;
  margin-bottom: ${(props) => props.marginBottom};
`;
const Party = styled.div`
  margin-bottom: 2px;
`;
const Region = styled.div``;
const StampIcon = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;
const ListContainer = styled.div`
  padding: 20px;
`;
const ListBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
`;

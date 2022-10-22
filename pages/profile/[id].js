import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/redux/modules/user";
import AttendanceTable from "@/components/profile/AttendanceTable";
import BarChart from "@/components/profile/BarChart";
import BillTable from "@/components/profile/BillTable";
import StackedBarChart from "@/components/profile/StackedBarChart";
import FollowButton from "@/common/FollowButton";
import ProfileContent from "@/common/ProfileContent";
import Styles from "@/common/Styles";
import SessionLayout from "@/layouts/SessionLayout";
import ModalUtils from "@/utils/ModalUtils";
import BillAPI from "@/api/BillAPI";
import CongressmanAPI from "@/api/CongressmanAPI";
import CongressmanBillMappingAPI from "@/api/CongressmanBillMappingAPI.js";
import UserAPI from "@/api/UserAPI";
import MedalSvg from "@/svg/Medal";
import QuestionMarkSvg from "@/svg/QuestionMark";

function Profile() {
  const router = useRouter();
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [congressmanProfile, setCongressmanProfile] = useState({});
  const [billIds, setBillIds] = useState();
  const [mainProposerBillIds, setMainProposerBillIds] = useState([]);
  const [bills, setBills] = useState([]);
  const [billProcessingStatus, setBillProcessingStatus] = useState([]);
  const [mainProposerBillStatus, setMainProposerBillStatus] = useState([]);
  const [totalMainProposerBillNum, setTotalMainProposerBillNum] = useState(0);
  const [follow, setFollow] = useState(true);
  const [showFollowBtn, setShowFollowBtn] = useState(true);

  const [standingCommitteeData, setStandingCommitteeData] = useState([]);
  const [plenarySessionData, setPlenarySessionData] = useState([]);

  // 상임위원회 본회의 더미데이터 생성
  useEffect(() => {
    const tmnp1 = [];
    const tmnp2 = [];

    for (let i = 0; i < 4; i++) {
      tmnp1.push(
        {
          date: "2021 09-21",
          contents: "산업통상자원중소벤처기업위원회 제391회 08차",
          attendance: false,
        },
        {
          date: "2021 09-21",
          contents: "산업통상자원중소벤처기업위원회 제391회 08차",
          attendance: true,
        }
      );
      tmnp2.push(
        {
          date: "2021 09-21",
          contents: "제 391회 13차",
          attendance: true,
        },
        {
          date: "2021 09-21",
          contents: "제 391회 12차",
          attendance: false,
        }
      );
    }
    setStandingCommitteeData(tmnp1);
    setPlenarySessionData(tmnp2);
  }, []);

  useEffect(() => {
    const congressmanId = Number(router.query.id);
    if (!congressmanId) return;

    // 현재 페이지 국회의원 프로필 가져오기
    CongressmanAPI.getCongressman(congressmanId).then((res) => {
      setCongressmanProfile(res.data);

      // 자신의 지역구 국회의원인지 확인
      if (congressmanId === userState.regionCongressmanId) {
        setShowFollowBtn(false);
        setFollow(true);
      }
      // 현재 페이지의 국회의원을 팔로잉중인지 확인
      else {
        CongressmanAPI.getInterestCongressmenByUserId(userState.userId).then(
          (res) => {
            const congressmanList = res.data;
            const isExists = congressmanList.find(
              (profile) => profile.congressmanId === congressmanId
            );
            if (isExists === undefined) {
              setFollow(false);
            } else {
              setFollow(true);
            }
          }
        );
      }
    });

    // 해당 국회의원의 법안 호출
    CongressmanBillMappingAPI.getCongressmanBillMapping(congressmanId).then(
      (res) => {
        setBillIds(res.data.billIds);
        setMainProposerBillIds(res.data.mainProposerBillIds);

        if (res.data.billIds.length) {
          BillAPI.getBills(res.data.billIds.join(",")).then((res) => {
            setBills(res.data);
            let billProcessingStatus = {};
            res.data.map((bill) => {
              billProcessingStatus[bill.status] = billProcessingStatus[
                bill.status
              ]
                ? billProcessingStatus[bill.status] + 1
                : 1;
            });
            let length = res.data.length;
            let billProcessingStatusArray = [];
            for (let [key, value] of Object.entries(billProcessingStatus)) {
              billProcessingStatusArray.push({
                key: key,
                value: Math.round((value / length) * 1000) / 10,
              });
            }
            billProcessingStatusArray.sort((a, b) =>
              a.value > b.value ? -1 : 0
            );
            setBillProcessingStatus(billProcessingStatusArray);
          });
        }
        if (res.data.mainProposerBillIds.length) {
          BillAPI.getBills(res.data.mainProposerBillIds.join(",")).then(
            (res) => {
              let mainProposerBillStatus = {};
              res.data.map((bill) => {
                mainProposerBillStatus[bill.committee] = mainProposerBillStatus[
                  bill.committee
                ]
                  ? mainProposerBillStatus[bill.committee] + 1
                  : 1;
              });
              let mainProposerBillStatusArray = [];
              let length = res.data.length;
              for (let [key, value] of Object.entries(mainProposerBillStatus)) {
                mainProposerBillStatusArray.push({
                  key: key ? key : "기타",
                  value: Math.round((value / length) * 1000) / 10,
                });
              }
              mainProposerBillStatusArray.sort((a, b) =>
                a.value > b.value ? -1 : 0
              );
              setMainProposerBillStatus(mainProposerBillStatusArray);
              setTotalMainProposerBillNum(length);
            }
          );
        }
      }
    );

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [router]);

  // 팔로잉&팔로우
  const onChangeFollow = () => {
    setFollow(!follow);

    UserAPI.updateUserFollowings(
      userState.userKey,
      congressmanProfile.congressmanId
    );

    dispatch(
      userActions.setUserFollowings({
        congressmanId: congressmanProfile.congressmanId,
        follow: !follow,
      })
    );
  };

  const formatDateOfBirth = (str) => {
    return (
      String(str).substring(0, 4) +
      ". " +
      String(str).substring(4, 6) +
      ". " +
      String(str).substring(6, 8)
    );
  };

  return (
    <Container>
      {/* 프로필 */}
      <ProfileContainer>
        <TitleBox>
          <Title>국회의원 프로필</Title>
          <FollowButton
            text={follow ? "팔로잉" : "팔로우"}
            backgroundColor={follow ? "var(--bg60)" : "var(--brand100)"}
            onClick={() => onChangeFollow()}
            visibility={showFollowBtn ? "" : "hidden"}
            disabled={
              congressmanProfile.congressmanId === userState.regionCongressmanId
            }
          >
            {follow ? "팔로잉" : "팔로우"}
          </FollowButton>
        </TitleBox>

        <ProfileBox>
          <ProfileContent
            congressmanId={congressmanProfile.congressmanId}
            profileImage={congressmanProfile.profileImage}
            name={congressmanProfile.name}
            party={congressmanProfile.party}
            region={congressmanProfile.region}
          ></ProfileContent>
          <MedalContainer>
            {congressmanProfile.win &&
              congressmanProfile.win.map((item, key) => (
                <MedalBox key={key}>
                  {item}대<MedalSvg></MedalSvg>
                </MedalBox>
              ))}
          </MedalContainer>
        </ProfileBox>

        <DetailBox>
          <Text>출생</Text>
          <SubText>{formatDateOfBirth(congressmanProfile.age)}</SubText>
          <Text>소속위원회</Text>
          <SubText>{congressmanProfile.committee}</SubText>
          <Text>학력</Text>
          <SubText>{congressmanProfile.academicBackground}</SubText>
          <Text>주요경력</Text>
          <SubText>{congressmanProfile.career}</SubText>
          <Text>연락처</Text>
          <Contact underline>
            <a href={"tel:" + congressmanProfile.tel}>
              {congressmanProfile.tel}
            </a>
          </Contact>
          <Text>이메일</Text>
          <SubText>{congressmanProfile.email}</SubText>
        </DetailBox>
      </ProfileContainer>

      {/* 법안 */}
      <BillContainer>
        <TitleBox>
          <Title>대표 법안 발의</Title>
          <BillCounter>{totalMainProposerBillNum}개</BillCounter>
        </TitleBox>
        <StackedBarChart chartData={mainProposerBillStatus}></StackedBarChart>

        <TitleBox>
          <Title>법안 처리 현황</Title>
          <QuestionMarkIcon
            onClick={() =>
              ModalUtils.openInfo({
                title: "의안 처리의 6가지 경우",
                message: `계류 : 국회의 의안 처리를 기다리고 있는 상태\n\n 원안가결 : 발의자가 제안한 원안 그대로 의결하는 경우\n\n 수정가결 : 원안에 수정을 가해 의결하는 경우\n\n 대안반영폐기 : 위원회가 마련한 대안에 내용이 반영되고 해당 법안은 폐기되는 경우\n\n 철회 : 발의자가 법률안의 입안을 스스로 거두어들이는 경우\n\n 폐기 : 제출된 안건을 심의·의결대상에서 제외하는 경우\n\n`,
              })
            }
          >
            <QuestionMarkSvg></QuestionMarkSvg>
          </QuestionMarkIcon>
        </TitleBox>
        <StackedBarChart chartData={billProcessingStatus}></StackedBarChart>
        <BillTable list={bills} from={0} to={2}></BillTable>
        <DetailLink>
          <Link
            href={{
              pathname: "/billProcessingStatus",
              query: { congressmanId: router.query.id },
            }}
          >
            <a>&gt; 자세히 보러가기</a>
          </Link>
        </DetailLink>
      </BillContainer>

      {/* 상임위원회 출석률 */}
      <AttendanceContainer>
        <TitleBox>
          <Title>상임위원회 출석률</Title>
        </TitleBox>
        <BarChart percent={15.6}></BarChart>
        <AttendanceTable
          list={standingCommitteeData}
          from={0}
          to={2}
        ></AttendanceTable>
        <DetailLink>
          <Link
            href={{
              pathname: "/standingCommitteeAttendance",
              query: { congressmanId: router.query.id },
            }}
          >
            <a>&gt; 자세히 보러가기</a>
          </Link>
        </DetailLink>
      </AttendanceContainer>

      {/* 본회의 출석률 */}
      <AttendanceContainer>
        <TitleBox>
          <Title>본회의 출석률</Title>
        </TitleBox>
        <BarChart percent={71.7}></BarChart>
        <AttendanceTable
          list={plenarySessionData}
          from={0}
          to={2}
        ></AttendanceTable>
        <DetailLink>
          <Link
            href={{
              pathname: "/plenarySessionAttendance",
              query: { congressmanId: router.query.id },
            }}
          >
            <a>&gt; 자세히 보러가기</a>
          </Link>
        </DetailLink>
      </AttendanceContainer>
    </Container>
  );
}

export default Profile;

Profile.getLayout = function getLayout(page) {
  return <SessionLayout>{page}</SessionLayout>;
};

const Container = styled.div`
  padding-bottom: 80px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  ${Styles.base_m};
  float: left;
`;

const Text = styled.div`
  ${Styles.small_m};
`;

const SubText = styled.p`
  ${Styles.small_r};
`;

const Contact = styled.p`
  ${Styles.small_r};
  text-decoration: underline;
  text-underline-position: under;
`;

const ProfileContainer = styled.div`
  margin-bottom: 10px;
  padding: 20px;
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
`;

const MedalContainer = styled.div`
  display: grid;
  grid: subgrid;
  grid-template-columns: repeat(5, 30px);
  grid-template-rows: repeat(2, 45px);
`;

const MedalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 8px;
  line-height: 12px;
  color: var(--brand100);
`;

const DetailBox = styled.div`
  display: grid;
  grid: subgrid;
  grid-template-columns: 85px 1fr;
  grid-template-rows: repeat(6, minmax(30px, auto));
`;

const BillContainer = styled.div`
  margin-bottom: 10px;
  padding: 20px;
`;

const BillCounter = styled.p`
  ${Styles.base_m};
  color: var(--brand100);
`;

const AttendanceContainer = styled.div`
  margin-bottom: 10px;
  padding: 20px;
`;

const QuestionMarkIcon = styled.div`
  cursor: pointer;
`;

const DetailLink = styled.p`
  ${Styles.small_r};
  color: var(--bg80);
  text-align: right;
  margin-top: 20px;
  cursor: pointer;
`;

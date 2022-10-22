import Chevron from "@/common/Chevron";
import Loading from "@/common/Loading";
import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import GetYearMonthWeek from "utils/GetYearMonthWeek";
import SessionLayout from "@/layouts/SessionLayout";
import ModalUtils from "@/utils/ModalUtils";
import CongressmanAPI from "@/api/CongressmanAPI";
import RankingAPI from "@/api/RankingAPI";
import QuestionMark from "@/svg/QuestionMark";
import ThumbsDownFillSvg from "@/svg/ThumbsDownFill";
import ThumbsUpFillSvg from "@/svg/ThumbsUpFill";
import crown_yellow from "@/images/crown_yellow.svg";
import dark_storm from "@/images/dark_storm.svg";

function Ranking() {
  const router = useRouter();
  const [tabNum, setTabNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [week, setWeek] = useState(0);
  const [monthDiff, setMonthDiff] = useState(0);
  const [isShowLeftArrow, setIsShowLeftArrow] = useState(true);
  const [isShowRightArrow, setIsShowRightArrow] = useState(false);
  const [rankingData, setRankingData] = useState();

  useEffect(() => {
    let emptyArr = [];
    for (let i = 0; i < 20; i++) {
      emptyArr.push({
        congressmanId: 0,
        name: "",
        party: "",
        totalLikes: 0,
        profileImage: "",
      });
    }
    // setBestRanking(emptyArr);
    // setWorstRanking(emptyArr);
    // setRankingData(emptyArr)

    const now = moment();
    const YearMonthWeek = GetYearMonthWeek(now.format("YYYY-MM-DD"));
    const year = YearMonthWeek.year;
    const month = YearMonthWeek.month;
    const week = YearMonthWeek.week;
    setYear(year);
    setMonth(month);
    setWeek(week);
    // updateRankingData(year, month);
  }, []);

  useEffect(() => {
    updateRankingData(year, month);
  }, [tabNum]);

  const updateRankingData = (year, month) => {
    RankingAPI.getRanking(year, month).then((response) => {
      const rankingData = response.data;
      CongressmanAPI.getCongressmanList().then((response) => {
        const congressmanList = response.data.sort((a, b) => {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });
        // 국회의원 목록 저장
        let tmpCongressmanList = [];
        for (let item of congressmanList) {
          tmpCongressmanList.push({
            congressmanId: item.congressmanId,
            name: item.name,
            party: item.party,
            totalLikes: 0,
            interest: 0,
            profileImage: item.profileImage,
          });
        }
        // Ranking Data로 업데이트
        for (let item of rankingData) {
          const idx = tmpCongressmanList.findIndex(
            (x) => x.congressmanId === item.congressmanId
          );

          if (idx > -1) {
            tmpCongressmanList[idx].totalLikes = item.likes - item.dislikes;
            tmpCongressmanList[idx].interest = item.likes + item.dislikes;
          }
        }

        tmpCongressmanList.sort((a, b) => {
          return b.interest - a.interest;
        });

        const bestRanking = tmpCongressmanList
          .sort((a, b) => {
            return b.totalLikes - a.totalLikes;
          })
          .slice(0, 20);
        const worstRanking = tmpCongressmanList
          .sort((a, b) => {
            return a.totalLikes - b.totalLikes;
          })
          .slice(0, 20);

        if (congressmanList.length > 0) {
          // setBestRanking(bestRanking);
          // setWorstRanking(worstRanking);
          if (tabNum === 1) {
            setRankingData(bestRanking);
          } else if (tabNum === 2) {
            setRankingData(worstRanking);
          }
        }
        setIsLoading(false);
      });
    });
  };

  const nextMonth = () => {
    const now = moment()
      .add(monthDiff + 1, "months")
      .set("date", 15);
    const YearMonthWeek = GetYearMonthWeek(now.format("YYYY-MM-DD"));
    const year = YearMonthWeek.year;
    const month = YearMonthWeek.month;
    const week = YearMonthWeek.week;

    if (monthDiff + 1 === 0) {
      setIsShowRightArrow(false);
    }

    setYear(year);
    setMonth(month);
    setWeek(week);
    setMonthDiff(monthDiff + 1);
    setIsShowLeftArrow(true);

    updateRankingData(year, month);
  };

  const prevMonth = () => {
    const now = moment()
      .add(monthDiff - 1, "months")
      .set("date", 15);
    const YearMonthWeek = GetYearMonthWeek(now.format("YYYY-MM-DD"));
    const year = YearMonthWeek.year;
    const month = YearMonthWeek.month;
    const week = YearMonthWeek.week;

    // 21대 국회의원 임기 시작 이후(2020-05-30)만 취급
    if (now.isBefore(moment("2020-06-01"))) {
      setIsShowLeftArrow(false);
    }

    setYear(year);
    setMonth(month);
    setWeek(week);
    setMonthDiff(monthDiff - 1);
    setIsShowRightArrow(true);

    updateRankingData(year, month);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <Container>
      {/* Best 20 && Worst 20 */}
      <TabContainer>
        <TabBox>
          <Tab
            color={tabNum === 2 ? "var(--bg60)" : ""}
            onClick={() => setTabNum(1)}
          >
            Best 20
          </Tab>
          <Tab
            color={tabNum === 1 ? "var(--bg60)" : ""}
            onClick={() => setTabNum(2)}
          >
            Worst 20
          </Tab>
        </TabBox>
        <TabSilder
          left={tabNum === 1 ? "calc(25% - 35px)" : "calc(75% - 35px)"}
        ></TabSilder>
      </TabContainer>

      {/* 캘린더 */}
      <CalendarContainer>
        <YearText>{year}년</YearText>
        <ThisWeek>
          <ArrowWrapper
            visibility={isShowLeftArrow ? "" : "hidden"}
            onClick={prevMonth}
          >
            <Chevron
              type="left"
              width="12px"
              height="12px"
              fill="var(--bg80)"
            ></Chevron>
          </ArrowWrapper>
          <ThisWeekText>{month}월 랭킹</ThisWeekText>
          <ArrowWrapper
            visibility={isShowRightArrow ? "" : "hidden"}
            onClick={nextMonth}
          >
            <Chevron
              type="right"
              width="12px"
              height="12px"
              fill="var(--bg80)"
            ></Chevron>
          </ArrowWrapper>
        </ThisWeek>
        <QuestionMarkIcon
          onClick={() =>
            ModalUtils.openInfo({
              title: "국회의원 순위의 기준은?",
              message: `국회의원 랭킹은 해당 지역구의 이용자들이 피드에 누른 좋아요 수를 집계하여 국회의원의 순위가 정해집니다.\n
              좋아요 1개는 +1, 싫어요 1개는 -1로 측정되며,좋아요보다 싫어요를 더 많이 받은 경우 점수가 -로 표시됩니다.`,
            })
          }
        >
          <QuestionMark></QuestionMark>
        </QuestionMarkIcon>
      </CalendarContainer>

      <TopRanking>
        {/* 1위 */}
        <FirstRanker>
          <RankIcon>
            <Image
              src={tabNum === 1 ? crown_yellow : dark_storm}
              alt="rank_icon"
            ></Image>
          </RankIcon>
          <RankerImageBox
            onClick={() =>
              router.push("/profile/" + rankingData[0].congressmanId)
            }
          >
            {rankingData[0].profileImage && (
              <Image
                src={rankingData[0].profileImage}
                alt="profileImage"
                width={80}
                height={80}
              ></Image>
            )}
          </RankerImageBox>
          <FirstRankerName>{rankingData[0].name}</FirstRankerName>
          <RankerParty>{rankingData[0].party}</RankerParty>
          <TotalLikesBox>
            {tabNum === 1 ? (
              <ThumbsUpFillSvg
                width="15px"
                height="15px"
                fill="var(--iconFill)"
              ></ThumbsUpFillSvg>
            ) : (
              <ThumbsDownFillSvg
                width="15px"
                height="15px"
                fill="var(--iconFill)"
              ></ThumbsDownFillSvg>
            )}
            <RankerLikes> {rankingData[0].totalLikes}</RankerLikes>
          </TotalLikesBox>
        </FirstRanker>
        {/* 2위 */}
        <SecondRanker>
          <RankNumber>2</RankNumber>
          <RankerImageBox
            onClick={() =>
              router.push("/profile/" + rankingData[1].congressmanId)
            }
          >
            {rankingData[1].profileImage && (
              <Image
                src={rankingData[1].profileImage}
                alt="profileImage"
                width={65}
                height={65}
              ></Image>
            )}
          </RankerImageBox>
          <OtherRankerName>{rankingData[1].name}</OtherRankerName>
          <RankerParty>{rankingData[1].party}</RankerParty>
          <TotalLikesBox>
            {tabNum === 1 ? (
              <ThumbsUpFillSvg
                width="15px"
                height="15px"
                fill="var(--iconFill)"
              ></ThumbsUpFillSvg>
            ) : (
              <ThumbsDownFillSvg
                width="15px"
                height="15px"
                fill="var(--iconFill)"
              ></ThumbsDownFillSvg>
            )}
            <RankerLikes> {rankingData[1].totalLikes}</RankerLikes>
          </TotalLikesBox>
        </SecondRanker>
        {/* 3위 */}
        <ThirdRanker>
          <RankNumber>3</RankNumber>
          <RankerImageBox
            onClick={() =>
              router.push("/profile/" + rankingData[2].congressmanId)
            }
          >
            {rankingData[2].profileImage && (
              <Image
                src={rankingData[2].profileImage}
                alt="profileImage"
                width={65}
                height={65}
              ></Image>
            )}
          </RankerImageBox>
          <OtherRankerName>{rankingData[2].name}</OtherRankerName>
          <RankerParty>{rankingData[2].party}</RankerParty>
          <TotalLikesBox>
            {tabNum === 1 ? (
              <ThumbsUpFillSvg
                width="15px"
                height="15px"
                fill="var(--iconFill)"
              ></ThumbsUpFillSvg>
            ) : (
              <ThumbsDownFillSvg
                width="15px"
                height="15px"
                fill="var(--iconFill)"
              ></ThumbsDownFillSvg>
            )}
            <RankerLikes> {rankingData[2].totalLikes}</RankerLikes>
          </TotalLikesBox>
        </ThirdRanker>
      </TopRanking>

      {/* 필드 */}
      <FieldContainer>
        <FieldRow>
          <Column>
            <PaddingText>순위</PaddingText>
          </Column>
          <Column>이름</Column>
          <Column>소속당</Column>
          <Column>게시글 좋아요</Column>
        </FieldRow>
      </FieldContainer>
      <Divider></Divider>

      {/* 테이블 */}
      <TableContainer>
        {rankingData.map((item, key) => (
          <Div key={key} display={key < 3 ? "none" : ""}>
            <TableRow>
              <Column>
                <ListRankNum color={key < 10 ? "var(--brand100)" : ""}>
                  {key + 1}
                </ListRankNum>
                <ListImageBox
                  onClick={() => router.push("/profile/" + item.congressmanId)}
                >
                  {item.profileImage && (
                    <Image
                      src={item.profileImage}
                      alt="profileImage"
                      width={40}
                      height={40}
                    ></Image>
                  )}
                </ListImageBox>
              </Column>
              <Column>
                <Name>{item.name}</Name>
              </Column>
              <Column>
                <Party>{item.party}</Party>
              </Column>
              <Column>
                <Likes>{item.totalLikes}</Likes>
              </Column>
            </TableRow>
            <Divider></Divider>
          </Div>
        ))}
      </TableContainer>
    </Container>
  );
}

export default React.memo(Ranking);

Ranking.getLayout = function getLayout(page) {
  return <SessionLayout>{page}</SessionLayout>;
};

const Container = styled.div``;

const TabContainer = styled.div`
  position: relative;
`;
const TabBox = styled.div`
  display: flex;
  height: 37px;
`;
const Tab = styled.div`
  ${Styles.base_m};
  width: 50%;
  line-height: 37px;
  color: ${(props) => props.color};
  text-align: center;
  cursor: pointer;
`;
const TabSilder = styled.div`
  position: absolute;
  width: 70px;
  height: 3px;
  border: 0px;
  border-radius: 10px;
  border-top: 3px solid var(--iconFill);
  left: ${(props) => props.left};
  transition: left 0.3s ease-in-out;
`;
const CalendarContainer = styled.div`
  position: relative;
  margin-top: 22px;
`;
const ArrowWrapper = styled.div`
  visibility: ${(props) => props.visibility};
`;
const ThisWeek = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0px 95px;
  user-select: none;
`;
const ThisWeekText = styled.p`
  ${Styles.base_m};
  width: 110px;
  text-align: center;
`;
const YearText = styled.p`
  ${Styles.tiny_r};
  color: var(--bg80);
  text-align: center;
`;
const QuestionMarkIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
`;
const TopRanking = styled.div`
  display: grid;
  grid-column: 105fr 150fr 105fr;
  margin-top: 30px;
`;
const FirstRanker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  grid-row: 1;
  grid-column: 2;
  padding-top: 25px;
`;
const RankIcon = styled.div`
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: transparent;
  & * {
    background-color: transparent;
  }
`;
const RankNumber = styled.div`
  ${Styles.base_m};
  margin-top: 15px;
`;
const SecondRanker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  grid-row: 1;
  grid-column: 1;
`;
const ThirdRanker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  grid-row: 1;
  grid-column: 3;
`;
const RankerImageBox = styled.div`
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  img {
    object-fit: cover;
    object-position: center top;
  }
`;
const FirstRankerName = styled.div`
  ${Styles.base_m};
  margin-top: 3px;
`;
const OtherRankerName = styled.div`
  ${Styles.small_m};
  margin-top: 9px;
`;
const RankerParty = styled.div`
  ${Styles.tiny_r};
  color: var(--bg80);
  margin-top: 2px;
`;
const TotalLikesBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;
const RankerLikes = styled.div`
  ${Styles.small_m};
  margin-left: 6px;
`;

const FieldContainer = styled.div`
  margin: 50px 0px 4px 0px;
  & * {
    ${Styles.tiny_m};
    color: var(--bg80);
  }
`;
const FieldRow = styled.div`
  display: flex;
  margin: 0px 20px;
`;
const TableContainer = styled.div`
  padding-bottom: 50px;
`;
const TableRow = styled.div`
  display: flex;
  margin: 0px 20px;
  align-items: center;
  height: 60px;
`;
const Column = styled.div`
  &:nth-of-type(1) {
    flex: 10;
    text-align: left;
  }
  &:nth-of-type(2) {
    flex: 8;
    text-align: left;
  }
  &:nth-of-type(3) {
    flex: 12;
    text-align: center;
  }
  &:nth-of-type(4) {
    flex: 8;
    text-align: center;
  }
`;
const Divider = styled.div`
  border-top: 1px solid var(--bg40);
`;
const ListRankNum = styled.div`
  ${Styles.large_r};
  color: ${(props) => props.color};
  width: 30px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-right: 10px;
  float: left;
`;

const ListImageBox = styled.div`
  border-radius: 10px;
  overflow: hidden;
  float: left;
  cursor: pointer;
  img {
    object-fit: cover;
    object-position: center top;
  }
`;
const Name = styled.div`
  ${Styles.small_m}
`;
const Party = styled.div`
  ${Styles.tiny_m}
`;
const Likes = styled.div`
  ${Styles.tiny_r}
`;
const Div = styled.div`
  display: ${(props) => props.display};
`;
const PaddingText = styled.div`
  padding-left: 5px;
`;

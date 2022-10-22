import styled from "@emotion/styled";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GetYearMonthWeek from "utils/GetYearMonthWeek";
import Chevron from "@/common/Chevron";
import Loading from "@/common/Loading";
import Styles from "@/common/Styles";
import SessionLayout from "@/layouts/SessionLayout";
import BillAPI from "@/api/BillAPI";
import BillUserMappingAPI from "@/api/BillUserMappingAPI";
import FrownSvg from "@/svg/Frown";
import FrownFillSvg from "@/svg/FrownFill";
import SmileSvg from "@/svg/Smile";
import SmileFillSvg from "@/svg/SmileFill";

function HotBills() {
  const router = useRouter();
  const userState = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [week, setWeek] = useState(0);
  const [dayDiff, setDayDiff] = useState(0);
  const [isShowLeftArrow, setIsShowLeftArrow] = useState(true);
  const [isShowRightArrow, setIsShowRightArrow] = useState(false);
  const [hotTopicFeeds, setHotTopicFeeds] = useState([]);

  useEffect(() => {
    const now = moment();
    const YearMonthWeek = GetYearMonthWeek(now.format("YYYY-MM-DD"));
    const year = YearMonthWeek.year;
    const month = YearMonthWeek.month;
    const week = YearMonthWeek.week;
    setYear(year);
    setMonth(month);
    setWeek(week);
    updateHotTopicFeed(year, month, week);
  }, []);

  const updateHotTopicFeed = (year, month, week) => {
    BillAPI.getHotBills(week, month, year, userState.userKey).then((res) => {
      let tmpHotTopicFeeds = res.data;
      // 1. 관심도(좋아요수+싫어요수) 순으로 정렬
      // 2. 최신순으로 정렬
      tmpHotTopicFeeds.sort((a, b) => {
        const totalInterest_a = a.like + a.dislike;
        const totalInterest_b = b.like + b.dislike;
        if (totalInterest_b > totalInterest_a) {
          return 1;
        } else if (totalInterest_b < totalInterest_a) {
          return -1;
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      });

      // 5개만 표시
      setHotTopicFeeds(tmpHotTopicFeeds.slice(0, 5));
      setIsLoading(false);
    });
  };

  const onClickLike = (key) => {
    let tmpHotTopicFeeds = [...hotTopicFeeds];

    if (tmpHotTopicFeeds[key].like === 1) {
      tmpHotTopicFeeds[key].like = 0;
      tmpHotTopicFeeds[key].dislike = 0;
    } else {
      tmpHotTopicFeeds[key].like = 1;
      tmpHotTopicFeeds[key].dislike = 0;
    }

    setHotTopicFeeds(tmpHotTopicFeeds);
    BillUserMappingAPI.upsertBillLike(
      tmpHotTopicFeeds[key].billId,
      userState.userKey,
      tmpHotTopicFeeds[key].like
    );
  };

  const onClickDislike = (key) => {
    let tmpHotTopicFeeds = [...hotTopicFeeds];

    if (tmpHotTopicFeeds[key].dislike === 1) {
      tmpHotTopicFeeds[key].like = 0;
      tmpHotTopicFeeds[key].dislike = 0;
    } else {
      tmpHotTopicFeeds[key].like = 0;
      tmpHotTopicFeeds[key].dislike = 1;
    }

    setHotTopicFeeds(tmpHotTopicFeeds);
    BillUserMappingAPI.upsertBillLike(
      tmpHotTopicFeeds[key].billId,
      userState.userKey,
      -tmpHotTopicFeeds[key].dislike
    );
  };

  const nextWeek = () => {
    const now = moment().add(dayDiff + 7, "days");
    const YearMonthWeek = GetYearMonthWeek(now.format("YYYY-MM-DD"));
    const year = YearMonthWeek.year;
    const month = YearMonthWeek.month;
    const week = YearMonthWeek.week;

    if (dayDiff + 7 === 0) {
      setIsShowRightArrow(false);
    }

    setYear(year);
    setMonth(month);
    setWeek(week);
    setDayDiff(dayDiff + 7);
    setWeek(week);
    setIsShowLeftArrow(true);

    updateHotTopicFeed(year, month, week);
  };

  const prevWeek = () => {
    const now = moment().add(dayDiff - 7, "days");
    const YearMonthWeek = GetYearMonthWeek(now.format("YYYY-MM-DD"));
    const year = YearMonthWeek.year;
    const month = YearMonthWeek.month;
    const week = YearMonthWeek.week;

    if (dayDiff - 7 === 0) {
      setIsShowRightArrow(false);
    }

    // 21대 국회의원 임기 시작 이후(2020-05-30)만 취급
    if (now.isBefore(moment("2020-06-01"))) {
      setIsShowLeftArrow(false);
    }

    setYear(year);
    setMonth(month);
    setWeek(week);
    setDayDiff(dayDiff - 7);
    setWeek(week);
    setIsShowRightArrow(true);

    updateHotTopicFeed(year, month, week);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <Container>
      {/* 캘린더 */}
      <CalendarContainer>
        <YearText>{year}년</YearText>
        <ThisWeek>
          <ArrowWrapper
            visibility={isShowLeftArrow ? "" : "hidden"}
            onClick={prevWeek}
          >
            <Chevron
              type="left"
              width="12px"
              height="12px"
              fill="var(--bg80)"
            ></Chevron>
          </ArrowWrapper>
          <ThisWeekText>
            {month}월 {week}주차 법안
          </ThisWeekText>
          <ArrowWrapper
            visibility={isShowRightArrow ? "" : "hidden"}
            onClick={nextWeek}
          >
            <Chevron
              type="right"
              width="12px"
              height="12px"
              fill="var(--bg80)"
            ></Chevron>
          </ArrowWrapper>
        </ThisWeek>
      </CalendarContainer>

      {hotTopicFeeds.length === 0 ? (
        <EmptyContent>표시할 컨텐츠가 없습니다.</EmptyContent>
      ) : (
        <>
          {hotTopicFeeds.map((feed, key) => (
            <FeedContainer key={key}>
              {/* 법안 피드 */}
              <FeedBox>
                <SubText>{feed.date}</SubText>
                <StaticsText>
                  좋아요 {feed.like}개 / 싫어요 {feed.dislike}개
                </StaticsText>
                <Text
                  dangerouslySetInnerHTML={{ __html: feed.feedContent }}
                ></Text>
                <MoreText
                  onClick={() => {
                    router.push("/bill/" + feed.billId);
                  }}
                >
                  &gt; 자세히 보러가기
                </MoreText>
              </FeedBox>
              {/* 좋아요 & 싫어요 버튼 */}
              <ButtonContainer>
                {feed.like === 1 ? (
                  <ButtonBox onClick={() => onClickLike(key)}>
                    <SmileFillSvg fill="var(--iconFill)"></SmileFillSvg>
                    <ButtonText color="var(--iconFill)">좋아요</ButtonText>
                  </ButtonBox>
                ) : (
                  <ButtonBox onClick={() => onClickLike(key)}>
                    <SmileSvg fill="var(--icon)"></SmileSvg>
                    <ButtonText color="var(--icon)">좋아요</ButtonText>
                  </ButtonBox>
                )}

                <Divider></Divider>

                {feed.dislike === 1 ? (
                  <ButtonBox onClick={() => onClickDislike(key)}>
                    <FrownFillSvg fill="var(--iconFill)"></FrownFillSvg>
                    <ButtonText color="var(--iconFill)">싫어요</ButtonText>
                  </ButtonBox>
                ) : (
                  <ButtonBox onClick={() => onClickDislike(key)}>
                    <FrownSvg fill="var(--icon)"></FrownSvg>
                    <ButtonText color="var(--icon)">싫어요</ButtonText>
                  </ButtonBox>
                )}
              </ButtonContainer>
            </FeedContainer>
          ))}
        </>
      )}
    </Container>
  );
}

export default React.memo(HotBills);

HotBills.getLayout = function getLayout(page) {
  return <SessionLayout>{page}</SessionLayout>;
};

const Container = styled.div``;
const CalendarContainer = styled.div``;
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
const Text = styled.p`
  ${Styles.base_m};
  & p {
    margin-bottom: 10px;
  }
`;
const SubText = styled.p`
  ${Styles.small_m};
`;
const StaticsText = styled.p`
  ${Styles.tiny_m};
  color: var(--bg80);
  margin-bottom: 20px;
`;
const YearText = styled.p`
  ${Styles.tiny_r};
  color: var(--bg80);
  text-align: center;
`;
const MoreText = styled.p`
  ${Styles.small_m};
  color: var(--bg80);
  margin-top: 10px;
  cursor: pointer;
`;
const FeedContainer = styled.div``;
const FeedBox = styled.div`
  padding: 20px;
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  user-select: none;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 45px;
  border-top: 1px solid var(--bg60);
  border-bottom: 1px solid var(--bg60);
  cursor: pointer;
`;
const Divider = styled.div`
  border: 0.5px solid var(--bg60);
  background-color: var(--bg60);
`;
const ButtonText = styled.p`
  ${Styles.small_r};
  margin-left: 15px;
  color: ${(props) => props.color};
`;
const EmptyContent = styled.div`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${Styles.small_r};
  color: var(--bg80);
`;

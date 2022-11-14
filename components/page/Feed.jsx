import styled from "@emotion/styled";
import Axios from "axios";
import clonedeep from "lodash.clonedeep";
import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import Loading from "@/common/Loading";
import Styles from "@/common/Styles";
import DefaultLayout from "@/layouts/DefaultLayout";
import ControlUtils from "@/utils/ControlUtils";
import GetYearMonthWeek from "@/utils/GetYearMonthWeek";
import ModalUtils from "@/utils/ModalUtils";
import FeedAPI from "@/api/FeedAPI";
import FeedUserMappingAPI from "@/api/FeedUserMappingAPI";
import RankingAPI from "@/api/RankingAPI";
import ThumbsDownSvg from "@/svg/ThumbsDown";
import ThumbsDownFillSvg from "@/svg/ThumbsDownFill";
import ThumbsUpSvg from "@/svg/ThumbsUp";
import ThumbsUpFillSvg from "@/svg/ThumbsUpFill";

function Feed(props) {
  const now = moment().format("YYYY-MM-DD");
  const router = useRouter();
  const userState = useSelector((state) => state.user);
  const ref = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [feeds, setFeeds] = useState([]);
  const [page, setPage] = useState(-1);

  useEffect(() => {
    Axios.get("/api/v2/feed").then((res) => {
      setIsLoading(false);
      setFeeds(feeds.concat(res.data));
      setPage(0);
    });
    // FeedAPI.getFeed(userState.userKey, 0).then((res) => {
    //   setIsLoading(false);
    //   setFeeds(feeds.concat(res.data));
    //   setPage(0);
    // });
  }, []);

  useEffect(() => {
    const winHeight = window.innerHeight; // 화면 높이
    const pageHeigth = winHeight - 115; // 페이지 높이
    const posBottom = props.scrollTop + pageHeigth;
    const clientHeight = ref.current?.clientHeight;

    if (clientHeight < posBottom) {
      //console.log(clientHeight, posBottom);
      ControlUtils.doubleClickPrevention(() => {
        getFeed();
      }, 200);
    }
  }, [props.scrollTop, ref.current]);

  // feed 조회
  const getFeed = () => {
    FeedAPI.getFeed(userState.userKey, page + 1).then((res) => {
      setFeeds(feeds.concat(res.data));
      setPage(page + 1);
    });
  };

  // 랭킹 데이터 집계
  const upsertRankingData = (congressmanId, date, likes, dislikes) => {
    if (userState.regionCongressmanId !== congressmanId) return;
    const YearMonthWeek = GetYearMonthWeek(date);
    const year = YearMonthWeek.year;
    const month = YearMonthWeek.month;
    const week = YearMonthWeek.week;

    RankingAPI.upsertRankingData(
      congressmanId,
      likes,
      dislikes,
      year,
      month,
      week
    );
  };

  const onClickLike = (key) => {
    if (userState.userKey === -1) {
      ModalUtils.openAlert({
        message: `폴리폴리 로그인 후\n 이용해주시기 바랍니다.`,
      });
      return;
    }

    let tmpFeeds = clonedeep(feeds);

    let likes = 0;
    let dislikes = 0;

    if (tmpFeeds[key].like === 1) {
      tmpFeeds[key].like = 0;
      likes = -1;
      dislikes = 0;
    } else if (tmpFeeds[key].like === -1) {
      tmpFeeds[key].like = 1;
      likes = 1;
      dislikes = -1;
    } else {
      tmpFeeds[key].like = 1;
      likes = 1;
      dislikes = 0;
    }

    setFeeds(tmpFeeds);
    FeedUserMappingAPI.upsertFeedLike(
      tmpFeeds[key].feedId,
      userState.userKey,
      tmpFeeds[key].like
    );

    // BillUserMappingAPI.upsertBillLike(
    //   feeds[key].feed.billId,
    //   this.userKey,
    //   feeds[key].like
    // );

    upsertRankingData(
      tmpFeeds[key].congressman.congressmanId,
      now,
      likes,
      dislikes
    );
  };

  const onClickDislike = (key) => {
    if (userState.userKey === -1) {
      ModalUtils.openAlert({
        message: `폴리폴리 로그인 후\n 이용해주시기 바랍니다.`,
      });
      return;
    }

    let tmpFeeds = clonedeep(feeds);

    let likes = 0;
    let dislikes = 0;

    if (tmpFeeds[key].like === -1) {
      tmpFeeds[key].like = 0;
      likes = 0;
      dislikes = -1;
    } else if (tmpFeeds[key].like === 1) {
      tmpFeeds[key].like = -1;
      likes = -1;
      dislikes = 1;
    } else {
      tmpFeeds[key].like = -1;
      likes = 0;
      dislikes = 1;
    }

    setFeeds(tmpFeeds);
    FeedUserMappingAPI.upsertFeedLike(
      tmpFeeds[key].feedId,
      userState.userKey,
      tmpFeeds[key].like
    );

    // BillUserMappingAPI.upsertBillLike(
    //   feeds[key].feed.billId,
    //   this.userKey,
    //   feeds[key].like
    // );

    upsertRankingData(
      tmpFeeds[key].congressman.congressmanId,
      now,
      likes,
      dislikes
    );
  };

  // 프로필 클릭
  const onClickProfile = (item) => {
    if (userState.userKey === -1) {
      ModalUtils.openAlert({
        message: `폴리폴리 로그인 후\n 이용해주시기 바랍니다.`,
      });
      return;
    }
    router.push(`/profile/${item.congressman.congressmanId}`);
  };

  // 자세히 보러가기
  const seeDetails = (item) => {
    if (userState.userKey === -1) {
      ModalUtils.openAlert({
        message: `폴리폴리 로그인 후\n 이용해주시기 바랍니다.`,
      });
      return;
    }
    router.push("/bill/" + item.billId);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (feeds.length === 0) {
    return <EmptyContent>표시할 컨텐츠가 없습니다.</EmptyContent>;
  }

  return (
    <Container>
      <FeedContainer ref={ref}>
        {/* TODO: 리스트 가상화 작업 */}
        {/* <AutoSizer>
          {({ width, height }) => (
            <List
              ref={scrollRef}
              className={cx(containerStyles)}
              width={width}
              height={height}
              itemSize={49}
              itemCount={filteredCoinList.length}
              itemData={{
                coinList: filteredCoinList,
                blinkStyles: blinkStyles,
                hasBookmark: hasBookmark,
                deleteBookmark: deleteBookmark,
                registerBookmark: registerBookmark,
              }}
            >
              {BasicList}
            </List>
          )}
        </AutoSizer> */}

        {feeds.map((item, key) => (
          <FeedWrapper key={key}>
            <FeedBox>
              {/* 피드 국회의원 */}
              <ProfileBox>
                <ProfileImg onClick={() => onClickProfile(item)}>
                  {item.congressman.profileImage && (
                    <Image
                      src={item.congressman.profileImage}
                      width={40}
                      height={40}
                    />
                  )}
                </ProfileImg>
                <Div>
                  <Text>{item.congressman.name}</Text>
                  <MiniText>{item.date}</MiniText>
                </Div>
              </ProfileBox>

              {/* 피드 콘텐츠 */}
              <ContentBox>
                <Text dangerouslySetInnerHTML={{ __html: item.content }} />
                {item.billId && (
                  <SeeDetailLink
                    marginBottom="10px"
                    onClick={() => seeDetails(item)}
                  >
                    &gt; 자세히 보러가기
                  </SeeDetailLink>
                )}
              </ContentBox>
            </FeedBox>

            {/* 좋아요 & 싫어요 버튼 */}
            <ButtonContainer>
              {item.like === 1 ? (
                <ButtonBox onClick={() => onClickLike(key)}>
                  <ThumbsUpFillSvg fill="var(--iconFill)"></ThumbsUpFillSvg>
                  <ButtonText color="var(--iconFill)">좋아요</ButtonText>
                </ButtonBox>
              ) : (
                <ButtonBox onClick={() => onClickLike(key)}>
                  <ThumbsUpSvg fill="var(--icon)"></ThumbsUpSvg>
                  <ButtonText color="var(--icon)">좋아요</ButtonText>
                </ButtonBox>
              )}

              <Divider></Divider>

              {item.like === -1 ? (
                <ButtonBox onClick={() => onClickDislike(key)}>
                  <ThumbsDownFillSvg fill="var(--iconFill)"></ThumbsDownFillSvg>
                  <ButtonText color="var(--iconFill)">싫어요</ButtonText>
                </ButtonBox>
              ) : (
                <ButtonBox onClick={() => onClickDislike(key)}>
                  <ThumbsDownSvg fill="var(--icon)"></ThumbsDownSvg>
                  <ButtonText color="var(--icon)">싫어요</ButtonText>
                </ButtonBox>
              )}
            </ButtonContainer>
          </FeedWrapper>
        ))}
      </FeedContainer>
    </Container>
  );
}

export default React.memo(Feed);

Feed.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

const Container = styled.div``;
const FeedContainer = styled.div``;
const FeedWrapper = styled.div``;
const FeedBox = styled.div`
  padding: 20px 20px 25px 20px;
`;
const ProfileBox = styled.div`
  display: flex;
`;
const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin-right: 10px;
  overflow: hidden;
  cursor: pointer;
  img {
    object-fit: cover;
    object-position: center top;
  }
`;
const Div = styled.div``;
const Text = styled.p`
  ${Styles.base_m}
`;
const SeeDetailLink = styled.span`
  ${Styles.small_r};
  color: var(--bg80);
  margin-bottom: ${(props) => props.marginBottom};
  cursor: pointer;
`;
const MiniText = styled.p`
  ${Styles.tiny_r};
  color: var(--bg80);
`;
const ContentBox = styled.div`
  margin-top: 20px;
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

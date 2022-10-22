import Loading from "@/common/Loading";
import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import clonedeep from "lodash.clonedeep";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SessionLayout from "@/layouts/SessionLayout";
import BillAPI from "@/api/BillAPI";
import BillUserMappingAPI from "@/api/BillUserMappingAPI";
import CongressmanAPI from "@/api/CongressmanAPI";
import FrownSvg from "@/svg/Frown";
import FrownFillSvg from "@/svg/FrownFill";
import SmileSvg from "@/svg/Smile";
import SmileFillSvg from "@/svg/SmileFill";

function Bill(props) {
  const router = useRouter();
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [billData, setBillData] = useState({});
  const [proposers, setProposers] = useState([]);

  useEffect(() => {
    const billId = router.query.id;
    if (!billId) return;
    BillAPI.getBillWithUserId(billId, userState.userKey).then((res) => {
      setBillData(res.data);
      const proposerIds = res.data.proposers.split(",");
      getProposers(proposerIds);
    });
  }, [router]);

  const getProposers = async (proposerIds) => {
    let tmpProposers = [];
    for (let i = 0; i < proposerIds.length; i++) {
      const result = await CongressmanAPI.getCongressman(proposerIds[i]).then(
        (res) => {
          return res.data;
        }
      );
      tmpProposers.push({
        congressmanId: result.congressmanId,
        name: result.name,
        party: result.party,
        profileImage: result.profileImage,
      });
    }
    setProposers(tmpProposers);
  };

  const onClickLike = () => {
    const tmpBillData = clonedeep(billData);
    if (tmpBillData.likeByUser === 1) tmpBillData.likeByUser = 0;
    else tmpBillData.likeByUser = 1;

    setBillData(tmpBillData);

    BillUserMappingAPI.upsertBillLike(
      tmpBillData.billId,
      userState.userKey,
      tmpBillData.likeByUser
    );
  };

  const onClickDislike = () => {
    const tmpBillData = clonedeep(billData);
    if (tmpBillData.likeByUser === -1) tmpBillData.likeByUser = 0;
    else tmpBillData.likeByUser = -1;

    setBillData(tmpBillData);

    BillUserMappingAPI.upsertBillLike(
      tmpBillData.billId,
      userState.userKey,
      tmpBillData.likeByUser
    );
  };

  const partyColor = (party) => {
    switch (party) {
      case "국민의힘":
        return "#C71F1F";
      case "더불어민주당":
        return "#1F80C7";
      case "국민의당":
        return "#EB5C24";
      case "기본소득당":
        return "#01A999";
      case "무소속":
        return "#D8D8D8";
      case "시대전환 ":
        return "#9B7DBF";
      case "열린민주당":
        return "#0964A6";
      case "정의당":
        return "#FFD12D";
      default:
        break;
    }
  };

  function isEmptyObj(param) {
    return Object.keys(param).length === 0 && param.constructor === Object;
  }

  if (isEmptyObj(billData)) {
    return <Loading></Loading>;
  }

  return (
    <Container>
      <BillContainer>
        <Title>{billData.title}</Title>
        <Date>{billData.date}</Date>

        {/* 제안이유 & 주요내용 */}
        <Content>
          <Subtitle>제안이유 및 주요내용</Subtitle>
          <Text>{billData.main_content_and_reason}</Text>
        </Content>
        <Link
          href={
            "https://opinion.lawmaking.go.kr/gcom/nsmLmSts/out/" +
            billData.billId +
            "/detailRP"
          }
          passHref
        >
          <a target="_blank">
            <LinkText> {"> 원안 보러가기"}</LinkText>
          </a>
        </Link>

        {/* 함께 발의한 국회의원 */}
        <Content>
          <Subtitle>함께 발의한 국회의원</Subtitle>
          <Grid>
            {proposers.map((proposer, key) => (
              <ProfileBoxWrapper key={key}>
                {proposer.congressmanId && (
                  <ProfileBox onClick={() => router.push(`/profile/${id}`)}>
                    <ProfileImage>
                      <Image
                        src={proposer.profileImage}
                        alt="congressman"
                        width={60}
                        height={60}
                      ></Image>
                    </ProfileImage>

                    <NameBox>
                      <Party
                        backgroundColor={partyColor(proposer.party)}
                      ></Party>
                      <Name>{proposer.name}</Name>
                    </NameBox>
                  </ProfileBox>
                )}
              </ProfileBoxWrapper>
            ))}
          </Grid>
        </Content>
      </BillContainer>

      {/* 좋아요 & 싫어요 버튼 */}
      <ButtonContainer>
        {billData.likeByUser === 1 ? (
          <ButtonBox onClick={onClickLike}>
            <SmileFillSvg fill="var(--iconFill)"></SmileFillSvg>
            <ButtonText color="var(--iconFill)">좋아요</ButtonText>
          </ButtonBox>
        ) : (
          <ButtonBox onClick={onClickLike}>
            <SmileSvg fill="var(--icon)"></SmileSvg>
            <ButtonText color="var(--icon)">좋아요</ButtonText>
          </ButtonBox>
        )}

        <Divider></Divider>

        {billData.likeByUser === -1 ? (
          <ButtonBox onClick={onClickDislike}>
            <FrownFillSvg fill="var(--iconFill)"></FrownFillSvg>
            <ButtonText color="var(--iconFill)">싫어요</ButtonText>
          </ButtonBox>
        ) : (
          <ButtonBox onClick={onClickDislike}>
            <FrownSvg fill="var(--icon)"></FrownSvg>
            <ButtonText color="var(--icon)">싫어요</ButtonText>
          </ButtonBox>
        )}
      </ButtonContainer>
    </Container>
  );
}

export default Bill;

Bill.getLayout = function getLayout(page) {
  return <SessionLayout>{page}</SessionLayout>;
};

const Container = styled.div`
  position: relative;
`;
const BillContainer = styled.div`
  padding: 0px 20px 110px 20px;
`;
const Title = styled.div`
  ${Styles.large_m};
  margin-top: 20px;
`;
const Date = styled.div`
  ${Styles.small_m};
  text-align: right;
  margin-top: 10px;
`;
const Subtitle = styled.div`
  ${Styles.base_l};
  color: var(--brand100);
  margin-bottom: 10px;
`;
const Content = styled.div`
  margin-top: 36px;
`;
const Text = styled.p`
  ${Styles.base_r}
`;
const LinkText = styled.p`
  ${Styles.small_m};
  color: var(--brand100);
  text-align: right;
  margin-top: 10px;
`;
const Grid = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-rows: 1fr;
  grid-template-columns: 60px 60px 60px 60px;
`;

const ProfileBoxWrapper = styled.div``;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
const ProfileImage = styled.div`
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  img {
    object-fit: cover;
    object-position: center top;
  }
`;
const NameBox = styled.div`
  display: flex;
  align-items: center;
`;
const Name = styled.div`
  ${Styles.small_m};
  margin-left: 3px;
`;
const Party = styled.div`
  width: 10px;
  height: 10px;
  border: 0px;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};
`;

const ButtonContainer = styled.div`
  position: Fixed;
  display: flex;
  bottom: 55px;
  width: 100%;
  min-width: var(--minWidth);
  max-width: var(--maxWidth);
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

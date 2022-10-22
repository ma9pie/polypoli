import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Styles from "@/common/Styles";
import SessionLayout from "@/layouts/SessionLayout";

function Notification() {
  const Router = useRouter();
  const [newNotifications, setNewNotifications] = useState([
    {
      congressmanId: 475,
      congressmanName: "홍준표",
      profileImage: "http://www.assembly.go.kr/photo/9771145.jpg",
      message: "내일이 투표일이라면 홍준표 국회의원을 다시 뽑을 건가요?",
      date: "2월 3일",
    },
    {
      congressmanId: 475,
      congressmanName: "홍준표",
      profileImage: "http://www.assembly.go.kr/photo/9771145.jpg",
      message: "홍준표 국회의원이 법안을 발의했습니다.",
      date: "1월 25일",
    },
    {
      congressmanId: 2905,
      congressmanName: "황희",
      profileImage: "http://www.assembly.go.kr/photo/9770936.jpg",
      message:
        "황희 국회의원이 	국가시범스마트도시 조성 및 지원에 관한 특별법안(황희의원 등...",
      date: "1월 11일",
    },
  ]);

  const [readNotifications, setReadNotifications] = useState([
    {
      congressmanId: 102,
      congressmanName: "심상정",
      profileImage: "http://www.assembly.go.kr/photo/9770869.jpg",
      message:
        "심상정 국회의원이 생활물류서비스산업발전법 일부개정법률안(심상정의원등 11...",
      date: "1월 23일",
    },
  ]);

  const onClick = () => {
    setNewNotifications(
      newNotifications.concat({
        congressmanId: 3051,
        congressmanName: "고민정",
        profileImage: "http://www.assembly.go.kr/photo/9771109.jpg",
        message: "테스트 알림",
        date: "2월 11일",
      })
    );
  };

  return (
    <Container>
      <TestButton onClick={onClick}>add notification</TestButton>
      <Title>새로운 알림</Title>
      {newNotifications.map((item, idx) => (
        <NotificationContainer key={idx}>
          <ImageBox
            onClick={() => Router.push(`/profile/${item.congressmanId}`)}
          >
            <Image
              src={item.profileImage}
              alt="profile"
              width={60}
              height={60}
            />
          </ImageBox>
          <MessageBox>
            <Message>{item.message}</Message>
            <Date>{item.date}</Date>
          </MessageBox>
        </NotificationContainer>
      ))}

      <Title>확인한 알림</Title>
      {readNotifications.map((item, idx) => (
        <NotificationContainer key={idx}>
          <ImageBox
            onClick={() => Router.push(`/profile/${item.congressmanId}`)}
          >
            <Image
              src={item.profileImage}
              alt="profile"
              width={60}
              height={60}
            />
          </ImageBox>
          <MessageBox>
            <Message>{item.message}</Message>
            <Date className="notification-date">{item.date}</Date>
          </MessageBox>
        </NotificationContainer>
      ))}
    </Container>
  );
}

export default Notification;

Notification.getLayout = function getLayout(page) {
  return <SessionLayout>{page}</SessionLayout>;
};

const Container = styled.div``;

const Title = styled.h3`
  ${Styles.base_m}
  text-align: left;
  padding: 20px;
  border-bottom: 1px solid var(--bg40);
`;

const NotificationContainer = styled.div`
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 10%, 0);
    }
    to {
      opacity: 1;
    }
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: fadeInUp 1s;
  border-bottom: 1px solid var(--bg40);
  padding: 20px;
`;

const ImageBox = styled.div`
  width: 60px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  img {
    object-fit: cover;
    object-position: center top;
  }
`;

const MessageBox = styled.div`
  width: calc(100% - 80px);
  text-align: left;
`;

const Message = styled.p`
  ${Styles.small_r}
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Date = styled.p`
  ${Styles.tiny_r}
  margin-top:4px;
  color: var(--bg80);
  bottom: 20px;
`;

const TestButton = styled.div`
  ${Styles.small_m}
  width: 150px;
  height: 30px;
  line-height: 30px;
  color: var(--bg0);
  border-radius: 5px;
  margin: 0px auto;
  text-align: center;
  background-color: var(--brand100);
  cursor: pointer;
`;

import Pagination from "@/common/Pagination";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import AttendanceTable from "@/components/profile/AttendanceTable";
import SessionLayout from "@/layouts/SessionLayout";

function PlenarySessionAttendance() {
  const displayNum = 7;
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(0);

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
    setTotalPageNum(Math.ceil(tmnp1.length / displayNum));
  }, []);

  // 페이지 변경
  const changePage = (pageNum) => {
    if (pageNum <= 0 || pageNum > totalPageNum) {
      return;
    }
    setCurrentPageNum(pageNum);
  };

  return (
    <Wrapper>
      <AttendanceTable
        list={plenarySessionData}
        from={displayNum * (currentPageNum - 1)}
        to={displayNum * currentPageNum}
      ></AttendanceTable>
      <PaginationBox>
        <Pagination
          currentPageNum={currentPageNum}
          totalPageNum={totalPageNum}
          changePage={changePage}
        ></Pagination>
      </PaginationBox>
    </Wrapper>
  );
}

export default PlenarySessionAttendance;

PlenarySessionAttendance.getLayout = function getLayout(page) {
  return <SessionLayout>{page}</SessionLayout>;
};

const Wrapper = styled.div`
  position: relative;
  margin: 16px 20px;
`;

const Title = styled.h3`
  margin-bottom: 16px;
`;

const PaginationBox = styled.div`
  position: fixed;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
`;

import Pagination from "@/common/Pagination";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BillTable from "@/components/profile/BillTable";
import SessionLayout from "@/layouts/SessionLayout";
import BillAPI from "@/api/BillAPI";
import CongressmanBillMappingAPI from "@/api/CongressmanBillMappingAPI";

function BillProcessingStatus() {
  const router = useRouter();
  const displayNum = 7;
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const { congressmanId } = router.query;
    if (congressmanId) {
      CongressmanBillMappingAPI.getCongressmanBillMapping(
        router.query.congressmanId
      ).then((res) => {
        if (res.data.billIds.length) {
          BillAPI.getBills(res.data.billIds.join(",")).then((res) => {
            setBills(res.data);
            setTotalPageNum(Math.ceil(res.data.length / displayNum));
          });
        }
      });
    }
  }, [router.query]);

  // 페이지 변경
  const changePage = (pageNum) => {
    if (pageNum <= 0 || pageNum > totalPageNum) {
      return;
    }
    setCurrentPageNum(pageNum);
  };

  return (
    <Wrapper>
      <BillTable
        list={bills}
        from={displayNum * (currentPageNum - 1)}
        to={displayNum * currentPageNum}
      ></BillTable>
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

export default BillProcessingStatus;

BillProcessingStatus.getLayout = function getLayout(page) {
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

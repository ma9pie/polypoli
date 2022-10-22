import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import React from "react";

function BarChart(props) {
  const { percent } = props;
  return (
    <Container>
      <Text>{percent}%</Text>
      <Chart>
        <Bar width={percent}></Bar>
        <FullBar></FullBar>
      </Chart>
    </Container>
  );
}

export default BarChart;

const Container = styled.div`
  margin: 26px 0px 22px 0px;
`;
const Text = styled.p`
  ${Styles.large_m};
  color: var(--brand100);
  margin-bottom: 6px;
`;
const Chart = styled.div`
  position: relative;
  height: 30px;
`;
const Bar = styled.div`
  position: absolute;
  width: ${(props) => `${props.width}%`};
  height: 100%;
  z-index: 1;
  background-color: var(--brand80);
`;
const FullBar = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: var(--bg40);
`;

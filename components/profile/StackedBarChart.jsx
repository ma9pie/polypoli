import Styles from "@/common/Styles";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

function StackedBarChart(props) {
  const { chartData } = props;

  const [restPercentage, setRestPercentage] = useState(100.0);
  const [absolutePosition, setAbsolutePosition] = useState(100.0);

  const colorList = [
    "#723DA8",
    "#FF5353",
    "#4CAF33",
    "#56CCF2",
    "#F2C94C",
    "#C7C8CE",
    "#FF9797",
    "#008DBA",
    "#E76DE2",
    "#FFBC8B",
    "#A49618",
    "#F5FF83",
    "#4BE3AD",
    "#929292",
    "#EBA9CD",
    "#AF90D8",
    "#92B7FF",
    "#FFCFCF",
    "#CFEEFF",
    "#7B90FF",
  ];

  useEffect(() => {
    let tmpRestPercentage = restPercentage;
    let tmpAbsolutePosition = [];

    chartData.map((item) => {
      tmpRestPercentage -= parseFloat(item.value);
    });

    chartData.reduce((acc, cur) => {
      tmpAbsolutePosition.push(parseFloat(acc));
      return acc + cur.value;
    }, 0);

    setRestPercentage(tmpRestPercentage);
    setAbsolutePosition(tmpAbsolutePosition);
  }, [chartData]);

  return (
    <Container>
      {/* 14% 이하 퍼센티지 상단 표시 */}
      <PercentContainer>
        {chartData.map((item, key) => {
          if (item.value < 14 && item.value > 5 && key % 2 === 0)
            return (
              <PercentText
                key={key}
                width={item.value + "%"}
                left={absolutePosition[key] + "%"}
              >
                {item.value + "%"}
              </PercentText>
            );
        })}
      </PercentContainer>

      {/* 14% 이하 퍼센티지 상단 수직선 */}
      <VerticalLineContainer>
        {chartData.map((item, idx) => {
          if (item.value < 14 && item.value > 5 && idx % 2 === 0)
            return (
              <VerticalLine
                key={idx}
                left={absolutePosition[idx] + parseFloat(item.value) / 2 + "%"}
              />
            );
        })}
      </VerticalLineContainer>

      {/* 차트 */}
      <ChartContainer>
        {chartData.map((item, key) => (
          <ChartBar
            key={key}
            width={item.value + "%"}
            backgroundColor={colorList[key]}
          >
            <ChartBarText>
              {item.value >= 14 ? item.value + "%" : ""}
            </ChartBarText>
          </ChartBar>
        ))}
      </ChartContainer>

      {/* 14% 이하 퍼센티지 하단 수직선 */}
      <VerticalLineContainer>
        {chartData.map((item, key) => {
          if (item.value < 14 && item.value > 5 && key % 2)
            return (
              <VerticalLine
                key={key}
                left={absolutePosition[key] + parseFloat(item.value) / 2 + "%"}
              />
            );
        })}
      </VerticalLineContainer>

      {/* 14% 이하 퍼센티지 하단 표시 */}
      <PercentContainer>
        {chartData.map((item, key) => {
          if (item.value < 14 && item.value > 5 && key % 2)
            return (
              <PercentText
                key={key}
                width={item.value + "%"}
                left={absolutePosition[key] + "%"}
              >
                {item.value + "%"}
              </PercentText>
            );
        })}
      </PercentContainer>

      <LegendContainer>
        {chartData.map((item, idx) => (
          <LegendBox key={idx}>
            <LegendColor backgroundColor={colorList[idx]}></LegendColor>
            <LegendText> {item.key}</LegendText>
          </LegendBox>
        ))}
      </LegendContainer>
    </Container>
  );
}

export default StackedBarChart;

const Container = styled.div`
  ${Styles.small_m}
  margin:10px 0px 60px 0px;
`;

const PercentContainer = styled.div`
  position: relative;
  height: 28px;
`;

const PercentText = styled.p`
  position: absolute;
  text-align: center;
  left: ${(props) => props.left};
  width: ${(props) => props.width};
  line-height: 28px;
`;

const VerticalLineContainer = styled.div`
  position: relative;
  height: 15px;
`;

const VerticalLine = styled.div`
  position: absolute;
  left: ${(props) => props.left};
  border-left: 1px solid var(--bg60);
  height: 15px;
`;

const ChartContainer = styled.div`
  display: flex;
`;

const ChartBar = styled.div`
  width: ${(props) => props.width};
  background-color: ${(props) => props.backgroundColor};
  height: 30px;
`;

const ChartBarText = styled.p`
  line-height: 30px;
  color: white;
  text-align: center;
  background-color: inherit;
`;

const LegendContainer = styled.div`
  display: grid;
  grid: subgrid;
  margin-top: 20px;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
`;

const LegendBox = styled.div`
  display: flex;
`;

const LegendColor = styled.div`
  width: 15px;
  height: 15px;
  margin: 3px;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};
`;

const LegendText = styled.p`
  width: 85%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

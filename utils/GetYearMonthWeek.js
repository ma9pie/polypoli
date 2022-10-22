import moment from "moment";

const GetYearMonthWeek = (str) => {
  // str 형식은 YYYY-MM-DD
  const now = moment(str);
  const firstDayOfMonth = moment(str).startOf("month");
  const firstDayOfWeek = moment(str).startOf("isoweek");
  const lastDayOfWeek = moment(str).endOf("isoweek");
  let year = firstDayOfWeek.get("year");
  let month = 0;
  let week = 0;
  // 달이 바뀔 때
  if (firstDayOfWeek.get("month") !== lastDayOfWeek.get("month")) {
    // 바뀌는 달의 1일
    const firstDayOfNextMonth = moment(
      lastDayOfWeek.format("YYYY-MM-DD")
    ).startOf("month");
    // 1일이 월~목 사이일 때
    if (
      1 <= firstDayOfNextMonth.get("day") &&
      firstDayOfNextMonth.get("day") <= 4
    ) {
      month = lastDayOfWeek.get("month") + 1;
      week = 1;
    } else {
      month = firstDayOfWeek.get("month") + 1;
      week =
        GetYearMonthWeek(now.add(-7, "days").format("YYYY-MM-DD")).week + 1;
    }
  }
  // 달이 안바뀔 때
  else {
    week = now.get("isoweek") - firstDayOfMonth.get("isoweek");
    // 1월 초가 (ISO 표준) 12월 5주차일때
    if (week < 0) {
      // year = firstDayOfWeek.get("year");
      week = now.get("isoweek");
    }

    // 해당 달의 1일이 월~목 사이일 때
    if (1 <= firstDayOfMonth.get("day") && firstDayOfMonth.get("day") <= 4)
      week++;
    month = now.get("month") + 1;
  }

  return { year: year, month: month, week: week };
};

export default GetYearMonthWeek;

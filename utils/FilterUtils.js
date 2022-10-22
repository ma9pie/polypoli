import Decimal from "decimal.js";
import isNaN from "lodash/isNaN";
import moment from "moment";

const FilterUtils = () => {};

const isEmpty = (data) => {
  if (typeof data === "object") {
    if (JSON.stringify(data) === "{}" || JSON.stringify(data) === "[]") {
      return true;
    } else if (!data) {
      return true;
    }
    return false;
  } else if (typeof data === "string") {
    if (!data.trim()) {
      return true;
    }
    return false;
  } else if (typeof data === "undefined") {
    return true;
  } else {
    return false;
  }
};

FilterUtils.params = (location) => {
  var str = location.search;
  var objURL = {};

  str.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function ($0, $1, $2, $3) {
      objURL[$1] = $3;
    }
  );
  return objURL;
};

// 일주일 전 날짜 구하기
FilterUtils.weekAgo = () => {
  const today = new window.Date();
  const year = today.getFullYear(); // 년
  const month = today.getMonth(); // 월
  const day = today.getDate(); // 일

  const date = new window.Date(year, month, day - 7);
  return date;
};

// 시간을 YYYY-MM-DD HH:mm:ss 형식으로 변환
FilterUtils.formatFullTime = (date) => {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

// 시간을 YYYY-MM-DD HH:mm 형식으로 변환
FilterUtils.formatDateTime = (date) => {
  return moment(date).format("YYYY-MM-DD HH:mm");
};

// 시간을 YYYY-MM-DD 형식으로 변환
FilterUtils.formatDate = (date) => {
  if (date === "") return date;
  return moment(date).format("YYYY-MM-DD");
};

// 시간을 YYYY.MM.DD 형식으로 변환
FilterUtils.formatDateComma = (date) => {
  return moment(date).format("YYYY.MM.DD");
};

// 시간을 HH:mm:ss 형식으로 변환
FilterUtils.formatTime = (date) => {
  if (date === "") return date;
  return moment(date).format("HH:mm:ss");
};

// UTC시간을 KST시간으로 변환
FilterUtils.utcToKst = (time) => {
  if (time === "") return time;
  return moment(time).add(9, "hours");
};

// KST시간을 YYYY-MM-DD HH:mm:ss 형식으로 변환
FilterUtils.kstFormatDateTime = (time) => {
  if (time === "") return time;
  return moment(time).add(9, "hours").format("YYYY-MM-DD HH:mm");
};

// KST시간을 YYYY-MM-DD HH:mm:ss 형식으로 변환
FilterUtils.kstFormatFullTime = (time) => {
  if (time === "") return time;
  return moment(time).add(9, "hours").format("YYYY-MM-DD HH:mm:ss");
};

// KST시간을  YYYY-MM-DD 형식으로 변환
FilterUtils.kstFormatDate = (date) => {
  if (date === "") return date;
  return moment(date).format("YYYY-MM-DD");
};

// KST시간을 UTC시간으로 변환
FilterUtils.kstToUtc = (time) => {
  return moment(time).add(-9, "hours");
};

// UTC시간을 KST시간으로 변환(YYYY.MM.DD HH:mm:ss 형식)
FilterUtils.formatUtcToKst = (date) => {
  function addZero(n) {
    return n < 10 ? "0" + n : n;
  }

  return (
    new Date(date).getFullYear() +
    "." +
    addZero(new Date(date).getMonth() + 1) +
    "." +
    addZero(new Date(date).getDate()) +
    " " +
    addZero(new Date(date).getHours() + 9) +
    ":" +
    addZero(new Date(date).getMinutes()) +
    ":" +
    addZero(new Date(date).getSeconds())
  );
};

/**
 * Number를 받아서 세자리수마다 콤마, 소수점 n번째 자리까지 표현
 * @param {Number} number : formating 하고자 하는 숫자
 * @param {Number} decimalPoint : 소수점 n번째 자리수까지 표시하고
 * @param {Boolean} comma : 3자리수마다 콤마 표시 여부
 * n+1번째 자리수부터는 버림처리
 */
FilterUtils.formatNumber = (number, comma, decimalPoint) => {
  if (number === null || number === undefined || isNaN(number)) return 0;

  let result = number;

  if (decimalPoint !== undefined) {
    result = FilterUtils.truncation(number, decimalPoint);
  }

  if (comma) {
    result = FilterUtils.comma(result);
  }
  return result;
};

/**
 * 3자리수마다 콤마
 * @param {Number} number : formating 하고자 하는 숫자
 */
FilterUtils.comma = (number) => {
  if (number === null || number === undefined || isNaN(number)) {
    return 0;
  }
  let splitVal = number.toString().split(".");
  splitVal[0] = splitVal[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return splitVal.join(".");
};

/**
 * 콤마 제거
 * @param {Number} number : formating 하고자 하는 숫자
 */
FilterUtils.deleteComma = (number) => {
  if (number === null || number === undefined || isNaN(number)) {
    return 0;
  }
  return Number(number.toString().replace(/,/g, ""));
};

/**
 * 소수점 표시 고정
 * @param {*} number : 숫자
 * @param {*} decimalPoint : 소수점 표시 수 (버림처리)
 */
FilterUtils.truncation = (number, decimalPoint) => {
  if (number === null || number === undefined || isNaN(number)) return 0;
  const tmp = Math.pow(10, decimalPoint);
  return Number((Math.floor(number * tmp) / tmp).toFixed(decimalPoint));
};

/**
 * 큰 숫자의 표시형식을 변환
 * @param {Number} number : formating 하고자 하는 숫자
 * @param {Number} units : 표시 단위
 * @param {String} text : 숫자 뒤에 붙을 단어
 * [Ex]
 * 734,123 => 734,123
 * 7,734,123 => 7백만
 */
FilterUtils.formatNumberDisplay = (number, units, text) => {
  return FilterUtils.comma(String(Math.floor(number / units))) + text;
};

/**
 * 숫자 기호 표시
 * @param {Number} number : 숫자
 * 음수의 경우 이미 "-" 기호가 붙어있으므로 그대로 return
 */
FilterUtils.formatNumberSign = (number) => {
  if (Number(number) > 0) {
    return "+" + number;
  } else {
    return number;
  }
};

/**
 * 2e-8과 같은 지수형태의 숫자를 0.00000002 형태로 바꿔주는 함수
 * @param {Number} number : 숫자
 */
FilterUtils.expToDeciaml = (number) => {
  if (number === null || number === undefined || isNaN(number)) return 0;
  number = new Decimal(number).toFixed(31);
  return number.replace(/\.?0+$/, "");
};

/**
 * 긴 문자열 중략
 * @param {String} text : 중략하고자 하는 문자열
 * @param {Number} numberOfCharacters : 표시할 문자 수
 * [Ex]
 * @param ("123456789", 3) => @return "123...789"
 */
FilterUtils.formatOmitText = (text, numberOfCharacters) => {
  if (text === null || text === undefined) return text;
  if (text.length <= numberOfCharacters) return text;
  const mid = numberOfCharacters / 2;
  const frontText = text.slice(0, mid);
  const backText = text.slice(mid - numberOfCharacters);
  return frontText + "..." + backText;
};

/**
 * 타이머 시간 변환
 * @param {Number} second : 초
 * [Ex]
 * @param (300) => @return "05:00"
 */
FilterUtils.formatSecondToTime = (second) => {
  const mm = String(Math.floor(second / 60)).padStart(2, "0");
  const ss = String(second % 60).padStart(2, "0");

  return `${mm}:${ss}`;
};

/**
 * 색 표시
 * @param {Number} num : 숫자
 */
FilterUtils.setTextColor = (num) => {
  if (num > 0) {
    return "var(--buyBtn)";
  } else if (num < 0) {
    return "var(--sellBtn)";
  } else {
    return "var(--mainText)";
  }
};

/**
 * 해당 date가 신규상장 날짜 기준에 부합하는지 확인
 * @param {String} date : 신규상장 날짜
 * @returns {Boolean}
 */
FilterUtils.checkNewListing = (date) => {
  const referenceDate = moment().add(-7, "days");
  const listingDate = moment(date).add(1, "days");
  if (referenceDate < listingDate) {
    return true;
  } else {
    return false;
  }
};

/**
 * 해당 date가 에어드랍 날짜 기준에 부합하는지 확인
 * @param {String} start : 시작날짜
 * @param {String} end : 종료날짜
 * @returns {Boolean}
 */
FilterUtils.checkAirdrop = (start, end) => {
  const startDate = moment(start);
  const now = moment();
  const endDate = moment(end).add(1, "days");
  if (startDate <= now && now < endDate) {
    return true;
  } else {
    return false;
  }
};

/**
 * 코인이 유의종목으로 지정되었는지 확인
 * @param {String} start : 시작날짜
 * @returns {Boolean}
 */
FilterUtils.checkWarningDate = (start) => {
  const startDate = moment(start);
  const now = moment();
  if (startDate <= now) {
    return true;
  } else {
    return false;
  }
};

/**
 * 원화환율 표시
 * @param {Number} number
 * @returns {number}
 */
FilterUtils.formatKrw = (number) => {
  if (number === null || number === undefined || isNaN(number)) return 0;

  // 소수점 최대 2자리까지 노출
  if (number < 100) {
    const tmp = Math.pow(10, 2);
    number = Number((Math.floor(number * tmp) / tmp).toFixed(2));
  }
  //소수점 없음
  else {
    number = Number(Math.floor(number));
  }

  // 3자리수마다 콤마
  return FilterUtils.comma(number);
};

/**
 * USDT 표시
 * @param {Number} number
 * @returns {number}
 */
FilterUtils.formatUsdt = (number) => {
  if (number === null || number === undefined || isNaN(number)) return 0;
  return FilterUtils.comma(number);
};

/**
 * 수량 표시
 * @param {Number} number
 * @returns {number}
 */
FilterUtils.formatQuantity = (number) => {
  if (number === null || number === undefined || isNaN(number)) return 0;
  return FilterUtils.comma(number);
};

/**
 * 누적 수량 표시
 * @param {Number} number
 * @returns {number}
 */
FilterUtils.formatTotalQunatity = (number) => {
  // 천 미만
  if (number < 1000) {
    return FilterUtils.comma((Math.floor(number * 1000) / 1000).toFixed(2));
  }
  // 천 ~ 백만
  else if (number < 1000000) {
    return FilterUtils.comma((number / 1000).toFixed(2)) + "천";
  }
  // 백만 ~ 십억
  else if (number < 1000000000) {
    return FilterUtils.comma(Math.floor(number / 1000).toFixed(2)) + "백만";
  }
  // 십억 ~ 조
  else if (number < 1000000000000) {
    return FilterUtils.comma(Math.floor(number / 1000).toFixed(2)) + "십억";
  }
  // 조 이상
  else {
    return FilterUtils.comma(Math.floor(number / 1000).toFixed(2)) + "조";
  }
};

/**
 * 코인리스트 거래대금 표시
 * @param {Number} number
 * @returns {number}
 */
FilterUtils.formatTransactionAmount = (number) => {
  if (number >= 1000000000000) {
    return (
      FilterUtils.comma(Math.floor(number / 1000000000000).toFixed(0)) + "조"
    );
  } else if (number >= 1000000000) {
    return (
      FilterUtils.comma(Math.floor(number / 1000000000).toFixed(0)) + "십억"
    );
  } else if (number >= 1000000) {
    return FilterUtils.comma(Math.floor(number / 1000000).toFixed(0)) + "백만";
  } else {
    return FilterUtils.comma(number.toFixed(0));
  }
};

/**
 * 퍼센트 표시
 * @param {Number} number
 * @returns {number}
 */
FilterUtils.formatPercent = (number) => {
  if (number === null || number === undefined || isNaN(number)) return 0;
  const tmp = Math.pow(10, 2);
  number = (Math.floor(number * tmp) / tmp).toFixed(2);

  return FilterUtils.comma(number);
};

/**
 * 소수점 입력 방지
 * @param {Number} number
 * @returns {number}
 */
FilterUtils.formatOnlyNumber = (number) => {
  if (number === null || number === undefined || isNaN(number)) return 0;
  return number.replace(/[^0-9]/g, "");
};

/**
 * 네트워크 이름 생성기 => 메인넷코드(토큰코드)
 * @param {String} mainnetCode 메인넷 코드
 * @param {String} tokenCode 토큰 코드
 * @returns {String}
 */
FilterUtils.formatNetworkName = (mainnetCode, tokenCode) => {
  let result = mainnetCode;
  if (tokenCode) {
    result += `(${tokenCode})`;
  }
  return result;
};

/**
 * url 판별기
 * @param {String} url url 주소
 * @returns {Boolean}
 */
FilterUtils.checkUrlForm = (url) => {
  const regExp = /^http[s]?\:\/\//i;
  return regExp.test(url);
};

export default FilterUtils;

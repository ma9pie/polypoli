const ControlUtils = () => {};

let isFirstRun = true;

// 더블클릭 방지
ControlUtils.doubleClickPrevention = (callback, timer) => {
  if (!timer) timer = 1000;
  if (isFirstRun) {
    isFirstRun = false;
    if (callback) callback();
    setTimeout(() => {
      isFirstRun = true;
    }, timer);
  }
};

export default ControlUtils;

import Decimal from "decimal.js";

const MathUtils = (val) => {
  let res = 0;
  if (val) res = val;
  return {
    value: function () {
      return res;
    },
    /**
     * 덧셈함수
     * @param {List} arg 숫자들이 담긴 배열
     * @returns result
     */
    plus: function (...arg) {
      let result = new Decimal(res);
      for (let i = 0; i < arg.length; i++) {
        if (!arg[i]) arg[i] = 0;
        result = result.plus(arg[i]);
      }
      res = result.toNumber();
      return this;
    },

    /**
     * 뺄셈함수
     * @param {List} arg 숫자들이 담긴 배열
     * @returns result
     */
    minus: function (...arg) {
      let result = new Decimal(res);
      for (let i = 0; i < arg.length; i++) {
        if (!arg[i]) arg[i] = 0;
        result = result.minus(arg[i]);
      }
      res = result.toNumber();
      return this;
    },

    /**
     * 곰셈함수
     * @param {List} arg 숫자들이 담긴 배열
     * @returns result
     */
    mul: function (...arg) {
      let result = new Decimal(res);
      for (let i = 0; i < arg.length; i++) {
        if (!arg[i]) arg[i] = 0;
        result = result.mul(arg[i]);
      }
      res = result.toNumber();
      return this;
    },

    /**
     * 나눗셈함수
     * @param {List} arg 숫자들이 담긴 배열
     * @returns result
     */
    div: function (...arg) {
      let result = new Decimal(res);
      for (let i = 0; i < arg.length; i++) {
        if (!arg[i]) arg[i] = 0;
        result = result.div(arg[i]);
      }
      res = result.toNumber();
      return this;
    },
  };
};

export default MathUtils;

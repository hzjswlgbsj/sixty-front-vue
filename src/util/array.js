/* eslint-disable */
//兼容不支持es5的低版本浏览器，该方法出自MDN https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {
    var k;
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (len === 0) {
      return -1;
    }
    var n = +fromIndex || 0;
    if (Math.abs(n) === Infinity) {
      n = 0;
    }
    if (n >= len) {
      return -1;
    }
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    while (k < len) {
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}

export default {
  sortBy (key, items) {
    if (!items) {
      return null
    }

    function compare(property){
      return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 > value2;
      }
    }
    items.sort(compare(key))

    return items
  },

  move (arr, from_index, to_index) {
    if (!arr) {
      return
    }
    while (from_index < 0) {
      from_index += arr.length;
    }
    while (to_index < 0) {
      to_index += arr.length;
    }
    if (to_index >= arr.length) {
      var k = to_index - arr.length;
      while ((k--) + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(to_index, 0, arr.splice(from_index, 1)[0]);
    return arr;
  }
}

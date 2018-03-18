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
  toObject (key, arr) {
    let obj = {}

    for (let val of arr) {
      obj[val[key]] = val
    }

    return obj
  },
  toObjectById (arr) {
    let obj = {}

    for (let val of arr) {
      obj[val.id] = val
    }

    return obj
  },
  filter (key, val, items) {
    let arr = []
    if (!items) {
      return arr
    }
    for (let item of items) {
      if (item[key] == val) {
        arr.push(item)
      }
    }
    return arr
  },
  filterItem (key, val, items) {
    if (!items || val === '' || !key) {
      return null
    }

    for (let item of items) {
      if (item[key] == val) {
        return item
      }
    }
    return null
  },
  filterItemsArray (key, val, items) {
    if (!items || val === '' || !key) {
      return null
    }
    let itemsArray = []
    for (let item of items) {
      if (item[key] == val) {
        itemsArray.push(item)
      }
    }
    return itemsArray
  },
  filterValById (id, valKey, items, err) {
    if (!items) {
      return err
    }

    for (let item of items) {
      if (item['id'] == id && item[valKey]) {
        return item[valKey]
      }
    }
    return err
  },
  filterVal (key, val, valKey, items, err) {
    if (!items) {
      return err
    }

    for (let item of items) {
      if (item[key] == val && item[valKey]) {
        return item[valKey]
      }
    }
    return err
  },
  deleteById (id, items) {
    for (let [key, item] of items.entries()) {
      if (item['id'] === id) {
        items.splice(key, 1)
      }
    }
  },
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
  unique (array) {
    if (this.isArray (array)){
      var n = [];
      for(var i = 0;i < array.length; i++){
        if(n.indexOf(array[i]) == -1 && array[i]) n.push(array[i]);
      }
      return n;
    }
  },
  isArray (arr){
    // 稍高版本的es原生提供了数组判断，这边这个兼容
    if (!Array.isArray) {
      Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
      };
    }
    return Array.isArray(arr);
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
  },
  isInArray (item, array){
    if (array.indexOf(item) === -1) {
      return false
    } else {
      return true
    }
  }
}

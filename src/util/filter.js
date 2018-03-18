/**
 * Created by liulin on 2017/9/25.
 */
function dataType (obj) {
  if (obj === null) return 'Null'
  if (obj === undefined) return 'Undefined'
  return Object.prototype.toString.call(obj).slice(8, -1)
}

let module = {
  filterEmpty: function (obj) {
    var param = {}
    if (obj === null || obj === undefined || obj === '') return param
    for (var key in obj) {
      if (dataType(obj[key]) === 'Object') {
        param[key] = this.filterEmpty(obj[key])
      } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
        param[key] = obj[key]
      }
    }
    return param
  },
  filterByColumn: function (column, columnVal, obj) {
    let returnData = []
    if (obj === null || obj === undefined || obj === '') return returnData
    for (let key in obj) {
      if (columnVal === obj[key][column]) {
        returnData.push(obj[key])
      }
    }
    return returnData
  }
}
export default module

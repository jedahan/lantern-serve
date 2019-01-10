Array.prototype.remove = function () {
  var what; var a = arguments; var L = a.length; var ax
  while (L && this.length) {
    what = a[--L]
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1)
    }
  }
  return this
}

Array.prototype.getIndexForObjectWithKey = function (key, value) {
  for (var idx in this) {
    var item = this[idx]
    if (item.hasOwnProperty(key) && item[key] === value) {
      return idx
    }
  }
}

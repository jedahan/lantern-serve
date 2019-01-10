String.prototype.truncate = function (strLen, separator) {
  if (this.length <= strLen) return this

  separator = separator || '...'

  var sepLen = separator.length

  var charsToShow = strLen - sepLen

  var frontChars = Math.ceil(charsToShow / 2)

  var backChars = Math.floor(charsToShow / 2)

  return this.substr(0, frontChars) +
           separator +
           this.substr(this.length - backChars)
}

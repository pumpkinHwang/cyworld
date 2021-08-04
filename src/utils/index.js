const {Base64} = require('js-base64')

const base64Enc = (text) => {
  return Base64.encode(text);
}

const base64Dec = (text) => {
  return Base64.decode(text);
}
module.exports = {
  base64Enc,
  base64Dec
}
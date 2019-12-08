"use strict";

// Lista de erros
let errors = [];

// Inicializa uma nova lista de erros
function ValidationContract() {
  errors = [];
}

ValidationContract.prototype.isRequired = (value, message) => {
  if (!value || value.length <= 0) {
    errors.push(message)
  }
}

ValidationContract.prototype.hasMinLen = (value, min, message) => {
  if (!value || value.length < min) {
    errors.push(message)
  }
}

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
  if (!value || value.length > max) {
    errors.push(message)
  }
}

ValidationContract.prototype.isFixedLen = (value, len, message) => {
  if (value.length !== len) {
    errors.push(message)
  }
}

ValidationContract.prototype.isEmail = (value, message) => {
  var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  if (!reg.test(value)) {
    errors.push({ message: message });
  }
}

ValidationContract.prototype.isUrl = (value, message) => {
  var reg = new RegExp('^(https?:\/\/)?' + // protocol
      '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|' + // domain name
      '((\d{1,3}\.){3}\d{1,3}))' + // OR ip (v4) address
      '(\:\d+)?(\/[-a-z\d%_.~+]*)*' + // port and path
      '(\?[;&a-z\d%_.~+=-]*)?' + // query string
      '(\#[-a-z\d_]*)?$', 'i') // fragment locater

  if (!reg.test(value)) {
    errors.push(message)
  }
}

ValidationContract.prototype.isCpf = (value, message) => {
  let cpf = value.replace(/[^\d]+/g, '')

  if (cpf === '') {
    errors.push(message)
    return
  }

  if (cpf.length !== 11 ||
    cpf === '00000000000' || cpf === '11111111111' ||
    cpf === '22222222222' || cpf === '33333333333' ||
    cpf === '44444444444' || cpf === '55555555555' ||
    cpf === '66666666666' || cpf === '77777777777' ||
    cpf === '88888888888' || cpf === '99999999999') {
    errors.push(message)
    return
  }

  let add = 0

  for (var i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i)
  }

  let rev = 11 - (add % 11)

  if (rev === 10 || rev === 11) {
    rev = 0
  }

  if (rev !== parseInt(cpf.charAt(9))) {
    errors.push(message)
    return
  }

  add = 0

  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i)
  }

  rev = 11 - (add % 11)

  if (rev === 10 || rev === 11) {
    rev = 0
  }

  if (rev !== parseInt(cpf.charAt(10))) {
    errors.push(message)
  }
}

ValidationContract.prototype.isGreaterThan = (value, min, message) => {
  if (value <= min) {
    errors.push(message)
  }
}

ValidationContract.prototype.isGreaterOrEqualsThan = (value, min, message) => {
  if (value < min) {
    errors.push(message)
  }
}

ValidationContract.prototype.isLessThan = (value, max, message) => {
  if (value >= max) {
    errors.push(message)
  }
}

ValidationContract.prototype.isLessOrEqualsThan = (value, max, message) => {
  if (value > max) {
    errors.push(message)
  }
}

ValidationContract.prototype.isBetween = (value, min, max, message) => {
  if (value < min || value > max) {
    errors.push(message)
  }
}

ValidationContract.prototype.contains = (value, array, message) => {
  if (!array.includes(value)) {
    errors.push(message)
  }
}

ValidationContract.prototype.addError = message => {
  errors.push(message)
}

ValidationContract.prototype.errors = () => {
  return errors
}

ValidationContract.prototype.clear = () => {
  errors = []
}

ValidationContract.prototype.isValid = () => {
  return errors.length === 0
}

ValidationContract.prototype.isInvalid = () => {
  return errors.length > 0
}

module.exports = ValidationContract;
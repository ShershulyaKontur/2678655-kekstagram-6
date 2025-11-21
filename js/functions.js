function isLengthValid(input, len) {
  return input.toString().length <= len;
}

function isPalindrome(input) {
  const validateStroke = input.toString().replaceAll(' ', '').toLowerCase();
  const reversedStroke = validateStroke.split('').reverse().join('');
  return validateStroke === reversedStroke;
}

function getDigit(input) {
  if (typeof input === 'number') {
    return Math.abs(input);
  }
  const str = input.toString().replaceAll(' ', '');
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= '0' && str[i] <= '9') {
      result += str[i];
    }
  }
  return result ? Number(result) : NaN;
}


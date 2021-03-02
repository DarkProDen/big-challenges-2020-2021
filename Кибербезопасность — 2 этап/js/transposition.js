function encrypt(input) {
  return input
    .split(' ')
    .map((word) => word.split('').reverse().join(''))
    .join(' ');
}

function encryptBtnClickHandler() {
  const inputElement = document.getElementById('messageToEncrypt');
  const outputElement = document.getElementById('encryptedMessage');

  outputElement.value = encrypt(inputElement.value);
}

function decryptBtnClickHandler() {
  const inputElement = document.getElementById('messageToDecrypt');
  const outputElement = document.getElementById('decryptedMessage');

  outputElement.value = encrypt(inputElement.value);
}

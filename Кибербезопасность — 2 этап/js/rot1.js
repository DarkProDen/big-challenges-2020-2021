function encrypt(input, encrypt = true) {
  let result = '';

  for (let i = 0; i < input.length; i++) {
    let code = input.charCodeAt(i);

    if (encrypt) {
      code++;
    } else {
      code--;
    }
    result += String.fromCharCode(code);
  }

  return result;
}

function encryptBtnClickHandler() {
  const inputElement = document.getElementById('messageToEncrypt');
  const outputElement = document.getElementById('encryptedMessage');

  outputElement.value = encrypt(inputElement.value);
}

function decryptBtnClickHandler() {
  const inputElement = document.getElementById('messageToDecrypt');
  const outputElement = document.getElementById('decryptedMessage');

  outputElement.value = encrypt(inputElement.value, false);
}

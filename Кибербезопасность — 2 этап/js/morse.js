const alphabet = {
  a: '.-',
  b: '-...',
  c: '-.-.',
  d: '-..',
  e: '.',
  f: '..-.',
  g: '--.',
  h: '....',
  i: '..',
  j: '.---',
  k: '-.-',
  l: '.-..',
  m: '--',
  n: '-.',
  o: '---',
  p: '.--.',
  q: '--.-',
  r: '.-.',
  s: '...',
  t: '-',
  u: '..-',
  v: '...-',
  w: '.--',
  x: '-..-',
  y: '-.--',
  z: '--..',
  ' ': '/',
  1: '.----',
  2: '..---',
  3: '...--',
  4: '....-',
  5: '.....',
  6: '-....',
  7: '--...',
  8: '---..',
  9: '----.',
  0: '-----',
};

function encrypt(input) {
  return input
    .trim()
    .toLowerCase()
    .split('')
    .map((char) => alphabet[char])
    .join(' ');
}

function decrypt(input) {
  return input
    .trim()
    .split(' ')
    .map((char) => {
      for (const key in alphabet) {
        const code = alphabet[key];
        if (char === code) {
          return key;
        }
      }
    })
    .join('');
}

function encryptBtnClickHandler() {
  const inputElement = document.getElementById('messageToEncrypt');
  const outputElement = document.getElementById('encryptedMessage');

  outputElement.value = encrypt(inputElement.value);
}

function decryptBtnClickHandler() {
  const inputElement = document.getElementById('messageToDecrypt');
  const outputElement = document.getElementById('decryptedMessage');

  outputElement.value = decrypt(inputElement.value);
}

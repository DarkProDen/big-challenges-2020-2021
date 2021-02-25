let output = "";

let inputEncryptElement = document.getElementById("input-encrypt");
let encryptBtn = document.getElementById("encrypt-btn");
let outputEncryptElement = document.getElementById("output-encrypt");

let inputDecipherElement = document.getElementById("input-decipher");
let decipherBtn = document.getElementById("decipher-btn");
let outputDecipherElement = document.getElementById("output-decipher");

let decipherKey = document.getElementById("key-decipher").value;

encryptBtn.addEventListener("click", () => {
  let encryptKey = document.getElementById("key-encrypt").value;

  if (encryptKey.length !== 30 || isNaN(+encryptKey)) {
    alert("неправельный ключ");
    return;
  }

  outputEncryptElement.value = encryptMessage(
    inputEncryptElement.value,
    encryptKey
  );
});
decipherBtn.addEventListener("click", () => {
  let decipherKey = document.getElementById("key-decipher").value;

  if (decipherKey.length !== 30 || isNaN(+decipherKey)) {
    alert("неправельный ключ");
    return;
  }
  outputDecipherElement.value = decipherMessage(
    inputDecipherElement.value,
    decipherKey
  );
});

function encryptMessage(message, key) {
  //превращаем сообщение в массив символов
  if (message.length === 0) {
    alert("Слишком короткое сообщение");
    return "";
  }
  let inputMesArr = message.split("");

  //создаем новый массив с кодами символов
  let inputMesCodesArr = inputMesArr.map((char) => {
    let code = char.codePointAt(0).toString();

    while (code.length < 4) {
      code = "0" + code;
    }

    return code;
  });

  //каждый код символа переворачиваем
  let reversedInputMesCodesArr = inputMesCodesArr.map((code) => {
    return code.split("").reverse().join("");
  });

  //объединяем массив с перевернутыми кодами в строку
  let codesStr = reversedInputMesCodesArr.join("");

  //разбиваем ключ на массив по 3 цифры
  let keyArr = [];

  for (let i = 0; i < key.length; i += 3) {
    keyArr.push(key.substr(i, 3));
  }

  //используя массив из ключа, перемешиваем знаки в строке с перевернутыми кодами
  keyArr.forEach((keyNumber) => {
    let firstNumber = +keyNumber[0];
    let secondNumber = +keyNumber[1];
    let thirdNumber = +keyNumber[2];

    if (thirdNumber >= 5) {
      secondNumber = -secondNumber;
    }

    for (let i = 0; i < codesStr.length; i++) {
      if ((i + 1) % firstNumber === 0) {
        let newIndex = i + secondNumber;

        if (newIndex > codesStr.length - 1) {
          let dif = secondNumber - (codesStr.length - 1 - i);
          newIndex = dif - 1;
        }

        if (newIndex < 0) {
          newIndex = codesStr.length + newIndex;
        }

        let temp1 = codesStr[i];
        let temp2 = codesStr[newIndex];

        let str1 = codesStr.substr(0, newIndex);
        let str2 = codesStr.substring(newIndex + 1);

        codesStr = str1 + temp1 + str2;
        str1 = codesStr.substr(0, i);
        str2 = codesStr.substring(i + 1);
        codesStr = str1 + temp2 + str2;
      }
    }
  });

  //превращаем строку с перевернутыми и перемешаными кодами в массив
  let resultCodeArr = [];

  for (let i = 0; i < codesStr.length; i += 4) {
    resultCodeArr.push(codesStr.substr(i, 4));
  }

  //превращаем массив с перевернутыми и перемешаными кодами в массив закодированных символов
  let resultCharsArr = resultCodeArr.map((code) => String.fromCharCode(code));

  //превращаем массив закодированных символов в закодированное сообщение
  let result = resultCharsArr.join("");

  return result;
}

function decipherMessage(message, key) {
  if (message.length === 0) {
    alert("Слишком короткое зашифрованное сообщение");
    return "";
  }

  let inputMesArr = message.split("");

  let inputMesCodesArr = inputMesArr.map((char) => {
    let code = char.codePointAt(0).toString();

    while (code.length < 4) {
      code = "0" + code;
    }

    return code;
  });

  let codesStr = inputMesCodesArr.join("");

  let keyArr = [];

  for (let i = 0; i < key.length; i += 3) {
    keyArr.push(key.substr(i, 3));
  }

  keyArr.reverse().forEach((keyNumber) => {
    let firstNumber = +keyNumber[0];
    let secondNumber = +keyNumber[1];
    let thirdNumber = +keyNumber[2];

    if (thirdNumber >= 5) {
      secondNumber = -secondNumber;
    }

    for (let i = codesStr.length - 1; i >= 0; i--) {
      if ((i + 1) % firstNumber === 0) {
        let newIndex = i + secondNumber;

        if (newIndex > codesStr.length - 1) {
          let dif = secondNumber - (codesStr.length - 1 - i);
          newIndex = dif - 1;
        }

        if (newIndex < 0) {
          newIndex = codesStr.length + newIndex;
        }

        let temp1 = codesStr[i];
        let temp2 = codesStr[newIndex];

        let str1 = codesStr.substr(0, newIndex);
        let str2 = codesStr.substring(newIndex + 1);

        codesStr = str1 + temp1 + str2;
        str1 = codesStr.substr(0, i);
        str2 = codesStr.substring(i + 1);
        codesStr = str1 + temp2 + str2;
      }
    }
  });

  let resultCodeArr = [];

  for (let i = 0; i < codesStr.length; i += 4) {
    resultCodeArr.push(codesStr.substr(i, 4));
  }

  let reversedInputMesCodesArr = resultCodeArr.map((code) => {
    return code.split("").reverse().join("");
  });

  let resultCharsArr = reversedInputMesCodesArr.map((code) =>
    String.fromCharCode(code)
  );

  let result = resultCharsArr.join("");

  return result;
}
function hidden() {
  let textElements = document.getElementsByClassName("text");
  let btnElements = [];
  for (let i = 0; i < textElements.length; i++) {
    btnElements.push(document.getElementsByClassName("btn")[i]);
    btnElements[i].addEventListener("click", () => {
      for (let j = 0; j < textElements.length; j++) {
        if (!(i == j)) {
          textElements[j].hidden = true;
        } else {
          textElements[j].hidden = false;
        }
      }
    });
  }
}
function subscribe() {
  let footerArrey = document.getElementsByTagName("footer");
  let footer = document.createElement("footer");
  footer.innerHTML = `Создал:<br>
Кириченко Семён`;
  let length = footerArrey.length;
  for (let i = 0; i < length; i++) {
    footerArrey[0].parentNode.removeChild(footerArrey[0]);
  }
  document.body.appendChild(footer);
}
subscribe();
hidden();

setInterval(() => {
  let mainY = document.getElementsByTagName("main")[0].getBoundingClientRect()
    .y;
  let menuTop = document
    .getElementsByClassName("menu")[0]
    .getBoundingClientRect().top;

  if (mainY !== menuTop) {
    if (mainY < 0) {
      mainY = 0;
    }
    document.getElementsByClassName("menu")[0].style.top = mainY + "px";
  }
}, 0);

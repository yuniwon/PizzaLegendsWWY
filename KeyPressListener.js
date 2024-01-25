// 설명 : 키보드 입력을 받아서 특정 키가 입력되면 콜백을 실행하는 클래스
// 사용법 : new KeyPressListener(키코드, 콜백함수)
// 예시 : new KeyPressListener("Enter", () => {console.log("엔터가 입력되었습니다.")});
// 키 코드는 아래 링크에서 확인 가능
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values

class KeyPressListener {
  constructor(keyCode, callback) {
    let keySafe = true; // 키가 안전한지 아닌지 확인하는 변수
    this.keydownFunction = function (event) { // 키가 눌렸을 때
      if (event.code === keyCode) { // 키가 눌린 키코드가 입력받은 키코드와 같다면 키세이프를 false로 만듦
        if (keySafe) { 
          keySafe = false; 
          callback(); // 콜백 실행
        }
      }
    };
    this.keyupFunction = function (event) { // 키가 눌렸다가 떼어졌을 때
      if (event.code === keyCode) { // 키가 눌린 키코드가 입력받은 키코드와 같다면 키세이프를 true로 만듦
        keySafe = true;
      }
    };
    document.addEventListener("keydown", this.keydownFunction);
    document.addEventListener("keyup", this.keyupFunction);
  }
  unbind(){
    document.removeEventListener("keydown", this.keydownFunction);
    document.removeEventListener("keyup", this.keyupFunction);
  }
}
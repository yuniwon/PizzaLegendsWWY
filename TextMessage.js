// 설명 : 텍스트 메세지를 만드는 클래스

class TextMessage {
  constructor({
    text,
    onComplete
  }) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null;
  }
  // 텍스트 메세지를 만드는 함수
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");
    this.element.innerHTML = (`
    <p class="TextMessage_p">${this.text}</p>
    <button class="TextMessage_button">다음</button>
    `)

    // 버튼을 누르면 텍스트 메세지가 사라짐
    this.element.querySelector("button").addEventListener("click", () => {
  
      this.done();
    });
    // 엔터를 눌러도 텍스트 메세지가 사라짐
    this.actionListener = new KeyPressListener("Enter", () => {
      this.actionListener.unbind();
      this.done();
    })
  };

  // 텍스트 메세지를 없애는 함수
  done() {
    this.element.remove();
    // this.actionListener.unbind();
    this.onComplete();
  }

  // 텍스트 메세지를 화면에 보이게 하는 함수
  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }
}
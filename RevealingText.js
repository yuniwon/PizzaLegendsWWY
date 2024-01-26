class RevealingText {
  constructor(config) {
    this.element = config.element;
    this.text = config.text;
    this.speed = config.speed || 70;

    this.timeout = null;
    this.isDone = false;

  };

  // 텍스트를 하나씩 보여주는 함수
  revealOneCharacter(list) {
    const next = list.splice(0,1)[0];
    next.span.classList.add("revealed");
    if(list.length > 0){
      this.timeout = setTimeout(() => { // 정해진 시간마다 한 글자씩 보여줌
        this.revealOneCharacter(list);
      }, next.delayAfter);
  }else{
    this.isDone = true;
  
  };
};

wrapToDone(){
 clearTimeout(this.timeout);
 this.isDone = true;
 this.element.querySelectorAll("span").forEach(span => {
   span.classList.add("revealed");
 });
};

  init() {
    let characters = [];
    this.text.split("").forEach((char) => {

      // 스팬을 하나씩 만들어서 element DOM에 추가함
      let span = document.createElement("span");
      span.textContent = char;
      this.element.appendChild(span);

      // 스팬을 배열에 추가함
      characters.push({
        span,
        delayAfter: char === " " ? 0 : this.speed,
      });
    });

    this.revealOneCharacter(characters);
  }
}
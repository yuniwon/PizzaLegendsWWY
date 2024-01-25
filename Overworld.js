// 설명 : OverworldMap을 생성하고, 그 위에 GameObject를 그리는 역할을 한다.
class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }
 // 게임 루프를 시작하는 함수 ------------------------------------------
  startGameLoop() {
    const step = () => {
      // clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // lower 이미지 그리기
      this.map.drawLowerImage(this.ctx);
      
      // gameObjects 그리기
      Object.values(this.map.gameObjects).forEach((gameObject) => {
        gameObject.update({
          arrow: this.DirectionInput.direction
        });
        gameObject.sprite.draw(this.ctx);

      });
    

      // upper 이미지 그리기
      this.map.drawUpperImage(this.ctx);
      
      requestAnimationFrame(step);
    };
    step();
  }

 // 게임을 초기화하는 함수 ------------------------------------------
  init() { // 게임을 시작하면 가장먼저 실행 됨
    // 게임 맵 오브젝트 생성
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    // 인풋을 받는 오브젝트 생성
    this.DirectionInput = new DirectionInput();
    this.DirectionInput.init();
    // 게임 루프 시작
    this.startGameLoop();
  }
}
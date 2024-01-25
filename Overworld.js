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
    const step = () => { // 게임 루프 함수 // 게임 루프는 1초에 60번 실행됨 // 모니터 주사율에 따라 달라짐  

      // 캔버스 초기화 -> 안하면 캔버스에 그려진 그림이 계속 남아있음
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const cameraPerson = this.map.gameObjects.hero; // 카메라가 따라다닐 사람 // hero의 속성을 그대로 가져옴

      // 게임 오브젝트 업데이트를 진행한 후 맵의 모든 게임 오브젝트를 그림
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.DirectionInput.direction,
          map: this.map,
        })
        // console.log(object);
      })
      // lower 이미지 그리기
      this.map.drawLowerImage(this.ctx, cameraPerson);
      
      // gameObjects 그리기
      Object.values(this.map.gameObjects).forEach((gameObject) => {
        gameObject.sprite.draw(this.ctx, cameraPerson); // 스프라이트 그리기 // 카메라가 따라다닐 사람을 인자로 넘겨줌
      });
    

      // upper 이미지 그리기
      this.map.drawUpperImage(this.ctx , cameraPerson);
      
      requestAnimationFrame(step);
      // ** 프레임 레이트를 조절하고 싶다면 아래 코드를 활성화 ------------------------------------------
      // 모니터주사율에 따라 실행되는 게임 루프를 1초에 30번 실행되게 만듦 -> 게임 속도가 느려질 수 있음
      // setTimeout(() => {
      //   requestAnimationFrame(step);
      // }, 1000 / 30);
      //----------------------------------------------------------------------------------------------
    };
    step();
  }

 // 게임을 초기화하는 함수 ------------------------------------------
  init() { // 게임을 시작하면 가장먼저 실행 됨
    // 게임 맵 오브젝트 생성
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.map.mountObject();
    // 인풋을 받는 오브젝트 생성
    this.DirectionInput = new DirectionInput();
    this.DirectionInput.init();
    // 게임 루프 시작
    this.startGameLoop();
  }
}
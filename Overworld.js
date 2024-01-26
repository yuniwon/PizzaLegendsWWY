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

      // 게임 오브젝트 업데이트를 진행
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.DirectionInput.direction, // 각오브젝트의 방향을 업데이트
          map: this.map, // 변경된 맵을 업데이트
        })
        // console.log(object);
      })
      // lower 이미지 그리기
      this.map.drawLowerImage(this.ctx, cameraPerson);
      
      // gameObjects 그리기
      // 오브젝트의 y좌표를 기준으로 정렬 -> 더 아래쪽에 있는 오브젝트를 나중에 그려서 이미지가 위에 있게 함
      Object.values(this.map.gameObjects).sort((a,b) => {
        return a.y - b.y;
      }).forEach((gameObject) => {
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

  bindActionInput() { // 엔터 입력받는 함수
    new KeyPressListener("Enter", () =>{
      // 말 걸 캐릭터가 존재하는지
      this.map.checkForActionCutscene();
    })
  };

  bindHeroPositionCheck() { // 플레이어의 위치가 변경되었는지 확인하는 함수
    document.addEventListener("PersonWalkingComplete", (e) => { // PersonWalkingComplete 이벤트는 모든 오브젝트가 움직임을 완료했을 때 발생
      if(e.detail.whoId === "hero"){ // 그 중에서 플레이어가 움직임을 완료했다면
        // console.log("플레이어의 움직임이 변경되었음");
        this.map.checkForFootstepCutscene(); // 해당 지역 컷신이벤트가 있는지 확인
      }
    });
  };

  stratMap(mapConfig){ // 맵을 시작하는 함수
    this.map = new OverworldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObject();
  
  }
 // 게임을 초기화하는 함수 ------------------------------------------
  init() { // 게임을 시작하면 가장먼저 실행 됨
    // 게임 맵 오브젝트 생성
    this.stratMap(window.OverworldMaps.Kitchen);
    this.bindActionInput(); // 엔터를 입력받는 메서드 // 말 걸 상대가 있으면 대화이벤트가 생성됨
    this.bindHeroPositionCheck(); // 플레이어의 위치가 변경되었는지 확인하는 메서드 // 플레이어의 위치에따라 이벤트를 발생시킴
    // 인풋을 받는 오브젝트 생성
    this.DirectionInput = new DirectionInput();
    this.DirectionInput.init();
    // 게임 루프 시작
    this.startGameLoop();

    // 이벤트 컷신
    this.map.startCutScene([

      {type: "Battle"}, // 전투
      // {type: "changeMap", map: "DemoRoom"}, // 맵을 바꿀수 있음
    //   {type: "TextMessage", text: "첫 메세지입니다!"}, // 메세지를 출력할 수 있음
    //   {who: "hero", type: "walk", direction: "Down",}, // 캐릭터를 움직일 수 있음
    //   {who: "npcA", type: "stand", direction: "Up", time: 800}, // 방향을 바꿀수 있음
    ]);
  }
}
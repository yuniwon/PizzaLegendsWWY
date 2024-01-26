// 설명 : 게임에 등장하는 모든 객체의 최상위 객체
class GameObject {
  constructor(config) { // config는 객체를 생성할 때 넘겨주는 정보
    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0; // x좌표
    this.y = config.y || 0; // y좌표
    this.direction = config.direction || "Down"; // 방향
    this.sprite = new Sprite({ // 스프라이트 생성
      gameObject: this, // 스프라이트가 속한 게임 오브젝트
      src: config.src || "/images/characters/people/hero.png", // 스프라이트 이미지 // config.src가 없으면 기본값으로 설정
    });

    this.behaviorLoop = config.behaviorLoop || []; // 캐릭터의 행동을 담은 배열
    this.behaviorLoopIndex = 0; // 행동 배열의 인덱스

    this.talking = config.talking || []; // 캐릭터의 대화를 담은 배열

  }
  mount(map){ // 게임 오브젝트를 맵에 등록하는 함수
    // console.log("mount");
    this.isMounted = true;
    map.addwall(this.x,this.y);

    // 정해진 행동루프에 따라 행동루프를 시작함
    setTimeout(() => {
        this.BehaviorLoopEvent(map);
    },10);
  }  
  
  update() { // 게임 루프에서 호출되는 함수
  }
  // 비동기 행동 루프 함수 ------------------------------------------ // npc들은 비동기 행동 루프를 가짐
  async BehaviorLoopEvent(map){

      // 멈춰야 될 상황이라면 함수를 종료
      if(map.isCutScenePlaying || this.behaviorLoop.length === 0 || this.isStanding){ // 만약 컷씬이 실행중이거나 행동 루프가 없다면 + 서있는 상태라면
        return; // 함수를 종료
      };

      //이벤트와 관련된 정보를 세팅
      let eventConfig = this.behaviorLoop[this.behaviorLoopIndex]; // 현재 행동
      eventConfig.who = this.id; // 행동을 시작한 사람의 id를 넘겨줌
    
      // 다음 이벤트 구성에서 이벤트 인스턴스를 생성합니다.
      const eventHandler = new OverworldEvent({map, event: eventConfig}); // 이벤트 핸들러 생성
      await eventHandler.init(); // 이벤트 핸들러 초기화

      // 이벤트가 끝난 후에 다음 행동을 시작합니다.
      this.behaviorLoopIndex += 1; // 다음 행동으로 넘어감
      if(this.behaviorLoopIndex >= this.behaviorLoop.length){ // 행동 루프가 끝났다면
        this.behaviorLoopIndex = 0; // 다시 처음부터 시작함
      }

      this.BehaviorLoopEvent(map); // 다음 행동을 시작함  // 재귀함수

    
  }
}
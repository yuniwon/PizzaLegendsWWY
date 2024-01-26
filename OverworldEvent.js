// 설명 : 오버월드에서 일어나는 이벤트를 정의하는 클래스
// 이벤트 종류(현재) : 서있기, 걷기, 대화하기 , 맵 전환하기
// 이벤트 종류(추가 예정) : 말걸기, 아이템 주기, 아이템 받기, 아이템 버리기, 아이템 사용하기 등


class OverworldEvent{
  constructor({map, event}){
    this.map = map;
    this.event = event;
  }
  // 서있는 이벤트
  stand(resolve){
    const who = this.map.gameObjects[this.event.who]; // 이벤트를 시작한 사람
    who.startBehavior({
      map: this.map,
    }, {
      type: "stand",
      direction: this.event.direction,
      time: this.event.time,
    }); // 이벤트를 시작함

    // 해당하는 사람이 서있는 것을 끝낼 때까지('PersonStandComplete가 반환될 때까지') 기다림, 그리고 다음 이벤트를 시작함
    const completeHandler = (event) => { // 이벤트 리스너 만들기
      if(event.detail.whoId === this.event.who){
        document.removeEventListener("PersonStandComplete", completeHandler);
        resolve();
      }

    };
    document.addEventListener("PersonStandComplete", completeHandler); // 이벤트 리스너 실행

  }
  // 걷는 이벤트
  walk(resolve){
    const who = this.map.gameObjects[this.event.who]; // 이벤트를 시작한 사람
    who.startBehavior({
      map: this.map,
    }, {
      type: "walk",
      direction: this.event.direction,
      retry: true,
    }); // 이벤트를 시작함

    // 맞는 사람이 걷기를 끝낼 때까지 기다림, 그리고 다음 이벤트를 시작함
    const completeHandler = (event) => { // 이벤트 리스너 만들기
      if(event.detail.whoId === this.event.who){
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }

    };
    // console.log(this.event.who);
    document.addEventListener("PersonWalkingComplete", completeHandler); // 이벤트 리스너 실행
  };
  // 대화 이벤트
  TextMessage(resolve){

    if(this.event.faceHero){
      const who = this.map.gameObjects[this.event.faceHero]; // 이벤트를 시작한 사람
      who.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
      who.updateSprite({
        map: this.map,
      });
    }
    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve(),
    });
    message.init(document.querySelector(".game-container"));

  };
  // 맵 전환 이벤트
  changeMap(resolve){

    const sceneTransition = new SceneTransition();
    sceneTransition.init(document.querySelector(".game-container"), () => {
      this.map.overworld.stratMap(window.OverworldMaps[this.event.map]);
      resolve();


      sceneTransition.fadeOut();
    });
      


    // this.map.overworld.map.gameObjects["hero"].x = utils.withGrid(this.event.x);
    // this.map.overworld.map.gameObjects["hero"].y = utils.withGrid(this.event.y);
    // this.map.overworld.map.gameObjects["hero"].direction = this.event.direction;
    // this.map.overworld.map.gameObjects["hero"].updateSprite({
    //   map: this.map.overworld.map,
    // });
  };

  Battle(resolve){
    const battle = new Battle({
      onComplete: () => {
        resolve();
      },
    });
  
    battle.init(document.querySelector(".game-container"), () => {
      resolve();
    });
  }

  init(){
    return new Promise((resolve) => {  // 프로미스는 비동기 함수를 동기 함수처럼 사용할 수 있게 해줌
        this[this.event.type](resolve); // 이벤트 타입에 따라서 함수를 실행함
    });
  };

}

class OverworldEvent{
  constructor({map, event}){
    this.map = map;
    this.event = event;
  }

  stand(resolve){
    const who = this.map.gameObjects[this.event.who]; // 이벤트를 시작한 사람
    who.startBehavior({
      map: this.map,
    }, {
      type: "stand",
      direction: this.event.direction,
      time: this.event.time,
    }); // 이벤트를 시작함

    // 해당하는 사람이 서있는 것을 끝낼 때까지'PersonStandComplete가 반환될 때까지' 기다림, 그리고 다음 이벤트를 시작함
    const completeHandler = (event) => { // 이벤트 리스너 만들기
      if(event.detail.whoId === this.event.who){
        document.removeEventListener("PersonStandComplete", completeHandler);
        resolve();
      }

    };
    document.addEventListener("PersonStandComplete", completeHandler); // 이벤트 리스너 실행

  }

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
    document.addEventListener("PersonWalkingComplete", completeHandler); // 이벤트 리스너 실행
  }

  TextMessage(resolve){
    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve(),
    });
    message.init(document.querySelector(".game-container"));

  }
  init(){
    return new Promise((resolve) => {
        this[this.event.type](resolve);
    });
  }

}
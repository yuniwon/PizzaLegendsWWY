// 월드맵에 대한 데이터를 담는 클래스
// 각 맵의 이름에 따라 클래스를 생성
// 맵 레이어, 게임 오브젝트, 컷씬, 벽 등을 담음

// 맵 레이어 : lower, upper
// 게임 오브젝트 : 플레이어, NPC, 아이템 등
// 컷씬 : 플레이어가 특정 위치에 도달하면 실행되는 이벤트
// 벽 : 플레이어가 이동할 수 없는 공간
class OverworldMap {
  constructor(config) {
    this.overworld = null;
    this.gameObjects = config.gameObjects
    this.cutsceneSpace = config.cutsceneSpace || {};
    this.walls = config.walls || {}; // 벽

    // 맵 레이어
    this.lowerImage = new Image(); // lower 레이어
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image(); // upper 레이어
    this.upperImage.src = config.upperSrc;

    this.isCutScenePlaying = false; // 컷씬이 실행중인지 아닌지
  }

  drawLowerImage(ctx, cameraPerson) { // lower 레이어 그리기
    ctx.drawImage(this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y)
  }
  drawUpperImage(ctx, cameraPerson) { // upper 레이어 그리기
    ctx.drawImage(this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y)
  }

  isSpaceTaken(currnetX,currentY,direction){ // 현재 위치에서 방향을 보고 있는 곳에 벽이 있는지 확인하는 함수
    const [nextX, nextY] = utils.nextPosition(currnetX, currentY, direction);
    return this.walls[`${nextX},${nextY}`];
  }

  mountObject(){ // 게임 오브젝트를 맵에 등록하는 함수
    Object.keys(this.gameObjects).forEach((key) => {
      let object = this.gameObjects[key];
      object.id = key;
      object.mount(this);
    });

  }

  async startCutScene(events){ // 컷씬을 시작하는 함수
    this.isCutScenePlaying = true; // 컷씬이 실행중이라고 표시 // 컷씬이 실행중이면 플레이어가 움직이지 않음
    // 비동기 이벤트루프 시작
    for(let i = 0; i < events.length; i++){
      const eventHandler = new OverworldEvent({
        map: this,
        event: events[i],
      });
      await eventHandler.init();
    }
    // 각 이벤트를 기다림
    this.isCutScenePlaying = false; // 컷씬이 끝났다고 표시 // 컷씬이 끝나면 플레이어가 움직일 수 있음

    // NPC들의 기본 행동으로 리셋
    Object.values(this.gameObjects).forEach((object) => {
      object.BehaviorLoopEvent(this);
    });
  }
  checkForFootstepCutscene(){ // 플레이어의 위치에 컷씬이 있는지 확인하는 함수
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpace[`${hero.x},${hero.y}`]; // 컷씬공간 안에 x,y좌표의 이름이 있는지 확인
    // console.log(match);
    if(!this.isCutScenePlaying&& match){ // 컷씬이 실행중이 아니고, 컷씬공간 안에 x,y좌표의 이름이 있다면
      this.startCutScene(match[0].events); // 해당 컷씬을 시작함
    }

  };
  checkForActionCutscene(){ // 말 걸 캐릭터가 존재하는지 확인하는 함수
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction); // 플레이어가 바라보는 방향으로 한칸 이동한 좌표
    const match = Object.values(this.gameObjects).find((object) => { // 플레이어가 바라보는 방향으로 한칸 이동한 좌표에 npc가 있는지 확인
      return object.x === nextCoords[0] && object.y === nextCoords[1];
    });
    if(!this.isCutScenePlaying&& match && match.talking.length){ // 컷씬이 실행중이 아니고, 말 걸 캐릭터가 존재하고, 말 걸 캐릭터가 대사를 가지고 있다면
      this.startCutScene(match.talking[0].events); // 해당 컷씬을 시작함
    }
  }

  addwall(x, y) { // 벽을 추가하는 함수
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x, y) { // 벽을 제거하는 함수
    delete this.walls[`${x},${y}`]; 
  }
  moveWall(x, y, direction) { // 벽을 이동하는 함수
    this.removeWall(x, y);
    const [nextX, nextY] = utils.nextPosition(x, y, direction);
    this.addwall(nextX, nextY);
  }
}
// 월드맵 데이터를 담는 클래스
// window를 사용하면 다른 파일에서도 사용할 수 있음 
// window는 전역 객체이므로 다른 파일에서도 사용할 수 있음
window.OverworldMaps = {
  // 데모룸 맵 ------------------------------------------
  DemoRoom: {
    lowerSrc: "./images/maps/DemoLower.png",
    upperSrc: "./images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({ 
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
        direction: DirectionInput.heldDirection, // 방향키를 누르고 있으면 그 방향으로 바라봄
      }),
      npcA: new Person({ 
        x: utils.withGrid(7),
        y: utils.withGrid(9),
        src: "./images/characters/people/npc1.png",
        behaviorLoop: [ // 행동 루프
          { type: "stand", direction: "Left", time: 800},
          { type: "stand", direction: "Up", time: 800},
          { type: "stand", direction: "Right", time: 1200},
          { type: "stand", direction: "Up", time: 300},
        ],
        talking: [ // 대사
          {
            events: [ //이벤트 묶음으로 대사와 움직임등을 한번에 사용할 수 있음
              {type: "TextMessage", text: "저리 가!!", faceHero: "npcA"},
              // {type: "TextMessage", text: "바쁘니까 말걸지 말라고."},
              {who: "hero", type: "walk", direction: "Up",},
            ]
          }

        ],
      }),
      npcB: new Person({
        x: utils.withGrid(8),
        y: utils.withGrid(5),
        src: "./images/characters/people/npc2.png",
        // behaviorLoop: [
        //   { type: "walk", direction: "Left",},
        //   { type: "stand", direction: "Up", time: 800},
        //   { type: "walk", direction: "Up",},
        //   { type: "walk", direction: "Right",},
        //   { type: "walk", direction: "Down",},
        // ]
        talking: [ // 대화
        {
          events: [
            {type: "TextMessage", text: "여기는 직원용 탈의실이야", faceHero: "npcB"},
            {who:"npcB", type: "stand", direction: "Down",time : 500},
            // {type: "TextMessage", text: "바쁘니까 말걸지 마."},
            // {who: "hero", type: "walk", direction: "Up",},
          ]
        }

      ],
      }),
    },
    walls: {
      [utils.asGridCords(7, 6)]: true,
      [utils.asGridCords(8, 6)]: true,
      [utils.asGridCords(7, 7)]: true,
      [utils.asGridCords(8, 7)]: true,
    },
    cutsceneSpace: {
      [utils.asGridCords(7, 4)]: [
        {
          events: [
            {who:"npcB", type: "walk", direction: "Left",},
            {who:"npcB", type: "stand", direction: "Up", time: 500},
            {type: "TextMessage", text: "그쪽으로 가면 안돼!"},
            {who:"npcB", type: "walk", direction: "Right",},
            {who:"hero", type: "walk", direction: "Down",},
            {who:"hero", type: "walk", direction: "Left",},
            {who:"npcB", type: "stand", direction: "Down", time : 500},
  
            // {type: "TextMessage", text: "저는 NPC입니다."},
            // {type: "TextMessage", text: "반갑습니다."},
          ]
        },
      ],
      [utils.asGridCords(5, 10)]: [
        {
          events: [
            {type: "changeMap",map: "Kitchen", x: 5, y: 10, direction: "Up",},
          ]
        },
      ],
    },
  },
  // 키친 맵 ------------------------------------------
  Kitchen: {
    lowerSrc: "./images/maps/KitchenLower.png",
    upperSrc: "./images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(10),
      }),
      npcB: new Person({
        x: utils.withGrid(10),
        y: utils.withGrid(8),
        src: "./images/characters/people/npc3.png",
        talking: [ // 대화
        {
          events: [
            {type: "TextMessage", text: "해냈구나!", faceHero: "npcB"},
            // {who:"npcB", type: "stand", direction: "Down",time : 500},

          ]
        }

      ], // 대화이벤트 끝 
      }),
    },
    walls: {
      // [utils.asGridCords(7, 6)]: true,
      // [utils.asGridCords(8, 6)]: true,
      // [utils.asGridCords(7, 7)]: true,
      // [utils.asGridCords(8, 7)]: true,
    },
    cutsceneSpace: {
      // [utils.asGridCords(7, 4)]: [
      //   {
      //     events: [
      //       {who:"npcB", type: "walk", direction: "Left",},
      //       {who:"npcB", type: "stand", direction: "Up", time: 500},
      //       {type: "TextMessage", text: "그쪽으로 가면 안돼!"},
      //       {who:"npcB", type: "walk", direction: "Right",},
      //       {who:"hero", type: "walk", direction: "Down",},
      //       {who:"hero", type: "walk", direction: "Left",},
      //       {who:"npcB", type: "stand", direction: "Down", time : 500},
  
      //       // {type: "TextMessage", text: "저는 NPC입니다."},
      //       // {type: "TextMessage", text: "반갑습니다."},
      //     ]
      //   },
      // ],
      [utils.asGridCords(5, 10)]: [
        {
          events: [
            {type: "changeMap",map: "DemoRoom", x: 5, y: 10, direction: "Up",},
          ]
        },
      ],
    },
  },


}
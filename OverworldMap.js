// 월드맵에 대한 데이터를 담는 클래스
class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects
    this.walls = config.walls || {};

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
// window는 전역 객체이므로, window.OverworldMaps로 접근 가능
window.OverworldMaps = {
  // 데모룸 맵 ------------------------------------------
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
        direction: DirectionInput.heldDirection,
      }),
      npcA: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(9),
        src: "/images/characters/people/npc1.png",
        behaviorLoop: [
          { type: "stand", direction: "Left", time: 800},
          { type: "stand", direction: "Up", time: 800},
          { type: "stand", direction: "Right", time: 1200},
          { type: "stand", direction: "Up", time: 300},
        ],
      }),
      npcB: new Person({
        x: utils.withGrid(3),
        y: utils.withGrid(7),
        src: "/images/characters/people/npc2.png",
        behaviorLoop: [
          { type: "walk", direction: "Left",},
          // { type: "stand", direction: "Up", time: 800},
          { type: "walk", direction: "Up",},
          { type: "walk", direction: "Right",},
          { type: "walk", direction: "Down",},
        ]
      }),
    },
    walls: {
      [utils.asGridCords(7, 6)]: true,
      [utils.asGridCords(8, 6)]: true,
      [utils.asGridCords(7, 7)]: true,
      [utils.asGridCords(8, 7)]: true,
    },
  },
  // 키친 맵 ------------------------------------------
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new GameObject({
        x: 3,
        y: 5,
      }),
      npcA: new GameObject({
        x: 9,
        y: 6,
        src: "/images/characters/people/npc2.png",
      }),
      npcB: new GameObject({
        x: 10,
        y: 8,
        src: "/images/characters/people/npc3.png",
      }),
    },
  },


}
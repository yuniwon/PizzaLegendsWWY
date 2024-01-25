
// 월드맵에 대한 데이터를 담는 클래스
class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects 
    this.lowerImage = new Image(); // lower 레이어
    this.lowerImage.src = config.lowerSrc;
    this.upperImage = new Image(); // upper 레이어
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx) { // lower 레이어 그리기
    ctx.drawImage(this.lowerImage, 0, 0)
  }
  drawUpperImage(ctx) { // upper 레이어 그리기
    ctx.drawImage(this.upperImage, 0, 0)
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
      npc1: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(8),
        src: "/images/characters/people/npc1.png",
      }),
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
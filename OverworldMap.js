class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects
    this.lowerImage = new Image();
    this.lowerImageSrc = config.lowerSrc;
    this.upperImage = new Image();
    this.upperSrc = config.upperSrc;
  }

  drawLowerImage(ctx) {
    ctx.drawImage(this.lowerImage, 0, 0)
  }
  drawUpperImage(ctx) {
    ctx.drawImage(this.upperImage, 0, 0)
  }
}



window.OverworldMap = {
  // 데모룸 맵 ------------------------------------------
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new gameObjects({
        x: 5,
        y: 6,
      }),
      npc1: new gameObjects({
        x: 7,
        y: 9,
        src: "/images/characters/people/npc1.png",
      }),
    },

  },
  // 키친 맵 ------------------------------------------
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",

    gameObjects: { 
      hero: new gameObjects({
        x: 3,
        y: 1,
      }),
      npcA: new gameObjects({
        x: 9,
        y: 2,
        src: "/images/characters/people/npc1.png",
      }),
      npcB: new gameObjects({
        x: 10,
        y: 4,
        src: "/images/characters/people/npc1.png",
      }),
    },

  },

}
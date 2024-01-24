class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  startGameLoop() {
    const step = () => {
      // clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // lower 이미지 그리기
      this.map.drawLowerImage(this.ctx);
      
      // gameObjects 그리기
      Object.values(this.map.gameObjects).forEach((gameObject) => {
        gameObject.update({
          
        });
        gameObject.sprite.draw(this.ctx);

      });
    

      // upper 이미지 그리기
      this.map.drawUpperImage(this.ctx);
      
      requestAnimationFrame(step);
    };
    step();
  }


  init() { //this is the first thing that run
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.startGameLoop();
  }



}
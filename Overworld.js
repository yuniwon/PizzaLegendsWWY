class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  init() { //this is the first thing that run
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0)
    };
    image.src = "/images/maps/DemoLower.png";

    const hero = new GameObject({
      x: 5,
      y: 6,
    });
    const npc1 = new GameObject({
      x: 7,
      y: 9,
      src: "/images/characters/people/npc1.png",
    });

    setTimeout(() => {
      hero.sprite.draw(this.ctx);
      npc1.sprite.draw(this.ctx);
    }, 200);
    // hero.sprite.draw(this.ctx);
    // npc1.sprite.draw(this.ctx);
    // animate();
    // const x = 5;
    // const y = 6;

    // const shadow = new Image();
    // shadow.onload = () => {
    //   this.ctx.drawImage(
    //     shadow,
    //     0, //left cut 
    //     0, //top cut,
    //     32, //width of cut
    //     32, //height of cut
    //     x * 16 - 8, //x position
    //     y * 16 - 18, //y position
    //     32, //width of image
    //     32 //height of image
    //   )
    // }
    // shadow.src = "/images/characters/shadow.png";


    // const hero = new Image();
    // hero.onload = () => {
    //   this.ctx.drawImage(
    //     hero,
    //     0, //left cut 
    //     0, //top cut,
    //     32, //width of cut
    //     32, //height of cut
    //     x * 16 - 8,
    //     y * 16 - 18,
    //     32,
    //     32
    //   )
    // }
    // hero.src = "/images/characters/people/hero.png";

  }



}
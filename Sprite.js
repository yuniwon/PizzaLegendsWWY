class Sprite {
  constructor(config) {

    // 이미지 셋업
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    // 그림자
    this.shadow = new Image();
    this.useShadow = true;
    if (this.useShadow) {
      this.shadow.src = "/images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    //애니메이션 설정 & 초기 상태
    this.animations = config.animations || {
      idleDown: [
        [0, 0]
      ],

    };
    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentFrame = config.currentFrame || 0;

    // 게임 오브젝트 레퍼런스
    this.gameObject = config.gameObject || null;
  }

  draw(ctx) {
    const x = this.gameObject.x - 8;
    const y = this.gameObject.y - 18;
    this.isShadowLoaded && ctx.drawImage(
      this.shadow,
      x, //x position
      y, //y position
    );
    this.isLoaded && ctx.drawImage(this.image,
      0, 0,
      32, 32,
      x, y,
      32, 32
    );
  }

}
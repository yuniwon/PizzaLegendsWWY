
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
      "idle-Down" : [ [0, 0]  ],
      "walk-Down" : [ [1, 0], [2, 0], [3, 0], [0, 0]  ],
      "idle-Up" : [ [0, 2]  ],
      "walk-Up" : [ [1, 2], [2, 2], [3, 2], [0, 2]  ],
      "idle-Left" : [ [0, 3]  ],
      "walk-Left" : [ [1, 3], [2, 3], [3, 3], [0, 3]  ],
      "idle-Right" : [ [0, 1]  ],
      "walk-Right" : [ [1, 1], [2, 1], [3, 1], [0, 1]  ],

    };
    this.currentAnimation = config.currentAnimation || "idle-Down";
    this.currentAnimationFrame = 0;

    // 애니메이션 속도
    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;

    // 게임 오브젝트 레퍼런스
    this.gameObject = config.gameObject || null;
  }

  get frame(){
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  setAnimation(name){
    if(this.currentAnimation !== name){
      this.currentAnimation = name;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress(){
    // 애니메이션 프레임 진행
    if(this.animationFrameProgress > 0){
      this.animationFrameProgress -= 1;
      return;
    }

    // 애니메이션 프레임 초기화
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if(this.frame === undefined){
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx) {
    const x = this.gameObject.x - 8;
    const y = this.gameObject.y - 18;
    this.isShadowLoaded && ctx.drawImage(
      this.shadow,
      x, //x position
      y, //y position
    );
    // console.log(this.animations["walk-Down"][0]);
    const [frameX, frameY] = this.frame;

    this.isLoaded && ctx.drawImage(this.image,
      frameX * 32, frameY * 32, //x, y of sprite sheet
      32, 32, // width, height of sprite sheet
      x, y, // x, y of canvas
      32, 32 // width, height of canvas
    );
    this.updateAnimationProgress();
  }

}
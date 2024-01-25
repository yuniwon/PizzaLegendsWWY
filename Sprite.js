// 설명 : 캐릭터 스프라이트를 그리는 클래스
class Sprite {
  constructor(config) {

    // 이미지 셋업
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    // 그림자 셋업
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
    this.currentAnimation = config.currentAnimation || "idle-Down"; // 현재 애니메이션 상태 // 기본값은 멈춰있는 상태
    this.currentAnimationFrame = 0;

    // 애니메이션 속도
    this.animationFrameLimit = config.animationFrameLimit || 8;     // 정해준 값이 없다면 8프레임마다 애니메이션을 업데이트
    this.animationFrameProgress = this.animationFrameLimit;         // 애니메이션 프레임 진행

    // 게임 오브젝트 레퍼런스
    this.gameObject = config.gameObject || null;                    // 스프라이트가 속한 게임 오브젝트 // 없으면 null
  }

  get frame(){                                                      // 현재 애니메이션의 현재 프레임
    return this.animations[this.currentAnimation][this.currentAnimationFrame]; 
  }

  setAnimation(name){                                               // 애니메이션을 설정하는 함수
    if(this.currentAnimation !== name){                             // 현재 애니메이션이 설정하려는 애니메이션과 다르다면
      this.currentAnimation = name;                                 // 애니메이션을 설정 
      this.currentAnimationFrame = 0;                               // 애니메이션 프레임을 초기화
      this.animationFrameProgress = this.animationFrameLimit;       // 애니메이션 프레임 진행을 초기화
    }
  }

  updateAnimationProgress(){                                        // 애니메이션 프레임 진행을 업데이트하는 함수

    if(this.animationFrameProgress > 0){                            // 애니메이션 프레임 진행이 0보다 크다면
      this.animationFrameProgress -= 1;                             // 애니메이션 프레임 진행을 1 줄임 // 0이 되면 애니메이션 프레임이 업데이트됨
      return;                                                       // 함수를 종료                   
    }
    // 애니메이션 프레임 초기화
    this.animationFrameProgress = this.animationFrameLimit;         // 애니메이션 프레임 진행을 초기화
    this.currentAnimationFrame += 1;                                // 애니메이션 프레임을 1 증가

    if(this.frame === undefined){                                   // 현재 애니메이션의 현재 프레임이 없다면
      this.currentAnimationFrame = 0;                               // 애니메이션 프레임을 초기화
    }
  }
  // canvas에 스프라이트를 그리는 함수
  draw(ctx, cameraPerson) {
    // 카메라의 중심에 스프라이트를 그리기 위해 x, y좌표를 계산
    const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;                                // 스프라이트의 중심을 기준으로 그리기 위해 x좌표를 8만큼 빼줌
    const y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y;                                  // 스프라이트의 중심을 기준으로 그리기 위해 y좌표를 18만큼 빼줌
    this.isShadowLoaded && ctx.drawImage(                           // 그림자를 그림
      this.shadow,                                                  // 그림자 이미지
      x, //x position
      y, //y position
    );

    const [frameX, frameY] = this.frame;                            // 현재 애니메이션의 현재 프레임을 가져와서 이미지의 x, y좌표로 사용

    this.isLoaded && ctx.drawImage(this.image,                      // 스프라이트를 그림
      frameX * 32, frameY * 32,                                     //x, y of sprite sheet
      32, 32,                                                       // width, height of sprite sheet
      x, y,                                                         // x, y of canvas
      32, 32                                                        // width, height of canvas
    );
    this.updateAnimationProgress();                                 // 애니메이션 프레임 진행을 업데이트
  }

}
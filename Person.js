// 게임에 등장하는 캐릭터를 정의하는 클래스
// 캐릭터는 GameObject를 상속받음
// 캐릭터는 플레이어가 조작하는 캐릭터인지 아닌지를 확인해서
// 방향에 따라서 멈춰있거나 움직이는 애니메이션을 보여줌

class Person extends GameObject {
  constructor(config) {
    super(config);
    // this.name = config.name;
    this.movingProgressRemaining = 0; // 16px 움직여야 멈춤 // 16px은 1타일의 크기
    this.isStanding = false; // 서있는 상태인지 아닌지

    this.isPlayerControlled = config.isPlayerControlled || false; // 플레이어가 조작하는 캐릭터인지 아닌지
    // 캐릭터의 방향 ------------------------------------------
    this.directionUpdate = {
      "Down": ["y", 1],
      "Up": ["y", -1],
      "Left": ["x", -1],
      "Right": ["x", 1],
    }
  }
  // 방향 업데이트 함수 ------------------------------------------
  update(state) {
    if (this.movingProgressRemaining > 0) { // 만약 움직이는 중이라면
      this.updatePosition();
    } else {
      // 만약 움직이는 중이 아니라면
      if (!state.map.isCutScenePlaying && this.isPlayerControlled && state.arrow) { // 플레이어가 컨트롤 하는 캐릭터이면서 만약 움직이는 중이 아니고, 방향키가 눌렸다면
        this.startBehavior(state, { //다음 행동을 시작함
          type: "walk",
          direction: state.arrow,
        });
      }
      this.updateSprite(state);
    };
  }
  // 방향 업데이트 함수 끝 ------------------------------------------

  // 행동을 시작하는 함수 ------------------------------------------
  startBehavior(state, behavior) {
    this.direction = behavior.direction; // 방향을 바꿈
    if (behavior.type === "walk") {
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) { // 만약 이동하려는 곳에 장애물이 있다면

        behavior.retry && setTimeout(() => { // 장애물이 있을 때 재시도를 할 수 있도록 함
          this.startBehavior(state, behavior);
        }, 10);
        return; // 함수를 종료
      }
      state.map.moveWall(this.x, this.y, this.direction); // 장애물을 이동시킴 //플레이어가 장애물의 위치임
      this.movingProgressRemaining = 16; // 움직임을 시작함
      this.updateSprite(state);
    }

    if (behavior.type === "stand") {
      this.isStanding = true;
      setTimeout(() => {
        utils.emitEvent("PersonStandComplete", {
          whoId: this.id,
        });
        this.isStanding = false;
      }, behavior.time);
    }
  };
  //행동 시작함수 끝 ------------------------------------------

  // 움직임을 지정한 픽셀만큼 업데이트하는 함수 ------------------------------------------
  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction]; // 방향에 따라서 x, y 중 어떤 것을 바꿀지 결정
    this[property] += change; // x나 y를 바꿈
    this.movingProgressRemaining -= 1; // 움직인 거리를 1px 줄임

    if (this.movingProgressRemaining === 0) { // 만약 움직임이 끝났다면
      // 걷기를 끝내고 멈춤
      utils.emitEvent("PersonWalkingComplete", {
        whoId: this.id,
      });
    }
  }
  // 움직임을 지정한 픽셀만큼 업데이트하는 함수 끝 ------------------------------------------

  // 방향과 움직임 여부에 따라 멈춰있는 것(idle)을 표현하거나 움직이는 것(walk)을 표현함 ------------------------------------------
  updateSprite(state) {
    if (this.movingProgressRemaining > 0) { // 만약 움직이는 중이라면
      this.sprite.setAnimation("walk-" + this.direction); // 방향에 따라서 애니메이션을 결정
      return;
    }
    this.sprite.setAnimation("idle-" + this.direction); // 방향에 따라서 애니메이션을 결정
  }
  // 끝 ------------------------------------------

}
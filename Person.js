// 게임에 등장하는 캐릭터를 정의하는 클래스
// 캐릭터는 GameObject를 상속받음
// 캐릭터는 플레이어가 조작하는 캐릭터인지 아닌지를 확인해서
// 방향에 따라서 멈춰있거나 움직이는 애니메이션을 보여줌

class Person extends GameObject{
  constructor(config){
    super(config);
    // this.name = config.name;
    this.movingProgressRemaining = 16; // 16px 움직여야 멈춤 // 16px은 1타일의 크기

    this.isPlayerControlled = config.isPlayerControlled || false; // 플레이어가 조작하는 캐릭터인지 아닌지
    // 캐릭터의 방향 ------------------------------------------
    this.directionUpdate = {
      "Down" : ["y" , 1],
      "Up" : ["y" , -1],
      "Left" : ["x" , -1],
      "Right" : ["x" , 1],
    }
  }
  // 방향 업데이트 함수 ------------------------------------------
  update(state){
    this.updatePosition();
    this.updateSprite(state);
    if(this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow){ // 만약 움직이는 중이 아니고, 방향키가 눌렸다면
      //
      this.direction = state.arrow; // 방향을 바꿈
      this.movingProgressRemaining = 16; // 움직임을 시작함
    }
  }

  // 움직임을 지정한 픽셀만큼 업데이트하는 함수 ------------------------------------------
  updatePosition(){
    if(this.movingProgressRemaining > 0 ){ // 만약 움직이는 중이라면
      const [property, change] = this.directionUpdate[this.direction]; // 방향에 따라서 x, y 중 어떤 것을 바꿀지 결정
      this[property] += change; // x나 y를 바꿈
      this.movingProgressRemaining -= 1; // 움직인 거리를 1px 줄임
    }
  }

  // 방향과 움직임 여부에 따라 멈춰있는 것(idle)을 표현하거나 움직이는 것(walk)을 표현함 ------------------------------------------
  updateSprite(state){
    if(this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow){ // 만약 움직이는 중이 아니고, 방향키가 눌리지 않았다면
    this.sprite.setAnimation("idle-"+this.direction); // 방향에 따라서 애니메이션을 결정
    return;
    }
    if(this.movingProgressRemaining > 0){ // 만약 움직이는 중이라면
      this.sprite.setAnimation("walk-"+this.direction); // 방향에 따라서 애니메이션을 결정
    }
  }

}
class Person extends GameObject{
  constructor(config){
    super(config);
    // this.name = config.name;
    this.movingProgressRemaining = 16; // 16px 움직여야 멈춤

    
    this.directionUpdate = {
      "down" : ["y" , 1],
      "up" : ["y" , -1],
      "left" : ["x" , -1],
      "right" : ["x" , 1],
    }
  }

  update(){
    this.updatePosition();
  }

  updatePosition(){
    if(this.movingProgressRemaining > 0 ){ // 만약 움직이는 중이라면
      const [property, change] = this.directionUpdate[this.direction]; // 방향에 따라서 x, y 중 어떤 것을 바꿀지 결정
      this[property] += change; // x나 y를 바꿈
      this.movingProgressRemaining -= 1; // 움직인 거리를 1px 줄임
    }
  }

}
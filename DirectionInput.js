class DirectionInput{
  constructor(){
   this.heldDirections = []; 

   this.map = {
    "w" : "Up",
    "a" : "Left",
    "s" : "Down",
    "d" : "Right",
   }
  }

  get direction(){
    return this.heldDirections[0]; //배열의 첫번째 요소를 반환
  };

  init(){

    document.addEventListener("keydown", (e) => { //키를 누르면
      // console.log(e.key);
      const dir = this.map[e.key]; //누른 키에 따라서 방향을 결정
      if(dir && this.heldDirections.indexOf(dir) === -1){ // 방향이 존재하고, 방향이 이미 눌려있지 않다면
        this.heldDirections.unshift(dir); // 방향을 배열의 맨 앞에 추가
        console.log(this.heldDirections);
      }
    });
    document.addEventListener("keyup", (e) => { //키를 뗐을 때
      const dir = this.map[e.key]; //누른 키에 따라서 방향을 결정
      const index = this.heldDirections.indexOf(dir); // 방향이 배열에 존재하는지 확인
      if(index > -1){ // 방향이 존재한다면
        this.heldDirections.splice(index, 1); // 배열에서 방향을 제거
        console.log(this.heldDirections);
      }
    });

  }
}

// 설명 : 키보드 입력을 받아서 방향을 결정하는 클래스
class DirectionInput{
  constructor(){
   this.heldDirections = []; 
   this.map = { // 키보드 입력에 따라서 방향을 결정
    "w" : "Up",
    "ArrowUp" : "Up",
    "a" : "Left",
    "ArrowLeft" : "Left",
    "s" : "Down",
    "ArrowDown" : "Down",
    "d" : "Right",
    "ArrowRight" : "Right",
   }
  }

  get direction(){
    return this.heldDirections[0]; //항상 배열의 첫번째 요소를 반환 // 첫번째 요소는 가장 마지막에 누른 키가 된다.
  };
  // 다른 파일에서 이 클래스를 사용할 때, 이 클래스의 init 함수를 호출하면 키보드 입력을 받을 수 있게 된다.
  init(){
    document.addEventListener("keydown", (e) => {                     // 키를 누르면
      const dir = this.map[e.key];                                    // 누른 키에 따라서 방향을 결정
      if(dir && this.heldDirections.indexOf(dir) === -1){             // 결정된 방향이 존재하고, 배열에 그 방향이 존재하지 않는다면
        this.heldDirections.unshift(dir);                             // 방향을 배열의 맨 앞에 추가
        // console.log(this.heldDirections);                          // 배열의 상태를 출력  
      }
    });
    document.addEventListener("keyup", (e) => {                       // 키를 뗐을 때
      const dir = this.map[e.key];                                    // 누른 키에 따라서 방향을 결정
      const index = this.heldDirections.indexOf(dir);                 // 해당 방향이 배열에 존재하는지 확인
      if(index > -1){                                                 // 방향이 존재한다면
        this.heldDirections.splice(index, 1);                         // 배열에서 방향을 제거
        // console.log(this.heldDirections);
      }
    });

  }
}
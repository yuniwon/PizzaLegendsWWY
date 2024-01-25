// 설명 : 유틸리티 함수들을 모아놓은 파일입니다.
const utils = { // 유틸리티 함수들을 모아놓은 객체
  withGrid(n){ // 숫자를 받아서 맵의 그리드 단위로 변환
   return n * 16; 
  },
  asGridCords(x, y){ // x, y좌표를 받아서 맵의 그리드 단위로 변환
    return `${x*16},${y*16}`;
  },
  nextPosition(initialX, initialY, direction){ // 현재 위치와 방향을 받아서 다음 위치를 계산
    let x = initialX;
    let y = initialY;
    const size = 16;
    if(direction === "Up"){
      y -= size;
    }
    if(direction === "Down"){
      y += size;
    }
    if(direction === "Left"){
      x -= size;
    }
    if(direction === "Right"){
      x += size;
    }
    return [x, y];
  }
}
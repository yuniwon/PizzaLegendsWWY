// 설명 : 게임에 등장하는 모든 객체의 최상위 객체
class GameObject {
  constructor(config) { // config는 객체를 생성할 때 넘겨주는 정보
    this.isMounted = false;
    this.x = config.x || 0; // x좌표
    this.y = config.y || 0; // y좌표
    this.direction = config.direction || "Down"; // 방향
    this.sprite = new Sprite({ // 스프라이트 생성
      gameObject: this, // 스프라이트가 속한 게임 오브젝트
      src: config.src || "/images/characters/people/hero.png", // 스프라이트 이미지 // config.src가 없으면 기본값으로 설정
    });
  }
  mount(map){
    console.log("mount");
    this.isMounted = true;
    map.addwall(this.x,this.y);
  }  
  
  update() { // 게임 루프에서 호출되는 함수
  }
}
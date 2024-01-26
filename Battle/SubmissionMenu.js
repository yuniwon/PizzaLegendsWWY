
// 설명 : 전투 중에 사용자가 스킬을 사용하거나 아이템을 사용할 수 있는 메뉴를 표시한다.
// 적 플레이어도 스킬을 사용할 수 있지만, 화면에 표시되지는 않는다.

class SubmissionMenu{ 

  constructor({caster,enemy, onComplete}){
    this.caster = caster;
    this.enemy = enemy;
    this.onComplete = onComplete;
  }

  decide(){
    this.onComplete({
      action: Actions[ this.caster.actions[0] ],
      target: this.enemy,
    })
  }

  init(container){
    this.decide();
  }
}
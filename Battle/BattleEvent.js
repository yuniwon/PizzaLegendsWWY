class BattleEvent {

  constructor(event, battle) {
    this.event = event;
    this.battle = battle;
  }

  TextMessage(resolve) {

    const text = this.event.text
      .replace("{CASTER}", this.event.caster?.name)
      .replace("{TARGET}", this.event.target?.name)
      .replace("{ACTION}", this.event.action?.name)


    const message = new TextMessage({
      text,
      onComplete: () => {
        resolve();
      }
    })
    message.init(this.battle.element);

    // this.battle.onNewEvent({
    //   type: "TextMessage",
    //   text: this.event.text
    // });
    // resolve();
  }

  async stateChange(resolve) {
    const {
      caster,
      target,
      damage
    } = this.event;
    if (damage) {
      // 목표의 체력을 감소시킴
      target.update({
        hp: target.hp - damage,
      })
      //깜박임 효과
      target.pizzaElement.classList.add("battle-damage-blink");
    }

    // 잠시 기다림

    //깜빡임 멈춤

    await utils.wait(600);
    target.pizzaElement.classList.remove("battle-damage-blink");

    resolve();

  }

  submissionMenu(resolve) {
    const menu = new SubmissionMenu({
      caster: this.event.caster,
      enemy: this.event.enemy,
      onComplete: (submission) => {
        // 사용자가 스킬을 사용하거나 아이템을 사용하면 submissionMenu가 사라지고, 사용한 스킬이나 아이템을 반환한다.
        resolve(submission);
      }
    })
    menu.init(this.battle.element);
  }

  animation(resolve) {
    // console.log(this.event);
    const fn = BattleAnimations[this.event.animation];
    fn(this.event, resolve);
  }

  init(resolve) {
    this[this.event.type](resolve);
  }
}
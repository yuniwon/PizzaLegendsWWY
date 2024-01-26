
// 전투 턴을 관리하는 클래스

class TurnCycle{
  constructor({
    battle, onNewEvent
  }){
this.battle = battle;
this.onNewEvent = onNewEvent;
this.currenTeam = "player"; // 혹은 "enemy"
  }

  async turn() {
    const casterId = this.battle.activeCombatants[this.currenTeam];
    const caster = this.battle.combatants[casterId];
    const enemyId = this.battle.activeCombatants[this.currenTeam === "player" ? "enemy" : "player"];
    const enemy = this.battle.combatants[enemyId];
    const submission = await this.onNewEvent({
      type: "submissionMenu",
      caster,
      enemy,
    });
    const resultingEvent = submission.action.success;
    for(let i = 0; i < resultingEvent.length; i++){
      const event = {
        ...resultingEvent[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target,
      }
      await this.onNewEvent(event);
    }

    this.currenTeam = this.currenTeam === "player" ? "enemy" : "player";
    this.turn();
  }

  async init() {
    await this.onNewEvent({
      type: "TextMessage",
      text: "전투가 시작되었다!!"
    });

    //첫번째 턴을 시작함
    this.turn();
  }

}
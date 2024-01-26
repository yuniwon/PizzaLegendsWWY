
window.BattleAnimations = {
  async spin(event, onComplete){
    // console.log(event);
      const element = event.caster.pizzaElement;
      const animationClassName = event.caster.team === "player" ? "battle-spin-right" : "battle-spin-left";
      // console.log(animationClassName);  
      element.classList.add(animationClassName);

      // 애니메이션이 끝나면 애니메이션 클래스를 제거합니다.
      element.addEventListener("animationend", () => {
        element.classList.remove(animationClassName);
      }, {once: true})

      // 피자가 충돌할 때 바로 전투 주기를 계속합니다.

      await utils.wait(100);
      onComplete();
  }


};
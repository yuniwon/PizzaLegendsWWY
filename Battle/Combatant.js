class Combatant {
  constructor(config, battle) {
    Object.keys(config).forEach((key) => {
      this[key] = config[key];
    });
    this.battle = battle;
  };


  get hpPercent() { // 설명 : 캐릭터의 체력을 퍼센트로 반환하는 함수
    const percent = this.hp / this.maxHp * 100;
    return percent > 0 ? percent : 0;
  };
  get xpPercent() { // 설명 : 캐릭터의 체력을 퍼센트로 반환하는 함수
    return this.xp / this.maxXp * 100;
  };

  get isActive(){ // 설명 : 캐릭터가 활성화되어있는지 아닌지를 반환하는 함수
    return this.battle.activeCombatants[this.team] === this.id;
  }

  createElement() { // 설명 : 캐릭터의 DOM을 만드는 함수
    this.hudElement = document.createElement("div"); // 캐릭터의 DOM을 만듦
    this.hudElement.classList.add("Combatant");
    this.hudElement.setAttribute("data-combatant", this.id);
    this.hudElement.setAttribute("data-team", this.team);
    this.hudElement.innerHTML = (`
      <p class="Combatant_name">${this.name}</p>
      <p class="Combatant_level"></p>
      <div class="Combatant_character_crop">
        <img class="Combatant_character" alt="${this.name}" src="${this.src}" />
      </div>
      <img class="Combatant_type" src="${this.icon}" alt="${this.type}" />
      <svg viewBox="0 0 26 3" class="Combatant_life-container">
        <rect x=0 y=0 width="0%" height=1 fill="#82ff71" />
        <rect x=0 y=1 width="0%" height=2 fill="#3ef126" />
      </svg>
      <svg viewBox="0 0 26 2" class="Combatant_xp-container">
        <rect x=0 y=0 width="0%" height=1 fill="#ffd76a" />
        <rect x=0 y=1 width="0%" height=1 fill="#ffc934" />
      </svg>
      <p class="Combatant_status"></p>
    `);

    // 피자의 DOM을 만듦
    this.pizzaElement = document.createElement("img");
    this.pizzaElement.classList.add("Pizza");
    this.pizzaElement.setAttribute("src", this.src );
    this.pizzaElement.setAttribute("alt", this.name );
    this.pizzaElement.setAttribute("data-team", this.team );

    // HUD DOM을 만듦
    this.hpFills = this.hudElement.querySelectorAll(".Combatant_life-container > rect");
    this.xpFills = this.hudElement.querySelectorAll(".Combatant_xp-container > rect");

  };

  update(changes={}){ // 설명 : 캐릭터의 상태를 업데이트하는 함수
    // 바뀐것이 있으면 바뀐것만 업데이트함
    Object.keys(changes).forEach((key) => { // changes의 키를 순회하면서
      this[key] = changes[key]; // 캐릭터의 상태를 업데이트함
    });

    // 올바른 피자와 hud가 활성화되어있는지 아닌지를 업데이트함
    this.hudElement.setAttribute("data-active",this.isActive); // 캐릭터가 활성화되어있는지 아닌지를 업데이트함
    this.pizzaElement.setAttribute("data-active",this.isActive); // 피자가 활성화되어있는지 아닌지를 업데이트함

    this.hpFills.forEach(rect => rect.style.width = `${this.hpPercent}%`); // 캐릭터의 체력을 업데이트함
    this.xpFills.forEach(rect => rect.style.width = `${this.xpPercent}%`); // 캐릭터의 경험치를 업데이트함

    // 캐릭터의 상태를 업데이트함
    this.hudElement.querySelector(".Combatant_level").innerText = this.level;

  }

  init(container) { // 설명 : 캐릭터를 화면에 보이게 하는 함수
    this.createElement(); // 캐릭터의 DOM을 만듦
    container.appendChild(this.hudElement); // 캐릭터의 DOM을 화면에 보이게 함
    container.appendChild(this.pizzaElement); // 피자의 DOM을 화면에 보이게 함
    this.update();
  };
};
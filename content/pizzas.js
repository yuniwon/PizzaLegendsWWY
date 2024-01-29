window.PizzaTypes = {
  normal: "normal",
  spicy: "spicy",
  veggie: "veggie",
  fungi: "fungi",
  chill: "chill",
}

window.Pizzas = {
  "s001": {
    name: "사시미 검객",
    type: PizzaTypes.spicy,
    src: "./images/characters/pizzas/s001.png",
    icon: "/images/icons/spicy.png",
    actions: ["damage1"],
  },
  "v001": {
    name: "보리꼬리",
    type: PizzaTypes.veggie,
    src: "./images/characters/pizzas/v001.png",
    icon: "./images/icons/veggie.png",
    actions: ["damage1"],
  },
  "f001": {
    name: "넌 이미 중독",
    type: PizzaTypes.fungi,
    src: "./images/characters/pizzas/f001.png",
    icon: "./images/icons/fungi.png",
    actions: ["damage1"],
  }
}
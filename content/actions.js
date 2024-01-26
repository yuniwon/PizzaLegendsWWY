
window.Actions = {
  damage1: {
    name: "찌찌뽕!",
    success: [
      {type: "TextMessage", text: "{CASTER}(이)가 {ACTION}을 시전했다"},
      {type: "animation", animation: "spin"},
      {type: "stateChange", damage: 10},
    ]
  }
  
}
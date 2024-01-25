// 설명 : 게임 초기화 

(function () {

  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  });
  overworld.init();

})();
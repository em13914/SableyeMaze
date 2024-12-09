var victorytheme = new Audio("sounds/victorytheme.mp3");
window.onload = function () {
  victorytheme.play();
  victorytheme.volume = 0.3;
  victory();
  console.log("hi");
};
function triggerSpin() {
  $(".spin-image").css("transform", "rotateY(1080deg)");
}
function victory() {
  setTimeout(function () {
    $("#pokeBall").animate({ top: "250px" }, 5000);
    triggerSpin();
  }, 500);
}

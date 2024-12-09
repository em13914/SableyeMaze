const button = document.getElementById("lossButton");
var friendsong = new Audio("sounds/friendsong.mp3");
const messages = [
  "Nice try! You almost had it!",
  "Since I'm feeling generous...",
  "I'll give you one more chance.",
  "Try again?",
  ":)",
];
let clickCount = 0;

button.addEventListener("click", () => {
  if (clickCount < messages.length) {
    button.textContent = messages[clickCount];
    const scale = 1 - 0.2 * clickCount;
    button.style.transform = `scale(${scale}) translateY(${clickCount * 10}px)`;

    clickCount++;
  }

  if (clickCount === messages.length) {
    document.body.style.backgroundImage = "url(images/friend.jpg)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    button.style.display = "none";
    friendsong.volume = 0.15;
    friendsong.play();
    histheme.pause();
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2500);
  }
});
var histheme = new Audio("sounds/histheme.mp3");
window.onload = function () {
  histheme.play();
  histheme.volume = 0.5;
};

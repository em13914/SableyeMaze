var modal = document.getElementById("myModal");
var imgs = document.getElementById("myImage");
var modalImg = document.getElementById("modalImage");
var span = document.getElementsByClassName("close")[0];
var click = new Audio("audio/click.mp3");

imgs.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function showModal() {
  console.log("hi");
  document.getElementById("myModal").style.display = "block";
}

function changetext1() {
  click.play();
  document.getElementById("t1").classList.add("hidden");
  document.getElementById("t2").classList.remove("hidden");
}
function changetext2() {
  click.play();
  document.getElementById("t2").classList.add("hidden");
  document.getElementById("t3").classList.remove("hidden");
}
function changetext3() {
  click.play();
  document.getElementById("t3").classList.add("hidden");
  document.getElementById("t4").classList.remove("hidden");
}
function changetext4() {
  click.play();
  document.getElementById("t4").classList.add("hidden");
  document.getElementById("t5").classList.remove("hidden");
}
function changetext5() {
  click.play();
  document.getElementById("t5").classList.add("hidden");
  document.getElementById("t6").classList.remove("hidden");
}
function changetext6() {
  click.play();
  document.getElementById("t6").classList.add("hidden");
  document.getElementById("t7").classList.remove("hidden");
}
function changetext7() {
  click.play();
  document.getElementById("t7").classList.add("hidden");
  document.getElementById("t8").classList.remove("hidden");
}
function changetext8() {
  click.play();
  document.getElementById("t8").classList.add("hidden");
  document.getElementById("t9").classList.remove("hidden");
}
function changetext9() {
  click.play();
  document.getElementById("t9").classList.add("hidden");
  document.getElementById("t10").classList.remove("hidden");
}
function changetext10() {
  click.play();
  document.getElementById("t10").classList.add("hidden");
  document.getElementById("t11").classList.remove("hidden");
}
function changetext11() {
  click.play();
  document.getElementById("t11").classList.add("hidden");
  document.getElementById("t12").classList.remove("hidden");
}
function nextroom() {
  click.play();
  window.location.href = "index.html";
}

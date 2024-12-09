const mazeElement = document.querySelector(".maze");
const timerDisplay = document.getElementById("timer");
const modal = document.getElementById("modal");
const startButton = document.getElementById("startButton");
const itemsContainer = document.querySelector(".items");
var mazemusic = new Audio("sounds/mazesong.mp3");
var histheme = new Audio("sounds/histheme.mp3");

var levelup = new Audio("sounds/levelup.mp3");
// Add variables for door code system
let doorCode = "";
let notesCollected = 0;
const collectedSpecialTiles = new Set();
let doorAttempts = 0;
let timer = 50;
let visibleTime = 2;
let cycleInterval;
let lastPlayerTile = null;
items = [];

// Generate random door code
function generateDoorCode() {
  let code = "";
  for (let i = 0; i < 10; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  return code;
}
window.onload = function () {
  mazemusic.play();
  mazemusic.volume = 0.15;
};
const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 0, 0, 0, 1, 2, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [3, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
];

let playerPosition = { x: 1, y: 1 };

// Create the maze
function createMaze() {
  maze.forEach((row, y) => {
    row.forEach((tile, x) => {
      const div = document.createElement("div");
      div.classList.add("tile");
      if (tile === 1) {
        div.classList.add("wall");
      } else if (tile === 2) {
        div.classList.add("special");
      } else if (tile === 3) {
        div.classList.add("lock");
      } else {
        div.classList.add("walkable");
      }
      div.dataset.originalColor = getComputedStyle(div).backgroundColor;
      mazeElement.appendChild(div);
    });
  });
}

// Create a notes display div
function createNotesDisplay() {
  const notesDiv = document.createElement("div");
  notesDiv.id = "notesDisplay";
  notesDiv.style.position = "absolute";
  notesDiv.style.color = "black";
  notesDiv.style.fontSize = "48px";
  notesDiv.style.fontFamily = "Garamond, sans-serif";
  notesDiv.style.padding = "20px";
  itemsContainer.appendChild(notesDiv);
  notesDiv.style.transform = "translateY(-130px)";
}

function updateNotesDisplay() {
  const notesDiv = document.getElementById("notesDisplay");
  let notesText = "";
  for (let i = 1; i <= notesCollected; i++) {
    const startIdx = (i - 1) * 2;
    const digits = doorCode.substring(startIdx, startIdx + 2);
    notesText += `Note ${i}: ${digits}\n`;
  }
  notesDiv.innerHTML = notesText.replace(/\n/g, "<br>");
}

// Get tile element at specific coordinates
function getTileAt(x, y) {
  return document.querySelector(`.tile:nth-child(${y * 25 + x + 1})`);
}

// Move the player
function movePlayer(direction) {
  const newX = playerPosition.x + direction.x;
  const newY = playerPosition.y + direction.y;

  if (maze[newY] && maze[newY][newX] !== undefined && maze[newY][newX] !== 1) {
    if (lastPlayerTile) {
      lastPlayerTile.classList.remove("player-tile");
      lastPlayerTile.style.backgroundColor =
        lastPlayerTile.dataset.originalColor;
    }

    playerPosition = { x: newX, y: newY };
    renderPlayer();

    if (maze[newY][newX] === 2) {
      specialTileAction();
    } else if (maze[newY][newX] === 3) {
      doorTileAction();
    }
  }
}

// Render the player
function renderPlayer() {
  const currentTile = getTileAt(playerPosition.x, playerPosition.y);

  if (lastPlayerTile && lastPlayerTile !== currentTile) {
    lastPlayerTile.classList.remove("player-tile");
    lastPlayerTile.style.backgroundColor = lastPlayerTile.dataset.originalColor;
  }

  currentTile.classList.add("player-tile");
  currentTile.style.backgroundColor = "#31ff2e";
  lastPlayerTile = currentTile;
}

function specialTileAction() {
  const tileKey = `${playerPosition.x},${playerPosition.y}`;

  if (!collectedSpecialTiles.has(tileKey)) {
    collectedSpecialTiles.add(tileKey);
    notesCollected++;

    const startIdx = (notesCollected - 1) * 2;
    const digits = doorCode.substring(startIdx, startIdx + 2);
    levelup.volume = 0.3;
    levelup.play();

    updateNotesDisplay();

    if (notesCollected === 5) {
      alert(
        "You've found all the notes! Now find the door and enter the complete code!"
      );
    }
  }
}

function doorTileAction() {
  if (doorAttempts >= 2) {
    alert("Too many incorrect attempts! Game Over!");
    window.location.href = "loss.html";
    return;
  }

  const userCode = prompt("Enter the 10-digit door code:");

  if (userCode === doorCode) {
    alert("Correct code! You've escaped!");
    window.location.href = "win.html";
  } else {
    doorAttempts++;
    if (doorAttempts < 2) {
      alert("Incorrect code! You have one more attempt!");
    } else {
      alert("Incorrect code! Game Over!");
      window.location.href = "loss.html";
    }
  }
}

function startTimer() {
  const interval = setInterval(() => {
    timer--;
    timerDisplay.textContent = timer;

    if (timer <= 0) {
      clearInterval(interval);
      window.location.href = "loss.html";
    }
  }, 1000);
}

function cycleVisibility() {
  const imageElement = document.querySelector(
    ".center-content.light.black img"
  );
  cycleInterval = setInterval(() => {
    const tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile) => {
      if (!tile.classList.contains("player-tile")) {
        tile.style.backgroundColor = "black";
      }
    });
    imageElement.src = "images/red.webp";

    setTimeout(() => {
      tiles.forEach((tile) => {
        if (!tile.classList.contains("player-tile")) {
          tile.style.backgroundColor = tile.dataset.originalColor;
        }
      });
      imageElement.src = "images/green.webp";
    }, visibleTime * 1000);
  }, (visibleTime + 2) * 1000);
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
    case "ArrowUp":
      movePlayer({ x: 0, y: -1 });
      break;
    case "s":
    case "ArrowDown":
      movePlayer({ x: 0, y: 1 });
      break;
    case "a":
    case "ArrowLeft":
      movePlayer({ x: -1, y: 0 });
      break;
    case "d":
    case "ArrowRight":
      movePlayer({ x: 1, y: 0 });
      break;
  }
});

createMaze();
renderPlayer();
doorCode = generateDoorCode();
startTimer();
renderPlayer();
cycleVisibility();
createNotesDisplay();

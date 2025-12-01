const createGridButton = document.getElementById("submitButton");
const grid = document.getElementById("grid");
const size = document.getElementById("size");

createGridButton.addEventListener("click", () => {
  createNewGrid();
});

size.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createNewGrid();
  }
});

function createNewGrid() {
  const gridSize = size.value;
  size.value = "";
  console.log(gridSize);
  if (gridSize == null || gridSize == undefined || gridSize == "") {
    alert("Digite um valor válido");
  } else if (gridSize <= 1 || gridSize > 100) {
    alert("Digite um valor entre 2 e 100");
  } else {
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
    createGrid(gridSize);
  }
}

function createTile(id, size) {
  const dimension = 600 / size;
  console.log(dimension);
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.id = id;
  tile.style.height = `${dimension}px`;
  tile.style.width = `${dimension}px`;
  return tile;
}

function createGrid(size) {
  for (let i = 1; i <= size; i++) {
    const row = document.createElement("div");
    row.id = i;
    for (let n = 1; n <= size; n++) {
      const newTile = createTile(i * n, size);
      newTile.addEventListener("mouseover", () => {
        if (!newTile.classList.contains("marked")) {
          const rgb = getRandomColor();
          newTile.style.backgroundColor = rgb;
          newTile.style.borderColor = rgb;
          newTile.style.opacity = 0.5;
          newTile.classList.add("marked");
        } else {
          newTile.style.opacity = parseFloat(newTile.style.opacity) + 0.3;
        }
      });
      row.appendChild(newTile);
    }
    grid.appendChild(row);
  }
}

function getRandomColor() {
  const r = parseInt(Math.random() * 255);
  const g = parseInt(Math.random() * 255);
  const b = parseInt(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

createGrid(16);

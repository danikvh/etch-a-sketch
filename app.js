const DEFAULT_SIZE = 16;

const grid = document.querySelector("#grid");
const sizeButton = document.querySelector("#size");

let size = DEFAULT_SIZE;


sizeButton.addEventListener('click', enterSize);

function createGrid(size) {
    grid.style.gridTemplateColumns = "repeat(${size}, 1fr)";
    grid.style.gridTemplateRows = "repeat(${size}, 1fr)";

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add("grid-element");
        gridElement.addEventListener('mouseover', changeColor);
        grid.appendChild(gridElement);
    }
}

function changeColor(e) {
    e.target.style.backgroundColor = "black";
}

function enterSize() {
    size = prompt("Enter a size");
    while (size < 1 || size > 100) {
        size = prompt("Enter a value between 1 and 100");
    }
    createGrid(size);
}


createGrid(size);
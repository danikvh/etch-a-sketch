const DEFAULT_SIZE = 16;
const DEFAULT_MODE = "color";
const DEFAULT_COLOR = "black";

const grid = document.querySelector("#grid");
const sizeButton = document.querySelector("#size");
const colorButton = document.querySelector("#color");
const shadeButton = document.querySelector("#shade");
const rainbowButton = document.querySelector("#rainbow");

let size = DEFAULT_SIZE;
let mode = DEFAULT_MODE;
let color = DEFAULT_COLOR;

//Listeners
sizeButton.addEventListener('click', enterSize);

colorButton.addEventListener('click', changeMode);
shadeButton.addEventListener('click', changeMode);
rainbowButton.addEventListener('click', changeMode);


//Functions
function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add("grid-element");
        gridElement.addEventListener('mouseover', changeColor);
        grid.appendChild(gridElement);
    }
}

function clearGrid() {
    grid.innerHTML = "";
}

function enterSize() {
    size = prompt("Enter a size");
    while (size < 1 || size > 100) {
        size = prompt("Enter a value between 1 and 100");
    }
    clearGrid();
    createGrid(size);
}

function changeColor(e) {
    if (mode === "color") {
        e.target.style.backgroundColor = color;
    } else if (mode === "shade") {
        let current = e.target.style.backgroundColor;
        if (current === "") {
            current = "rgb(230,230,230)";
            e.target.style.backgroundColor = current;
        } else {
            console.log(current.length);
            let r = current.substring(4,7);
            let g = current.substring(8,12);
            let b = current.substring(13,17);
            if (current.length != 18) {
                r = current.substring(4,6);
                g = current.substring(7,10);
                b = current.substring(11,14);
            }
            if (r > 0) {
                e.target.style.backgroundColor = "rgb(" + (r - 25) +
                    "," + (g - 25) + "," + (b - 25) + ")";
            }
        }
    } else if (mode === "rainbow") {
        let R = Math.floor(Math.random()*255);
        let G = Math.floor(Math.random()*255);
        let B = Math.floor(Math.random()*255);
        e.target.style.backgroundColor = `rgb(${R},${G},${B})`;
    }
}

function changeMode(e) {
    mode = e.target.getAttribute("id");
    clearGrid();
    createGrid(size);
}


createGrid(size);
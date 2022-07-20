const DEFAULT_SIZE = 16;
const DEFAULT_MODE = "color";
const DEFAULT_COLOR = "black";

const grid = document.querySelector("#grid");
//const sizeButton = document.querySelector("#size");
const colorButton = document.querySelector("#color");
const shadeButton = document.querySelector("#shade");
const rainbowButton = document.querySelector("#rainbow");
const eraserButton = document.querySelector("#eraser");
const clearButton = document.querySelector("#clear");
const slider = document.querySelector("#myRange");
const gridSize = document.querySelector("#grid-size");

let size = DEFAULT_SIZE;
let mode = DEFAULT_MODE;
let color = DEFAULT_COLOR;

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


//Listeners
colorButton.addEventListener('click', changeMode);
shadeButton.addEventListener('click', changeMode);
rainbowButton.addEventListener('click', changeMode);
eraserButton.addEventListener('click', changeMode);
clearButton.addEventListener('click', clearGrid);
slider.addEventListener('change', enterSize);


//Functions
function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add("grid-element");
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        grid.appendChild(gridElement);
    }
}

function clearGrid() {
    grid.innerHTML = "";
    createGrid(size)
}

 function enterSize() {
    size = slider.value;
    gridSize.textContent = `${size} x ${size}`;
    clearGrid();
} 

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) { return; }
    if (mode === "color") { //Mode: Color
        e.target.style.backgroundColor = color;
    } else if (mode === "shade") { //Mode: Shade
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
    } else if (mode === "rainbow") { //Mode: Rainbow
        let R = Math.floor(Math.random()*256);
        let G = Math.floor(Math.random()*256);
        let B = Math.floor(Math.random()*256);
        e.target.style.backgroundColor = `rgb(${R},${G},${B})`;
    } else if (mode === "eraser") { //Mode: eraser
        e.target.style.backgroundColor = "white";
    }
}

function changeMode(e) {
    activateButton(e.target.getAttribute("id"));
    mode = e.target.getAttribute("id");
}

function activateButton(e) {
    if (mode === 'rainbow') {
        rainbowButton.classList.remove("activated");
    } else if (mode === 'color') {
        colorButton.classList.remove("activated");
    } else if (mode === 'shade') {
        shadeButton.classList.remove("activated");
    } else if (mode === 'eraser') {
        eraserButton.classList.remove("activated");
    }

    if (e === 'rainbow') {
        rainbowButton.classList.add("activated");
    } else if (e === 'color') {
        colorButton.classList.add("activated");
    } else if (e === 'shade') {
        shadeButton.classList.add("activated");
    } else if (e === 'eraser') {
        eraserButton.classList.add("activated");
    }
}


window.onload = () => {
    createGrid(size);
    activateButton(mode);
  }
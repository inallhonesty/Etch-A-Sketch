let gridSize = -1
let exitCondition = false
let altKeyPressed = false;
let timesPassed = 0;


const bodyRef = document.body
const scriptRef = document.querySelector('script')

const divContainer = document.createElement('div')
bodyRef.insertBefore(divContainer,scriptRef)
divContainer.setAttribute('id','container')

const btn = document.createElement('buton')
bodyRef.insertBefore(btn,divContainer)
btn.setAttribute('id','reset-button')
btn.textContent = "Reset Grid"
btn.addEventListener('click', resetGrid)


function getSize() {
    while (!exitCondition) {
        gridSize = Number(prompt("Please provide a number between 1 and 100"))
        
        if (gridSize >= 1 && gridSize < 100) {
            exitCondition = true;
        }
    }
    return gridSize;
}


function createBoxes(gridSize) {
    let divBoxes = ''
    let boxWidth = Math.round(964 / gridSize,2).toString()

    for (let i = 0; i < gridSize; i++){
        divBoxes += `<div class="box" style= "width: ${boxWidth}px; height: ${boxWidth}px;"></div>`
    }

    for (let j = 0; j < gridSize; j++){
        let divLine = document.createElement('div')
        divLine.setAttribute('class', 'line')
        divContainer.appendChild(divLine)
        divLine.innerHTML = divBoxes
    }
}


function generateRandomColor() {
    const blackCorrectionFactor = 5.5;
    let r = Math.max(Math.floor(Math.random()*255) - blackCorrectionFactor * timesPassed, 0);
    let g = Math.max(Math.floor(Math.random()*255) - blackCorrectionFactor * timesPassed, 0);
    let b = Math.max(Math.floor(Math.random()*255) - blackCorrectionFactor * timesPassed, 0);
    timesPassed++
    return `rgb(${r},${g},${b})`
}


function destroyBoxes(){
    const lines = document.getElementsByClassName("line")
    while (lines.length > 0 ){
        lines[0].parentNode.removeChild(lines[0])
    }
}

function addEventListeners(){
    document.addEventListener("keydown", function(event) {
        if (event.key === "Alt") {
            altKeyPressed = true;
        }
    });
    document.addEventListener("keyup", function(event) {
        if (event.key === "Alt") {
            altKeyPressed = false;
        }
    });

    const boxes = document.getElementsByClassName("box");

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("mouseover", function(event) {
            if (altKeyPressed) {
                console.log(1)
                event.target.style.backgroundColor = `${generateRandomColor()}`
            } else {
                timesPassed = 0;
            }
        });
    }
}

function resetGrid() {
    exitCondition = false;
    gridSize = getSize()
    destroyBoxes()
    createBoxes(gridSize)
    addEventListeners()

}

gridSize = getSize()
console.log(gridSize)
createBoxes(gridSize)
addEventListeners()
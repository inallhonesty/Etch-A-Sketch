let gridSize = -1
let exitCondition = false
let altKeyPressed = false;
let timesPassed = 0;
let colorChosen = false;
const availableColors = ["rgb(255,0,0)", "rgb(0,255,0)", "rgb(0,0,255)", "rgb(255,255,0)"]

let bgColor = 'rgb(255,255,255)'

const bodyRef = document.body
const scriptRef = document.querySelector('#js')

const divContainer = document.createElement('div')
bodyRef.insertBefore(divContainer,scriptRef)
divContainer.setAttribute('id','container')

const btn = document.querySelector('#reset-button')
btn.addEventListener('click', resetGrid)

const scrShot = document.querySelector('#screenshot-button')

scrShot.addEventListener('click', function() {
    html2canvas(document.querySelector("#container")).then(canvas => {
        let link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = "screenshot.png";
        link.click();
    });
  });

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
        divBoxes += `<div class="box" style= "width: ${boxWidth}px; height: ${boxWidth}px; background-color: white;"></div>`
    }

    for (let j = 0; j < gridSize; j++){
        let divLine = document.createElement('div')
        divLine.setAttribute('class', 'line')
        divContainer.appendChild(divLine)
        divLine.innerHTML = divBoxes
    }
}


function generateColor(colorChosen) {
    if (colorChosen == false) {
        const blackCorrectionFactor = 5.5;
        let r = Math.max(Math.floor(Math.random()*255) - blackCorrectionFactor * timesPassed, 0);
        let g = Math.max(Math.floor(Math.random()*255) - blackCorrectionFactor * timesPassed, 0);
        let b = Math.max(Math.floor(Math.random()*255) - blackCorrectionFactor * timesPassed, 0);
        timesPassed++
        return `rgb(${r},${g},${b})`
    } else {
        return bgColor
    }

}


function destroyBoxes(){
    const lines = document.getElementsByClassName("line")
    while (lines.length > 0 ){
        lines[0].parentNode.removeChild(lines[0])
    }
}

function addEventListeners(){

    
    const colorButtons = document.getElementsByClassName("color-buttons");
    for (let i = 0; i < colorButtons.length - 1; i++) {
        colorButtons[i].addEventListener("click", function(event) {
            bgColor = availableColors[i]
            colorChosen = true;
        })
    }
    const randColorButton = document.getElementById("random")
    randColorButton.addEventListener("click", function(event) {
        bgColor = generateColor()
        colorChosen = false;
    })
    

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
                event.target.style.backgroundColor = generateColor(colorChosen)
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
createBoxes(gridSize)
addEventListeners()
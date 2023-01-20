const gridSize = 48;

const bodyRef = document.body
const scriptRef = document.querySelector('script')

const divContainer = document.createElement('div')
bodyRef.insertBefore(divContainer,scriptRef)
divContainer.setAttribute('id','container')

let divBoxes = ''
for (let i = 0; i < gridSize; i++){
    divBoxes += '<div class="box"></div>'
}

for (let j = 0; j < gridSize; j++){
    let divLine = document.createElement('div')
    divLine.setAttribute('class', 'line')
    divContainer.appendChild(divLine)
    divLine.innerHTML = divBoxes
}

let altKeyPressed = false;

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
    boxes[i].addEventListener("mousemove", function(event) {
        if (altKeyPressed) {
            event.target.classList.add('box-hov');
        }
    });
}
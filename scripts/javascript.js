const gridContainer = document.querySelector('#etch-a-sketch-container');
const gridItems = document.querySelectorAll('.grid-item');
const wheel = document.getElementById('color-wheel');
const currentColor = document.getElementById('selected-color-display');

const clearButton = document.querySelector('#clear');
const gridLineButton = document.querySelector('#grid-lines');

const gridSizeSector = document.getElementById('grid-size-selector');

let size = 16;
let pxSize = 0;
let colorPicked = 'white';
currentColor.style.backgroundColor = colorPicked;





// Variable to track if mouse is pressed
let isMouseDown = false;

// Add event listeners to track mouse state
document.addEventListener('mousedown', () => isMouseDown = true);
document.addEventListener('mouseup', () => isMouseDown = false);

// Button listeners
clearButton.addEventListener('click', () => {
    ClearGrid();
});

gridLineButton.addEventListener('click', () => {
    GridLineUpdate();
})

// Drop downs
gridSizeSector.addEventListener('change', function() {
    const selectedOption = this.value;

    ChangeGridSize(selectedOption);
})

function BuildGrid(size) {
    // Update grid CSS
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    let gridPxSize = size**2;
    for (let i = 0; i < gridPxSize; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        
        // Add event listeners
        gridItem.addEventListener('mousedown', changeColor);
        gridItem.addEventListener('mouseover', changeColor);
        
        gridContainer.appendChild(gridItem);
        // Update grid lines
        gridItem.style.border = `solid white ${pxSize}px`;
    }

}

function ClearGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
        gridContainer.removeChild(gridItem);
    });
    BuildGrid(size);
}

function ChangeGridSize(option) {
    switch(option) {
        case '8':
            size = 8;
            break;
        case '16':
            size = 16;
            break;
        case '32':
            size = 32;
            break;
        case '64':
            size = 65;
            break;
        }
        

        ClearGrid();
    }

function GridLineUpdate() {
    if (pxSize === 1) {
        pxSize = 0;
    }
    else {
        pxSize = 1;
    }
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
        gridItem.style.border = `solid white ${pxSize}px`;
    });
}

function changeColor(selectedPx) {
    // Change color only if mouse is pressed
    if (selectedPx.type === 'mouseover' && !selectedPx.buttons) return;
    
    // Change the background color
    selectedPx.target.style.backgroundColor = colorPicked; // or any color you prefer
}

function createColorWheel() {
    const wheel = document.getElementById('color-wheel');
    const segments = 12; // Number of color segments
    const segmentAngle = 360 / segments;
  
    for (let i = 0; i < segments; i++) {
      const segment = document.createElement('div');
      segment.className = 'color-segment';
      
      const hue = i * segmentAngle;
      segment.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
      segment.style.transform = `rotate(${i * segmentAngle}deg) skew(${90 - segmentAngle}deg)`;
      
      wheel.appendChild(segment);
    }

    // Add event listener here
    wheel.addEventListener('click', (e) => {
        if (e.target.classList.contains('color-segment')) {
          const color = e.target.style.backgroundColor;
          colorPicked = color;
          console.log('Selected color:', color);
          
          currentColor.style.backgroundColor = color;
        }
    });
}

createColorWheel();
BuildGrid(size);

// Variables for shapes, rulers, and badge
let activeShape = null;
let startX, startY;

// Function to create a shape element and add it to the canvas
function createShape(shapeType) {
  const canvas = document.getElementById('canvas');

  // Create a new div with borders and position set to absolute
  const shapeElement = document.createElement('div');
  shapeElement.classList.add('shape'); // Add 'shape' class for styling
  shapeElement.style.border = '1px solid black';
  shapeElement.style.position = 'absolute';

  // Set the shape element's dimensions based on the type
  if (shapeType === 'rectangle') {
    shapeElement.style.width = '100px';
    shapeElement.style.height = '100px';
  } else if (shapeType === 'circle') {
    shapeElement.style.width = '50px';
    shapeElement.style.height = '50px';
    shapeElement.style.borderRadius = '50%';
  } else if (shapeType === 'text') {
    shapeElement.innerText = 'Text';
    shapeElement.style.width = '200px';
    shapeElement.style.height = '30px';
    shapeElement.style.textAlign = 'center';
    shapeElement.style.lineHeight = '30px';
  }

  // Add the shape element to the canvas
  canvas.appendChild(shapeElement);

  // Set the active shape and event listeners for drag-and-drop
  activeShape = shapeElement;
  shapeElement.addEventListener('mousedown', (e) => {
    startX = e.clientX - activeShape.offsetLeft;
    startY = e.clientY - activeShape.offsetTop;
  });
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  // Function to handle mouse movement
  function handleMouseMove(e) {
    if (activeShape) {
      activeShape.style.left = `${e.clientX - startX}px`;
      activeShape.style.top = `${e.clientY - startY}px`;
    }
  }

  // Function to handle mouse up event
  function handleMouseUp() {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    activeShape = null;
  }
}

// Function to create rulers and badge
function createRulersAndBadge() {
  // Create top ruler
  const topRuler = document.createElement('div');
  topRuler.style.position = 'absolute';
  topRuler.style.top = '0px';
  topRuler.style.left = '64px'; // Adjust based on sidebar width
  topRuler.style.width = 'calc(100vw - 64px)';
  topRuler.style.height = '2px';
  topRuler.style.borderBottom = '2px solid black';

  // Create left ruler
  const leftRuler = document.createElement('div');
  leftRuler.style.position = 'absolute';
  leftRuler.style.left = '0px';
  leftRuler.style.top = '64px'; // Adjust based on sidebar width
  leftRuler.style.height = 'calc(100vh - 64px)';
  leftRuler.style.width = '2px';
  leftRuler.style.borderRight = '2px solid black';

  // Create badge
  const badge = document.createElement('div');
  badge.classList.add('badge'); // Add 'badge' class for styling

  // Append rulers and badge to canvas
  const canvas = document.getElementById('canvas');
  canvas.appendChild(topRuler);
  canvas.appendChild(leftRuler);
  canvas.appendChild(badge);

  // Add event listener for mousemove to update ruler positions and badge dimensions
  canvas.addEventListener('mousemove', handleMouseMove);

  // Function to handle mouse move events for rulers and badge
  function handleMouseMove(e) {
    const mouseX = e.clientX - topRuler.offsetLeft;
    const mouseY = e.clientY - leftRuler.offsetTop;

    // Update top ruler background color based on mouse position
    topRuler.style.backgroundColor = `rgba(0, 0, 255, ${mouseX / topRuler.offsetWidth})`;

    // Update left ruler background color based on mouse position
    leftRuler.style.backgroundColor = `rgba(255, 0, 0, ${mouseY / leftRuler.offsetHeight})`;

    // Get selected shape (if any)
    const selectedShape = document.querySelector('.shape.selected');

    if (selectedShape) {
      // Calculate dimensions of selected shape
      const width = Math.abs(selectedShape.offsetLeft - e.clientX);
      const height = Math.abs(selectedShape.offsetTop - e.clientY);

      // Update badge text and position
      badge.innerText = `W: ${width}px | H: ${height}px`;
      badge.style.left = `${e.clientX + 8}px`;
      badge.style.top = `${e.clientY + 8}px`;
      badge.style.display = 'block';
    } else {
      // Hide badge if no shape is selected
      badge.style.display = 'none';
    }
  }
}

// Add event listener for click on shapes to select them
document.addEventListener('click', (e) => {
  const clickedShape = document.querySelector('.shape');
  if (clickedShape && !clickedShape.contains(e.target)) {
    e.target.classList.add('selected');
  } else {
    e.target.classList.remove('selected');
  }

  // Update badge text and position (if needed)
  handleMouseMove(e);
});

// Add event listener for button clicks to create shapes
document.getElementById('rectangle-btn').addEventListener('click', () => createShape('rectangle'));
document.getElementById('circle-btn').addEventListener('click', () => createShape('circle'));
document.getElementById('text-btn').addEventListener('click', () => createShape('text'));

// Call the function to create rulers and badge when page loads
createRulersAndBadge();

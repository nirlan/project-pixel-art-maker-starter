// Select color input
const colorPicker = $('#colorPicker');
let color;

colorPicker.change(function() {
	color = $(this).val();
});

// Getting canvas element and obtaining the rendering context
const canvas = $('#canvasGrid');
const ctx = canvas.get(0).getContext('2d');

// Fixed size square that will be
// composing the grid (16 pixels square side)
const BASE_SIZE = 16;
const sizePicker = $('#sizePicker');
const inputHeight = $('#input_height');
const inputWidth = $('#input_width');

// Select size input
sizePicker.submit(function(event) {
	event.preventDefault();
	let n = inputHeight.val();
	let m = inputWidth.val();
	makeGrid(n, m);
});


// Drawing canvas grid. It requires
// two parameters 'n' = height input, 'm' = width input
function makeGrid(n, m) {


	// Size input will be multiplied by 'BASE_SIZE' to get canvas width
	// and height
	let canvasHeight = n*BASE_SIZE;
	let canvasWidth = m*BASE_SIZE;

	// Getting browser viewport size;
	let viewportHeight = $(window).height();
	let viewportWidth = $(window).width();

	// Checking IF canvas height and/or width fits the viewport size
	// Setting canvas size according to viewport size to better fit the window
	// if needed
	if (canvasHeight > viewportHeight*0.6) {  // canvas height greater than 60% vh

		// Need to reset 'n' to an integer multiple of 16px
		let y = viewportHeight*0.6/BASE_SIZE;
		n = Math.floor(y);
		canvasHeight = n*BASE_SIZE;

		// Display max height on input box
		inputHeight.val(n);
	}

	if (canvasWidth > viewportWidth*0.9) {   // canvas width greater than 90% vw

		// Need to reset 'm' to an integer multiple of 16px
		let x = viewportWidth*0.9/BASE_SIZE;
		m = Math.floor(x);
		canvasWidth = m*BASE_SIZE;

		// Display max width on input box
		inputWidth.val(m);
	}

	// Setting canvas size
	canvas.get(0).height = canvasHeight;
	canvas.get(0).width = canvasWidth;

	// Drawing the vertical lines
	for (let i = 0; i <= m; i++) {
		ctx.beginPath();
		ctx.lineStyle = 'rgb(10,10,10)';
		ctx.moveTo(i*BASE_SIZE, 0)
		ctx.lineTo(i*BASE_SIZE, canvasHeight);
		ctx.stroke();
	}

	// Drawing the horizontal lines
	for (let i = 0; i <= n; i++) {
		ctx.beginPath();
		ctx.lineStyle = 'rgb(10,10,10)';
		ctx.moveTo(0, i*BASE_SIZE)
		ctx.lineTo(canvasWidth, i*BASE_SIZE);
		ctx.stroke();
	}
}


// Get the selected grid square
function getSquare(event, canvas) {
	let offset = canvas.offset(); // get the element offset
	let x = event.pageX - offset.left; // relative 'x' coordinate of event
	let y = event.pageY - offset.top; // relative 'y' coordinate of event
	let xM = x%BASE_SIZE; // Modulo of 'x' by BASE_SIZE
	let yM = y%BASE_SIZE; // Modulo of 'x' by BASE_SIZE
	let xS = x - xM; // 'x' square coordinate
	let yS = y - yM; // 'y' square coordinate
	return {xM: xM, yM: yM, xS: xS, yS: yS}; // return object
}

// Draw selected square with selected color
function drawSquare(xSqr, ySqr, color) {
		ctx.beginPath(); // empty the previous  paths
		ctx.rect(xSqr, ySqr, BASE_SIZE, BASE_SIZE); // path for the square
		ctx.fillStyle = color; // fill the square with selected color
		ctx.lineStyle = 'rgb(10,10,10)';
		ctx.fill();
		ctx.stroke();
}

// Change color of the selected grid square
canvas.click(function(event) {
	let coordinates = getSquare(event, canvas); // get square object coordinates
	let xMod = coordinates.xM;
	let yMod = coordinates.yM;
	let xSqr = coordinates.xS;
	let ySqr = coordinates.yS;

	// If the mouse click is inside the square, not over the grid lines
	if (xMod !== 0 && yMod !== 0) {
		drawSquare(xSqr, ySqr, color);
	}
});

// Right click makes that square become white, so it is easy correcting
// misclicks
canvas.contextmenu(function(event) {
	event.preventDefault();
	let coordinates = getSquare(event, canvas); // get square object coordinates
	let xMod = coordinates.xM;
	let yMod = coordinates.yM;
	let xSqr = coordinates.xS;
	let ySqr = coordinates.yS;

	// If the mouse click is inside the square, not over the grid lines
	if (xMod !== 0 && yMod !== 0) {
		drawSquare(xSqr, ySqr, '#FFF');
	}
});
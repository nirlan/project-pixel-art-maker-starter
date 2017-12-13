// Select color input
let color;

$('#colorPicker').change(function() {
	color = $(this).val();
});


// Select size input
let width;
let height;

$('#sizePicker').submit(function(event) {
	event.preventDefault();
	width = $('#input_width').val();
	height = $('#input_height').val();
});



// When size is submitted by the user, call makeGrid()
function makeGrid() {

// Your code goes here!

}

// Select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;

const { width, height } = canvas;

// Random number of a point(x,y) inside the canvas=
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

// Setup canvas
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

function checkKey(key) {
	// if is faster than switch
	if (key === 'ArrowUp') {
		y -= MOVE_AMOUNT;
	} else if (key === 'ArrowRight') {
		x += MOVE_AMOUNT;
	} else if (key === 'ArrowDown') {
		y += MOVE_AMOUNT;
	} else if (key === 'ArrowLeft') {
		x -= MOVE_AMOUNT;
	}
}

function draw({ key }) {
	hue += 3;
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.beginPath();
	ctx.moveTo(x, y);
	checkKey(key);
	ctx.lineTo(x, y);
	ctx.stroke();
}

function handleKey(event) {
	if (event.key.includes('Arrow')) {
		event.preventDefault();
		draw({ key: event.key });
	}
}

function clearCanvas() {
	canvas.classList.add('shake');
	ctx.clearRect(0, 0, width, height);
	canvas.addEventListener(
		'animationend',
		function() {
			canvas.classList.remove('shake');
		},
		{ once: true } // removes the event listener once the animation is done
	);
}

window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);

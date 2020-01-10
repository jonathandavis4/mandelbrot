let canvas = document.querySelectorAll('canvas')[0];
let width = canvas.width;
let height = canvas.height;
let context = canvas.getContext('2d');

function color_pixel(x, y, color) {
	context.fillStyle = color;
	context.fillRect(x, y, 1, 1);
}

function is_bounded_less_than_or_equal_limit(z) {
	let c = z;

	let iteration = 0
	while (iteration < 120) {
		let next_z = z.mul(z).add(c);

		if (isNaN(next_z.re) || isNaN(next_z.im)) {
			break;
		}

		z = next_z;
		iteration++;
	}

	let limit = 2;
	if (z.abs() <= limit) {
		return 'black';
	}

	return 'white';
}

function clear_canvas() {
	context.fillStyle = 'white';
	context.fillRect(0, 0, width, height);
}

function draw_mandelbrot(min_x, min_y, max_x, max_y) {
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			let i_position = i / width;
			let j_position = j / width;

			let x = ((max_x - min_x) * i_position) + min_x;
			let y = ((max_y - min_y) * j_position) + min_y;

			let z = new Complex(x, y);

			let color = is_bounded_less_than_or_equal_limit(z)
			if (color) {
				color_pixel(i, j, color);
			}
			else {
				color_pixel(i, j, color);
			}
		}
	}
}

let current_min_x = -2;
let current_min_y = -2;
let current_max_x = 2;
let current_max_y = 2;

draw_mandelbrot(current_min_x, current_min_y, current_max_x, current_max_y);

let click_1_i = null;
let click_1_j = null;
let click_2_i = null;
let click_2_j = null;
let current_click = 1;
canvas.addEventListener('click', function(e) {
	console.log(current_click);
	if (current_click == 1) {
		click_1_i = e.offsetX;
		click_1_j = e.offsetY;

		context.fillStyle = 'red';
		context.fillRect(click_1_i - 1 , click_1_j - 1, 3, 3);

		current_click = 2;
	}
	else {
		click_2_i = e.offsetX;
		click_2_j = e.offsetY;

		let click_1_i_position = click_1_i / width;
		let click_1_j_position = click_1_j / height;
		let click_2_i_position = click_2_i / width;
		let click_2_j_position = click_2_j / height;

		current_min_x = ((current_max_x - current_min_x) * click_1_i_position) + current_min_x;
		current_min_y = ((current_max_y - current_min_y) * click_1_j_position) + current_min_y;
		current_max_x = ((current_max_x - current_min_x) * click_2_i_position) + current_min_x;
		current_max_y = ((current_max_y - current_min_y) * click_2_j_position) + current_min_y;

		clear_canvas();
		draw_mandelbrot(current_min_x, current_min_y, current_max_x, current_max_y);

		current_click = 1;
	}
});
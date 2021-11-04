const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const circle = document.querySelector("circle");

//computes the value of the perimeter based on "r" attribute of circle element in HTML
const perimeter = circle.getAttribute("r") * 2 * Math.PI;
//this sets the stroke-dasharray element property equal to the perimeter:
//stroke-dasharray increasing negative will give us the white space around the perimeter
circle.setAttribute("stroke-dasharray", perimeter);

let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
	onStart(totalDuration) {
		duration = totalDuration;
	},
	//onTick receives timeRemaining from timer.js  this.onTick(this.timeRemaining);
	onTick(timeRemaining) {
		circle.setAttribute(
			"stroke-dashoffset",
			(perimeter * timeRemaining) / duration - perimeter
		);
	},
	onComplete() {
		console.log("Timer is completed");
	},
});

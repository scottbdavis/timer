class Timer {
	constructor(durationInput, startButton, pauseButton, callbacks) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;
		if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}
		this.startButton.addEventListener("click", this.start);
		this.pauseButton.addEventListener("click", this.pause);
	}
	//start function starts the timer - will be in tick method - start tick method
	start = () => {
		// console.log("Time to start the timer!");
		// this.importantMethodToCall();
		if (this.onStart) {
			//in onStart - this.timeRemaining will be the total time remaining
			this.onStart(this.timeRemaining);
		}
		this.tick(); //call this manually first so the clock starts asap instead of waiting 1 sec
		//assigning setInterval to "this.timer" makes it available throughout the class
		//like below in pause function
		this.interval = setInterval(this.tick, 20);
	};

	pause = () => {
		clearInterval(this.interval); //refers back to setInterval in start func
	};
	//you can test to see if this will be available to the Class with the arrow function
	// importantMethodToCall() {
	// 	console.log("IMportant was done");
	// }
	tick = () => {
		//parseInt - no decimal  parseFloat - decimal
		//timeRemaining will take the decimal value entered into input - from the constructor
		// const timeRemaining = parseFloat(this.timeRemaining); //see timeRemaining getter
		//now we subtract 1 from the initial time remaining value each time
		//setInterval calls tick (1000ms)
		//setter below allows us to update time remaining with just this
		if (this.timeRemaining <= 0) {
			this.pause();
			if (this.onComplete) {
				this.onComplete();
			}
		} else {
			this.timeRemaining = this.timeRemaining - 0.02;
			if (this.onTick) {
				this.onTick(this.timeRemaining);
			}
		}
	};
	//this allows you to retrieve a variable inside the class without calling a method

	get timeRemaining() {
		return parseFloat(this.durationInput.value);
	}
	//set a value to the time remaining
	//.toFixed limits float to 2 decimal places
	set timeRemaining(time) {
		this.durationInput.value = time.toFixed(2);
	}
}

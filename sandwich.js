/** This is the "attach to window" library System - one variable per library**/ 

// (function() {

// 	var veggie = {
// 		finish: "salad",
// 		tomatoes: true
// 	};

// 	var meat = {
// 		finish: "meat",
// 		tomatoes: false
// 	}

// 	var sandwich = {
// 		veggie: veggie,
// 		meat: meat
// 	}

// 	window.sandwich = sandwich;


// })()

/** The Library  that gets loaded from the librarySystem **/ 
/** This is the "dynamic" library System - one variable period **/ 

(function() {
	// I have another file with jsut a simple object called meat.js that get's loaded here because
	// sandwich.js depends on it (see the console.log below)
	var myMeatLib = librarySystem('meat');
	
	var veggie = {
		finish: "salad",
		tomatoes: true
	};

	var meat = {
		finish: "meat",
		tomatoes: false
	}

	var sandwich = {
		veggie: veggie,
		meat: meat
	}
	// test if myMeatLib is loaded (meat.js) and make it dependent
	console.log("I love my " + myMeatLib.meat);

	// make it dynamically

	if(typeof librarySystem !== 'undefined') {
		librarySystem('sandwich', ['meat'], function(){

			// return an object with the library + dependencies?
			// should return something like this: return 'app with ' + dependency;
			/* sandwich + dependency; => this would actually return "[object Object][object Object]" */
			return {sandwich: sandwich, dependencies: [myMeatLib]};
		});
	} else {
		window.sandwich = sandwich;
	}
})()
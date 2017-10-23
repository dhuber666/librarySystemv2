/**
* first: librarySystem('dependency', [], function() {
* 	return 'loaded dependency';
* })
* => store[dependency] => dependency
*
* {name: "dependency", dependencies: Array(0), hasRun: false, callback: ƒ}
* Calling the dependency
* librarySystem('dependency'); get library and dependencies
* => 


**/


(function() {
	// this is the "global" store. the function below has access to it because of closure
	var store = {};


	// Function that handles storing data
	function librarySystem(nameLibrary, dependencyArray, callback) {
		if(arguments.length > 1) {
			store[nameLibrary] = {
				name: nameLibrary,
				dependencies: dependencyArray,
				callback: callback,
				hasRun: false
			}
			// return true if saved for testing
			return true;
		} else {
			return getLibrary(nameLibrary);
		}
	}

	function getLibrary(nameLibrary) {
		// get the library object from name
		var library = store[nameLibrary];

		if(!library.hasRun) {
			// get dependencies
			var dependencies = library.dependencies;

			// check if the dependencies are in the store
			dependencies = dependencies.map(function(library) {
				return getLibrary(library);
			})


			// run the callback of library and pass in dependencies
			library.hasRun = true;
			return library.callback.apply(this, dependencies);
		}
	}

	// attach both functions to window
	window.librarySystem = librarySystem;
	
})();
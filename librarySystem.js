/** the librarySystem gets loaded into the html file first
*** it's up to the other libraries if they use them or not **/

/* 
librarySystem('workBlurb', ['name', 'company'], function(name, company) {
  return name + ' works at ' + company;
});

librarySystem('name', [], function() {
  return 'Gordon';
});

librarySystem('company', [], function() {
  return 'Watch and Code';
});

librarySystem('workBlurb'); // 'Gordon works at Watch and Code'

**/ 

/**



TODO: 
Look if dependencies are available
	check if there is a key with empty string that matches this current string?!?!?
	yes: run the code as usual
else:
	don't run the callback but save the key with empty string?

the check if a dependancy "came available" is happening every time we add a new librarry
that means at the time we call librarySystem('workBlurp') => it should return the correct library + dependency
that menas it returns 'gordon works at watch and code ' not 'name works at watch and code'

first: librarySystem('workBlurp', ['name', 'company'], function(name, company) { return name + company})
second: librarySystem('name', [], function(){return 'Gordon'});
third: librarySystem('company', [], function(){return 'Watch and Code'});
fourth: librarySystem('workBlurp') => 'Gordon works at Watch and Code';

First: store{workblurp: "name works at company"}
Second: store{workblurp: "name works at company", name: 'gordon'}
Third: store{workblurp: "name works at company", company: 'Watch and Code'}


first: if dependencies are not found in store => store {workblurp: libraryCallback}
	=> store the dependency keys into a tempDependencies array
second: if no dependencies => look if name equals a key in store or a value in tempDependencies array
	=> no: add the library to store => yes: switch the string value in array with callback return value
third: same as second 
fourth: if key is a function => run workblurp.apply(this, tempDependencies) => return the return value of this callback


**/


(function() {
	// this is the "global" store. the function below has access to it because of closure
	var store = {};
	// the array where dependencies gets saved
	var tempDependencies = [];


	function librarySystem(name, dependencies, libraryCallback) {
		// if just 1 argument you want to load the library
		if(arguments.length < 2) {
			// if the library was created before dependencies existed it has a function
			if(typeof store[name] === 'function') {
				// this function runs now with saved dependencies in tempDependencies
				return store[name].apply(this, tempDependencies);
			} else {
				// else just return the library with already loaded dependencies
				return store[name];
			}
		} else { // if there are more arguments and there are dependencies passed in
			if(dependencies.length > 0) {
				// loop through each dependency
				dependencies.forEach(function(key){
					// push each dependency into the tempDependencies variable
					tempDependencies.push(key);
					// if the dependency is not in the store yet save the callback for later
					if(!(key in store))
						store[name] = libraryCallback;
				})
				// if the value was previously set don't do anything but if not run..
				if(!store[name]) {
					// the whole function with dependencies in temp
					store[name] = libraryCallback.apply(this, tempDependencies);
				}

			} else { // if there are no dependencies passed in 
				// look if name equals a string in tempDependencies and replace it with callback return value
				// this just runs when there is aynthing in tempDependencies
				tempDependencies = tempDependencies.map(function(library) {
					if(library === name) {
						return libraryCallback();
					} else {
						return library;
					}
				})
				// push the dependency return value from callback into the dependency array 
				// for example when you create the dependencies first
				tempDependencies.push(libraryCallback());
				store[name] = libraryCallback();
			}	
		}
	}

	// helper function to clear the temp and store
	function clearStore() {
		store = {};
		tempDependencies = [];
	}
	// attach both functions to window
	window.librarySystem = librarySystem;
	window.clearStore = clearStore;
})();
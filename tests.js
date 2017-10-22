
/** Prototype(s): 

librarySystem('dependency', [], function() {
  return 'loaded dependency';
});

librarySystem('app', ['dependency'], function(dependency) {
  return 'app with ' + dependency;
});


librarySystem('app'); // 'app with loaded dependency'

**/

/** Notes:

* It should take and array where you can specify other library names that the passed in library depends on
* so for example when the sandwich library also depends on another library eg "meat.js" we can only load it when,
* both are available!

* If we call a library with librarySystem('sandwich') it should load the library but also load the meat.js? 

**/ 


tests({
	/** Tests for the default library System as we learned it **/



	'it should have access to the librarySystem': function() {
		eq(typeof librarySystem !== 'undefined', true);
		clearStore();
	},
	'it should have access to a single loaded library': function() {
		librarySystem('app', [], function() { return 'Gordon'});
		var lib = librarySystem('app');
		eq(lib === 'Gordon', true);
		clearStore();
	},
	'it can save new librarys / modules without dependencies': function() {
		
		librarySystem('testLib', [], function() {
			return 'myTestLib';
		})
		var testTheTestLib = librarySystem('testLib');
		eq(typeof testTheTestLib !== 'undefined', true);
		eq(testTheTestLib === 'myTestLib', true);
		clearStore();
	},
	/** Tests for the new librarySystem with dependencies **/ 
	'it should pass in the strings from array into the callback arguments': function() {
		librarySystem('app', ['dependency'], function(dependency) {
  			
  			return 'app with ' + dependency;
		});

		eq(librarySystem('app'), 'app with dependency');
		clearStore();
	},
	'it should be able to be flexible enough to accept any number of dependencies': function() {

		librarySystem('name', [], function() {
		  return 'Gordon';
		});

		librarySystem('company', [], function() {
		  return 'Watch and Code';
		});

		librarySystem('workBlurb', ['name', 'company'], function(name, company) {
		  return name + ' works at ' + company;
		});
		debugger;
		var stringMatch = librarySystem('workBlurb');
		eq(stringMatch, 'Gordon works at Watch and Code'); // 'Gordon works at Watch and Code'
		clearStore();
	},
	'it can handle the case when you add the function that needs dependencies first and then load libs': function() {
		// reset the store in librarySystem? 

		clearStore();
		
		librarySystem('workBlurb', ['name', 'company'], function(name, company) {
		  return name + ' works at ' + company;
		});

		librarySystem('name', [], function() {
		  return 'Gordon';
		});

		librarySystem('company', [], function() {
		  return 'Watch and Code';
		});

		var stringMatch = librarySystem('workBlurb');
		eq(stringMatch, 'Gordon works at Watch and Code'); // 'Gordon works at Watch and Code'
		clearStore();
	}
})



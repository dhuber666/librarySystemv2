
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

	'it should save a new library into the store': function() {
		var savedLibrary = librarySystem('dependency', [], function() {
		  return 'loaded dependency';
		});
		eq(savedLibrary, true);
	},
	'it should retrieve the requested library': function() {
		var savedLibrary = librarySystem('dependency', [], function() {
		  return 'loaded dependency';
		});
		eq(librarySystem('dependency'), 'loaded dependency');
	},
	'it should retrieve the requested library with loaded dependencies': function() {
		librarySystem('dependency', [], function() {
		  return 'loaded dependency';
		});

		librarySystem('app', ['dependency'], function(dependency) {
		  return 'app with ' + dependency;
		});

		eq(librarySystem('app'), 'app with loaded dependency');
	},
	'it should also work with libraries that uses 1 to many dependencies': function() {
		librarySystem('name', [], function() {
		  return 'Gordon';
		});

		librarySystem('company', [], function() {
		  return 'Watch and Code';
		});

		librarySystem('workBlurb', ['name', 'company'], function(name, company) {
		  return name + ' works at ' + company;
		});
		eq(librarySystem('workBlurb'), 'Gordon works at Watch and Code');

	},
	'it can handle the case when you add the function that needs dependencies first and then load libs': function() {

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
		
	},
	'it should be made sure that the callback only run once': function() {
		var counter = 0;
		librarySystem('workBlurb', ['name', 'company'], function(name, company) {
		  counter++;
		  return name + ' works at ' + company;
		});

		librarySystem('name', [], function() {
		  counter++;
		  return 'Gordon';
		});

		librarySystem('company', [], function() {
		  counter++;
		  return 'Watch and Code';
		});
		librarySystem('workBlurb');
		librarySystem('workBlurb');
		librarySystem('workBlurb');
		eq(counter, 3);
	}
})



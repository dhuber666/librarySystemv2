/** This is the dependency. Sandwich.js depends on this library **/ 

(function() {
	

	var meat = {
		meat: 'meat',
		healthy: true
	};

	if(typeof librarySystem !== 'undefined') {
		librarySystem('meat', [], function(){
			return meat;
		});
	} else {
		window.meat = meat;
	}

})();
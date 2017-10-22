
var TestHelper = {
    updateDom: function(testCount, failures) {
        var testMessage = document.createElement('h1');
            var totalTests = testCount;
            var totalPasses = totalTests - failures;
            testMessage.innerText = 'Total tests run: ' + totalTests + '\n' +
                                    'Passed tests: ' + totalPasses + '\n' + 
                                    'Failed tests: ' + failures;
            document.body.appendChild(testMessage);
    }
}

var TinyTest = {

    run: function(tests) {
        var failures = 0;
        var testCount = 0;
        for (var testName in tests) {
            testCount++;
            var testAction = tests[testName];
            try {
                testAction.apply(this);
                console.log('%c' + testName, 'color: green');
            } catch (e) {
                failures++;
                console.groupCollapsed('%c' + testName, 'color: red');
                console.error(e.stack);
                console.groupEnd();
            }
        }
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
                // add new element into html
                TestHelper.updateDom(testCount, failures);
            }
        }, 0);
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    tests              = TinyTest.run.bind(TinyTest);
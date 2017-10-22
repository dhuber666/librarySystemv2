In AccountingJS Part 6, we wrote a librarySystem function for loading libraries. With that function, you could do stuff like this:

librarySystem('app', function() {
  return 'app';
});

console.log(librarySystem('app')); // 'app'
But we'd like the ability for libraries created with librarySystem to depend on each other. For example, we'd like to be able to do the following:

librarySystem('dependency', [], function() {
  return 'loaded dependency';
});

librarySystem('app', ['dependency'], function(dependency) {
  return 'app with ' + dependency;
});

librarySystem('app'); // 'app with loaded dependency'
In this example, we have two libraries, 'dependency' and 'app'. The twist here is that 'app' needs the 'dependency' library to work. That's why librarySystem here also takes an array that lists required dependencies.

In the example above, we only specify one dependency, but librarySystem should be flexible enough to accept any number (0 or more).

Below is an example of a library that needs two dependencies.

librarySystem('name', [], function() {
  return 'Gordon';
});

librarySystem('company', [], function() {
  return 'Watch and Code';
});

librarySystem('workBlurb', ['name', 'company'], function(name, company) {
  return name + ' works at ' + company;
});

librarySystem('workBlurb'); // 'Gordon works at Watch and Code'
Your task is to rewrite librarySystem so it accepts dependencies as described above.
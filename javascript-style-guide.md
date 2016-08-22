# Javascript Style Guide

There is a .jshintrc which enforces these rules as closely as possible, assuming that you have jshint installed and integrated with your editor.

The ancestor of this guide was created by [Felix Geisendörfer](http://felixge.de/) and is
licensed under the [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/)
license. You are encouraged to fork this repository and make adjustments
according to your preferences.

![Creative Commons License](http://i.creativecommons.org/l/by-sa/3.0/88x31.png)

## Table of contents

* [Tabs for indention](#tabs-for-indention)
* [Newlines](#newlines)
* [No trailing whitespace](#no-trailing-whitespace)
* [Use Semicolons](#use-semicolons)
* [Use short lines](#no-long-lines)
* [Use single quotes](#use-single-quotes)
* [Opening braces go on the same line](#opening-braces-go-on-the-same-line)
* [Method chaining](#method-chaining)
* [Use lowerCamelCase for variables, properties and function names](#use-lowercamelcase-for-variables-properties-and-function-names)
* [Use UpperCamelCase for class names](#use-uppercamelcase-for-class-names)
* [Use UPPERCASE for Constants](#use-uppercase-for-constants)
* [Object / Array creation](#object--array-creation)
* [Use the === and !== operator](#use-the--operator)
* [Use multi-line ternary operator](#use-multi-line-ternary-operator)
* [Return early from functions](#return-early-from-functions)
* [Write small functions](#write-small-functions)
* [Avoid cyptic looking code.](#avoid-cyptic-looking-code)
* [Name your closures](#name-your-closures)
* [No nested closures](#no-nested-closures)
* [Use async patterns when needed](#use-async-patterns-when-needed)
* [Use slashes for comments](#use-slashes-for-comments)
* [Object.freeze, Object.preventExtensions, Object.seal, with, eval](#objectfreeze-objectpreventextensions-objectseal-with-eval)
* [Getters and setters](#getters-and-setters)

## Tabs for indention

Use tabs for indenting your code and swear an oath to never mix tabs and spaces - a special kind of hell is awaiting you otherwise.

## Newlines

Use UNIX-style newlines (`\n`), and a newline character as the last character
of a file. Windows-style newlines (`\r\n`) are forbidden inside any repository.

## No trailing whitespace

Just like you brush your teeth after every meal, you clean up any trailing
whitespace in your JS files before committing. Otherwise the rotten smell of
careless neglect will eventually drive away contributors and/or co-workers.

## Use Semicolons

According to [scientific research][hnsemicolons], the usage of semicolons is
a core value of our community. Consider the points of [the opposition][], but
be a traditionalist when it comes to abusing error correction mechanisms for
cheap syntactic pleasures.

[the opposition]: http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding
[hnsemicolons]: http://news.ycombinator.com/item?id=1547647

## No Long Lines

Keep your lines short. Any line that would make the horizontal scroll bar appear without the "word wrap" function of your editor turned on should be split. Yes, screens have gotten much bigger over the last few years, but your brain has not. Use the additional room for split screen, your editor supports that, right?

English text should be allowed to word wrap however; that is what word wrap is designed for.

## Use single quotes

Use single quotes, unless you are writing JSON.

*Right:*

```js
var foo = 'bar';
```

*Wrong:*

```js
var foo = "bar";
```

## Opening braces go on the same line

Your opening braces go on the same line as the statement.

*Right:*

```js
if (true) {
	console.log('winning');
}
```

*Wrong:*

```js
if (true)
{
	console.log('losing');
}
```

Also, notice the use of whitespace before and after the condition statement.

## Method chaining

One method per line should be used if you want to chain methods.

You should also indent these methods so it's easier to tell they are part of the same chain.

*Right:*

```js
User
	.findOne({ name: 'foo' })
	.populate('bar')
	.exec(function(err, user) {
		return true;
	});
````

*Wrong:*

```js
User
.findOne({ name: 'foo' })
.populate('bar')
.exec(function(err, user) {
	return true;
});

User.findOne({ name: 'foo' })
	.populate('bar')
	.exec(function(err, user) {
		return true;
	});

User.findOne({ name: 'foo' }).populate('bar')
.exec(function(err, user) {
	return true;
});

User.findOne({ name: 'foo' }).populate('bar')
	.exec(function(err, user) {
		return true;
	});
````

## Use lowerCamelCase for variables, properties and function names

Variables, properties and function names should use `lowerCamelCase`.	They
should also be descriptive. Single character variables and uncommon
abbreviations should generally be avoided.

*Right:*

```js
var adminUser = db.query('SELECT * FROM users ...');
```

*Wrong:*

```js
var admin_user = db.query('SELECT * FROM users ...');
```

## Use UpperCamelCase for class names

Class names should be capitalized using `UpperCamelCase`.

*Right:*

```js
function BankAccount() {
}
```

*Wrong:*

```js
function bank_Account() {
}
```

## Use UPPERCASE for Constants

Constants should be declared as regular variables or static class properties,
using all uppercase letters.

Node.js / V8 actually supports mozilla's [const][const] extension, but
unfortunately that cannot be applied to class members, nor is it part of any
ECMA standard.

*Right:*

```js
var SECOND = 1 * 1000;

function File() {
}
File.FULL_PERMISSIONS = 0777;
```

*Wrong:*

```js
const SECOND = 1 * 1000;

function File() {
}
File.fullPermissions = 0777;
```

[const]: https://developer.mozilla.org/en/JavaScript/Reference/Statements/const

## Use dashed-word-separation for filenames

Filenames should be named in lower case, using dashes for separating words. It is highly readable, and it is a defacto standard in the Node community

*Right*

```
tests/api-test.js
```

*Wrong*

```
Tests/apiTest.js
```

## Object / Array creation

Use trailing commas, but do not add a comma after last item of array / last member of object literal. Put *short* declarations on a single line.
Only quote keys when your interpreter complains:

*Right:*

```js
var a = ['hello', 'world'];
var b = {
	good: 'code',
	'is generally': 'pretty'
};
```

*Wrong:*

```js
var a = [
	'hello', 'world'
];
var b = {"good": 'code'
				, is generally: 'pretty'
				};
```

## Use the ===  and !== operators

Programming is not about remembering [stupid rules][comparisonoperators]. Use
the triple equality operator as it will work just as expected.

*Right:*

```js
var a = 0;
if (a !== '') {
	console.log('winning');
}

```

*Wrong:*

```js
var a = 0;
if (a == '') {
	console.log('losing');
}
```

[comparisonoperators]: https://developer.mozilla.org/en/JavaScript/Reference/Operators/Comparison_Operators

## Use multi-line ternary operator

The ternary operator should not be used on a single line. Split it up into multiple lines instead.

*Right:*

```js
var foo = (a === b)
	? 1
	: 2;
```

*Wrong:*

```js
var foo = (a === b) ? 1 : 2;
```

## Do not extend built-in prototypes

Do not extend the prototype of native JavaScript objects. Your future self will
be forever grateful.

*Right:*

```js
var a = [];
if (!a.length) {
	console.log('winning');
}
```

*Wrong:*

```js
Array.prototype.empty = function() {
	return !this.length;
}

var a = [];
if (a.empty()) {
	console.log('losing');
}
```

## Use descriptive conditions

Any non-trivial conditions should be assigned to a descriptively named variable or function:

*Right:*

```js
var isValidPassword = password.length >= 4 && /^(?=.*\d).{4,}$/.test(password);

if (isValidPassword) {
	console.log('winning');
}
```

*Wrong:*

```js
if (password.length >= 4 && /^(?=.*\d).{4,}$/.test(password)) {
	console.log('losing');
}
```

## Write small functions

Keep your functions short. A good function fits on a slide that the people in the last row of a big room can comfortably read. So don't count on them having perfect vision and limit yourself to roughly 15 lines of code per function. This can be done by breaking large functions up into a collection of smaller functions, by applying the strategy pattern, or by other means.

Keep in mind that in practice there will be exceptions to the rules in this guide; if everything you do to break up a large function ends up reducing mantainability, then just move on. Do not just try to put more code on a single line. That reduces maintainability, which defeats the purpose of this rule.

## Return early from functions

To avoid deep nesting of if-statements, always return a function's value as early
as possible.

*Right:*

```js
function isPercentage(val) {
	if (val < 0) {
		return false;
	}

	if (val > 100) {
		return false;
	}

	return true;
}
```

*Wrong:*

```js
function isPercentage(val) {
	if (val >= 0) {
		if (val < 100) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}
```

Or for this particular example it may also be fine to shorten things even
further:

```js
function isPercentage(val) {
	var isInRange = (val >= 0 && val <= 100);
	return isInRange;
}
```

## Name your closures

Feel free to give your closures a name. It shows that you care about them, and
will produce better stack traces, heap and cpu profiles. Named functions
are also easier to optimize for V8.

*Right:*

```js
req.on('end', function onEnd() {
	console.log('winning');
});
```

*Wrong:*

```js
req.on('end', function() {
	console.log('losing');
});
```

## No nested closures

Use closures, but don't nest them. Otherwise your code will become a mess. Named functions
are also easier to optimize for V8.

*Right:*

```js
setTimeout(function() {
	client.connect(afterConnect);
}, 1000);

function afterConnect() {
	console.log('winning');
}
```

*Wrong:*

```js
setTimeout(function() {
	client.connect(function() {
		console.log('losing');
	});
}, 1000);
```


## Use async patterns when needed

If you need to write complex async code, which requires many async functions to be executed, avoiding nesting is
not always enough. Also use tools like async patterns, promises when these simplyfy the code. A great lib for this is Async.js.
Async patterns can be also used for implementing async flow control, parallel executionand other cool stuff.
Promises can be also useful and more efficient than callbacks. A good library for that is Q.

*Example:*

Running a series of async functions, each passing results to the next one. If any of the functions pass an error to its callback,
the final callback (afterTask) is called and the next function won't be executed.

```js
async.waterfall([
    function taskOne(callback){
        callback(null, 'one', 'two');
    },
    function taskTwo(arg1, arg2, callback){
      // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    },
    function taskThree(arg1, callback){
        // arg1 now equals 'three'
        callback(null, 'done');
    }
], function afterTasks(err, result) {
   // result now equals 'done'
});
```

## Use slashes for comments

Use slashes for both single line and multi line comments. Try to write
comments that explain higher level mechanisms or clarify difficult
segments of your code. Don't use comments to restate trivial things.

*Right:*

```js
// 'ID_SOMETHING=VALUE' -> ['ID_SOMETHING=VALUE', 'SOMETHING', 'VALUE']
var matches = item.match(/ID_([^\n]+)=([^\n]+)/));

// This function has a nasty side effect where a failure to increment a
// redis counter used for statistics will cause an exception. This needs
// to be fixed in a later iteration.
function loadUser(id, cb) {
	// ...
}

var isSessionValid = (session.expires < Date.now());
if (isSessionValid) {
	// ...
}
```

*Wrong:*

```js
// Execute a regex
var matches = item.match(/ID_([^\n]+)=([^\n]+)/));

// Usage: loadUser(5, function() { ... })
function loadUser(id, cb) {
	// ...
}

// Check if the session is valid
var isSessionValid = (session.expires < Date.now());
// If the session is valid
if (isSessionValid) {
	// ...
}
```

## Object.freeze, Object.preventExtensions, Object.seal, with, eval

Crazy shit that you will probably never need. Stay away from it.

## Getters and setters

Do not use setters, they cause more problems for people who try to use your
software than they can solve.

Feel free to use getters that are free from [side effects][sideeffect], like
providing a length property for a collection class.

[sideeffect]: http://en.wikipedia.org/wiki/Side_effect_(computer_science)

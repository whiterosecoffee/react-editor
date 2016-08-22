'use strict';

var actions = require( '../actions' );

// Create a generic input element callback that sends the element's value to a named field. Only useable for top level fields, not fields nested in objects.
function createEditActor( fieldName ) {
	return function( event ) {
		actions.editField( fieldName, event.target.value );
	};
}

module.exports = createEditActor;

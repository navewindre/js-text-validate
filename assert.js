function assert( c, msg ) {
	if( !c )
		throw msg;
}

function assert( c ) {
	if( !c )
		throw "";
}
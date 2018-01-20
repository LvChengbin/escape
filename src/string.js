export default str => {
	return String( str ).replace(/['"\\\n\r\u2028\u2029]/g, c => {
        switch( c ) {
            case '"' :
            case '\'' :
            case '\\' :
                return '\\' + c;
            case '\n' :
                return '\\n';
            case '\r' :
                return '\\r';
            case '\u2028' :
                return '\\u2028';
            case '\u2029' :
                return '\\u2029';
        }
	} );
};

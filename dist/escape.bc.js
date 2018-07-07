(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.escape = factory());
}(this, (function () { 'use strict';

/**
 * To escape special characters of CSS string.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape
 * @see https://drafts.csswg.org/cssom/#the-css.escape()-method
 * @see https://drafts.csswg.org/cssom/#serialize-an-identifier
 */

function css( str ) {
    if( CSS && CSS.escape ) {
        return CSS.escape( str );
    }

    if( !arguments.length ) {
        throw new TypeError( 'Failed to execute "escape" on "CSS": 1 argument required, but only 0 present.' );
    }

    str = String( str );

    var result = '';

    for( var i = 0, l = str.length; i < l; i += 1 ) {
        var unit = str.charCodeAt( i );

        // If the character is NULL (U+0000), then the REPLACEMENT CHARACTER (U+FFFD).
        if( unit === 0x000 ) {
            result += '\uFFFD';
        }

        // If the character is in the range [\1-\1f] (U+0001 to U+001F) or is U+007F, then the character escaped as code point.
        if( unit >= 0x0001 && unit <= 0x001F || unit === 0x007F ) {
            result += '\\' + unit.toString( 16 ) + ' ';
        }

        // If the character is the first character and is in the range [0-9] (U+0030 to U+0039), then the character escaped as code point.
        if( i === 0 && unit >= 0x0030 && unit <= 0x0039 ) {
            result += '\\' + unit.toString( 16 ) + ' ';
        }

        // If the character is the second character and is in the range [0-9] (U+0030 to U+0039) and the first character is a "-" (U+002D), then the character escaped as code point.
        if( i === 1 && unit >= 0x0030 && unit <= 0x0039 && str.charCodeAt( 0 ) === 0x002D ) {
            result += '\\' + unit.toString( 16 ) + ' ';
        }

        // If the character is the first character and is a "-" (U+002D), and there is no second character, then the escaped character.
        if( i === 0 && l === 1 && unit === 0x002D )  {
            result += '\\-';
        }

        // If the character is not handled by one of the above rules and is greater than or equal to U+0080, is "-" (U+002D) or "_" (U+005F), or is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to U+005A), or \[a-z] (U+0061 to U+007A), then the character itself.
        if ( unit >= 0x0080 || unit == 0x002D || unit == 0x005F || unit >= 0x0030 && unit <= 0x0039 || unit >= 0x0041 && unit <= 0x005A || unit >= 0x0061 && unit <= 0x007A ) {
			result += str.charAt( i );
			continue;
		}

        // Otherwise, the escaped character.
        result += '\\' + str.charAt( i );
    }

    return result;
}

var map = {
    '&' : '&amp;',
    '<' : '&lt;',
    '>' : '&gt;',
    '"' : '&quot;',
    '\'' : '&#39;'
};

function html (html) {
    return String( html ).replace( /[&<>"']/g, function (m) { return map[ m ]; } );
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 */
function regexp (str) { return str.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' ); }

function string (str) {
	return String( str ).replace(/['"\\\n\r\u2028\u2029]/g, function (c) {
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
}

function url (url) { return encodeURIComponent( url ); }

var index = {
    css: css, html: html, regexp: regexp, string: string, url: url
};

return index;

})));
